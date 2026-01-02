#!/usr/bin/env python3
"""
STL Poller Service
Runs independently - polls Supabase for pending jobs, generates STL files, uploads results.
Install as Windows service or run with: py stl_poller.py
"""

import os
import sys
import time
import json
import base64
import tempfile
import requests
from io import BytesIO
from datetime import datetime

# Add path for image_to_stl module
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from PIL import Image
    import numpy as np
    from stl import mesh
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Install with: pip install pillow numpy numpy-stl")
    sys.exit(1)

# Configuration
SUPABASE_URL = 'https://todhqdgatlejylifqpni.supabase.co'
SUPABASE_KEY = os.environ.get('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZGhxZGdhdGxlanlsaWZxcG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTA3ODEsImV4cCI6MjA3NjEyNjc4MX0.4CQ4ijUlf3Y4OGr5IFrVgCjrqT4dJ0CuEZAt_tlPBig')
API_ENDPOINT = 'https://www.ai-ministries.com/api/stl-generator'
POLL_INTERVAL = 5  # seconds
LOG_FILE = os.path.join(os.path.dirname(__file__), 'stl_poller.log')

def log(msg):
    """Log to file and stdout"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{timestamp}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, 'a') as f:
            f.write(line + '\n')
    except:
        pass

def image_to_heightmap(image_data, max_height=10):
    """Convert image to heightmap array"""
    img = Image.open(BytesIO(image_data)).convert('L')
    # Resize if too large
    max_dim = 200
    if max(img.size) > max_dim:
        ratio = max_dim / max(img.size)
        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    pixels = np.array(img, dtype=np.float32)
    pixels = (pixels / 255.0) * max_height
    return pixels, img.size

def heightmap_to_stl(heightmap, output_path, base_height=2, scale=1.0):
    """Convert heightmap to STL mesh"""
    rows, cols = heightmap.shape
    vertices = []
    faces = []

    # Create vertices for top surface
    for i in range(rows):
        for j in range(cols):
            x = j * scale
            y = (rows - 1 - i) * scale
            z = heightmap[i, j] + base_height
            vertices.append([x, y, z])

    # Create faces for top surface
    for i in range(rows - 1):
        for j in range(cols - 1):
            v0 = i * cols + j
            v1 = v0 + 1
            v2 = v0 + cols
            v3 = v2 + 1
            faces.append([v0, v2, v1])
            faces.append([v1, v2, v3])

    # Add base vertices
    base_start = len(vertices)
    for i in range(rows):
        for j in range(cols):
            x = j * scale
            y = (rows - 1 - i) * scale
            vertices.append([x, y, 0])

    # Add base faces
    for i in range(rows - 1):
        for j in range(cols - 1):
            v0 = base_start + i * cols + j
            v1 = v0 + 1
            v2 = v0 + cols
            v3 = v2 + 1
            faces.append([v0, v1, v2])
            faces.append([v1, v3, v2])

    # Add walls
    # Front wall
    for j in range(cols - 1):
        top0, top1 = j, j + 1
        bot0, bot1 = base_start + j, base_start + j + 1
        faces.append([top0, top1, bot0])
        faces.append([top1, bot1, bot0])

    # Back wall
    for j in range(cols - 1):
        top0 = (rows - 1) * cols + j
        top1 = top0 + 1
        bot0 = base_start + (rows - 1) * cols + j
        bot1 = bot0 + 1
        faces.append([top0, bot0, top1])
        faces.append([top1, bot0, bot1])

    # Left wall
    for i in range(rows - 1):
        top0 = i * cols
        top1 = (i + 1) * cols
        bot0 = base_start + i * cols
        bot1 = base_start + (i + 1) * cols
        faces.append([top0, bot0, top1])
        faces.append([top1, bot0, bot1])

    # Right wall
    for i in range(rows - 1):
        top0 = i * cols + (cols - 1)
        top1 = (i + 1) * cols + (cols - 1)
        bot0 = base_start + i * cols + (cols - 1)
        bot1 = base_start + (i + 1) * cols + (cols - 1)
        faces.append([top0, top1, bot0])
        faces.append([top1, bot1, bot0])

    # Create mesh
    vertices = np.array(vertices)
    faces = np.array(faces)
    stl_mesh = mesh.Mesh(np.zeros(len(faces), dtype=mesh.Mesh.dtype))
    for i, f in enumerate(faces):
        for j in range(3):
            stl_mesh.vectors[i][j] = vertices[f[j]]

    stl_mesh.save(output_path)
    return os.path.getsize(output_path)

def generate_preview(heightmap, output_path):
    """Generate preview image of heightmap"""
    # Normalize to 0-255
    normalized = ((heightmap / heightmap.max()) * 255).astype(np.uint8)
    img = Image.fromarray(normalized)
    img = img.resize((400, 400), Image.LANCZOS)
    img.save(output_path, 'PNG')
    return os.path.getsize(output_path)

def upload_to_supabase_storage(file_path, bucket, filename):
    """Upload file to Supabase storage, return public URL"""
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/octet-stream'
    }

    with open(file_path, 'rb') as f:
        data = f.read()

    url = f'{SUPABASE_URL}/storage/v1/object/{bucket}/{filename}'
    resp = requests.post(url, headers=headers, data=data)

    if resp.status_code in [200, 201]:
        return f'{SUPABASE_URL}/storage/v1/object/public/{bucket}/{filename}'
    else:
        log(f"Upload failed: {resp.status_code} {resp.text}")
        return None

def poll_jobs():
    """Poll for pending jobs"""
    try:
        resp = requests.post(API_ENDPOINT, json={'action': 'poll'}, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            return data.get('jobs', [])
    except Exception as e:
        log(f"Poll error: {e}")
    return []

def complete_job(job_id, preview_url=None, stl_url=None, error=None):
    """Mark job as complete"""
    try:
        payload = {'action': 'complete', 'job_id': job_id}
        if error:
            payload['error'] = error
        else:
            payload['preview_url'] = preview_url
            payload['stl_url'] = stl_url

        resp = requests.post(API_ENDPOINT, json=payload, timeout=10)
        return resp.status_code == 200
    except Exception as e:
        log(f"Complete error: {e}")
        return False

def process_job(job):
    """Process a single job"""
    job_id = job['job_id']
    pattern_type = job.get('pattern_type', 'relief')

    log(f"Processing job {job_id} ({pattern_type})")

    try:
        # Decode image
        image_data = base64.b64decode(job['image_base64'])

        # Generate heightmap
        max_height = 10 if pattern_type == 'relief' else 3  # lithophane is thinner
        heightmap, size = image_to_heightmap(image_data, max_height)

        # Create temp files
        with tempfile.TemporaryDirectory() as tmpdir:
            stl_path = os.path.join(tmpdir, f'{job_id}.stl')
            preview_path = os.path.join(tmpdir, f'{job_id}_preview.png')

            # Generate STL
            stl_size = heightmap_to_stl(heightmap, stl_path)
            log(f"  STL generated: {stl_size} bytes")

            # Generate preview
            preview_size = generate_preview(heightmap, preview_path)
            log(f"  Preview generated: {preview_size} bytes")

            # Upload to storage
            stl_url = upload_to_supabase_storage(stl_path, 'stl-files', f'{job_id}.stl')
            preview_url = upload_to_supabase_storage(preview_path, 'stl-previews', f'{job_id}.png')

            if stl_url and preview_url:
                complete_job(job_id, preview_url=preview_url, stl_url=stl_url)
                log(f"  Job {job_id} complete!")
            else:
                complete_job(job_id, error="Failed to upload files")
                log(f"  Job {job_id} failed: upload error")

    except Exception as e:
        log(f"  Job {job_id} error: {e}")
        complete_job(job_id, error=str(e))

def main():
    """Main polling loop"""
    log("=" * 50)
    log("STL Poller Service Starting")
    log(f"Polling: {API_ENDPOINT}")
    log(f"Interval: {POLL_INTERVAL}s")
    log("=" * 50)

    while True:
        try:
            jobs = poll_jobs()
            if jobs:
                log(f"Found {len(jobs)} pending jobs")
                for job in jobs:
                    process_job(job)
            time.sleep(POLL_INTERVAL)
        except KeyboardInterrupt:
            log("Shutting down...")
            break
        except Exception as e:
            log(f"Loop error: {e}")
            time.sleep(POLL_INTERVAL)

if __name__ == '__main__':
    main()
