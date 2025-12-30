#!/usr/bin/env python3
"""
Claude File Bridge - PC Poller
==============================
Run this on your home PC to enable file access from your phone or Claude Web.

Setup:
1. Get your API key from the bridge signup
2. Set BRIDGE_API_KEY environment variable or enter when prompted
3. Put files you want accessible in the 'shared' folder
4. Run this script (keeps running in background)

Usage:
    python bridge-poller.py
    # or
    BRIDGE_API_KEY=fb_your_key_here python bridge-poller.py
"""

import os
import sys
import time
import json
import base64
import requests
from pathlib import Path
from datetime import datetime

# Configuration
BRIDGE_ENDPOINT = 'https://ai-ministries.com/.netlify/functions/file-bridge'
POLL_INTERVAL = 5  # seconds
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

# Paths
HOME_DIR = Path.home()
BRIDGE_DIR = HOME_DIR / 'ClaudeBridge'
SHARED_DIR = BRIDGE_DIR / 'shared'
DOWNLOADS_DIR = BRIDGE_DIR / 'downloads'
LOG_FILE = BRIDGE_DIR / 'bridge.log'

def setup_directories():
    """Create necessary directories."""
    BRIDGE_DIR.mkdir(exist_ok=True)
    SHARED_DIR.mkdir(exist_ok=True)
    DOWNLOADS_DIR.mkdir(exist_ok=True)
    print(f"[BRIDGE] Shared folder: {SHARED_DIR}")
    print(f"[BRIDGE] Downloads folder: {DOWNLOADS_DIR}")

def log(msg):
    """Log message to console and file."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{timestamp}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, 'a') as f:
            f.write(line + '\n')
    except:
        pass

def bridge_request(action, payload=None):
    """Make a request to the bridge API."""
    data = {'api_key': API_KEY, 'action': action}
    if payload:
        data.update(payload)

    try:
        resp = requests.post(BRIDGE_ENDPOINT, json=data, timeout=30)
        return resp.json()
    except Exception as e:
        return {'ok': False, 'error': str(e)}

def handle_pull_request(request_id, filepath):
    """Handle a file pull request from phone/claude."""
    log(f"Pull request: {filepath}")

    # Security: ensure path is within shared folder
    try:
        full_path = (SHARED_DIR / filepath).resolve()
        if not str(full_path).startswith(str(SHARED_DIR.resolve())):
            log(f"  ERROR: Path escape attempt blocked")
            bridge_request('respond', {
                'request_id': request_id,
                'error': 'Invalid path - must be within shared folder'
            })
            return
    except Exception as e:
        log(f"  ERROR: Path resolution failed: {e}")
        bridge_request('respond', {
            'request_id': request_id,
            'error': f'Path error: {str(e)}'
        })
        return

    if not full_path.exists():
        log(f"  ERROR: File not found")
        bridge_request('respond', {
            'request_id': request_id,
            'error': f'File not found: {filepath}'
        })
        return

    if not full_path.is_file():
        log(f"  ERROR: Not a file")
        bridge_request('respond', {
            'request_id': request_id,
            'error': 'Not a file'
        })
        return

    size = full_path.stat().st_size
    if size > MAX_FILE_SIZE:
        log(f"  ERROR: File too large ({size} bytes)")
        bridge_request('respond', {
            'request_id': request_id,
            'error': f'File too large ({size} bytes, max {MAX_FILE_SIZE})'
        })
        return

    # Read and encode file
    try:
        content = full_path.read_bytes()
        content_b64 = base64.b64encode(content).decode('utf-8')

        result = bridge_request('respond', {
            'request_id': request_id,
            'content_base64': content_b64,
            'size_bytes': size
        })

        if result.get('ok'):
            log(f"  Sent: {filepath} ({size} bytes)")
        else:
            log(f"  ERROR: {result.get('error')}")
    except Exception as e:
        log(f"  ERROR: Failed to read file: {e}")
        bridge_request('respond', {
            'request_id': request_id,
            'error': f'Read error: {str(e)}'
        })

def handle_upload(queue_id, filename, content_b64, size_bytes):
    """Handle a file upload from phone/claude."""
    log(f"Incoming upload: {filename} ({size_bytes} bytes)")

    try:
        # Decode and save
        content = base64.b64decode(content_b64)

        # Sanitize filename
        safe_name = ''.join(c if c.isalnum() or c in '.-_' else '_' for c in filename)
        filepath = DOWNLOADS_DIR / safe_name

        # Don't overwrite - add number if exists
        if filepath.exists():
            base = filepath.stem
            ext = filepath.suffix
            i = 1
            while filepath.exists():
                filepath = DOWNLOADS_DIR / f"{base}_{i}{ext}"
                i += 1

        filepath.write_bytes(content)
        log(f"  Saved: {filepath}")

        # Confirm receipt
        bridge_request('confirm', {'queue_id': queue_id})

    except Exception as e:
        log(f"  ERROR: Failed to save: {e}")

def poll_loop():
    """Main polling loop."""
    log("Starting poll loop...")
    consecutive_errors = 0

    while True:
        try:
            result = bridge_request('poll')

            if not result.get('ok'):
                consecutive_errors += 1
                if consecutive_errors > 5:
                    log(f"Too many errors, sleeping 30s...")
                    time.sleep(30)
                continue

            consecutive_errors = 0

            # Handle pull requests (phone wants files from PC)
            for req in result.get('pull_requests', []):
                handle_pull_request(req['id'], req['filepath'])

            # Handle uploads (phone sending files to PC)
            for upload in result.get('uploads', []):
                handle_upload(
                    upload['id'],
                    upload['filename'],
                    upload['content_base64'],
                    upload['size_bytes']
                )

        except KeyboardInterrupt:
            log("Shutting down...")
            break
        except Exception as e:
            log(f"Poll error: {e}")
            consecutive_errors += 1

        time.sleep(POLL_INTERVAL)

def main():
    global API_KEY

    print("=" * 50)
    print("  Claude File Bridge - PC Poller")
    print("  Your files, accessible anywhere")
    print("=" * 50)
    print()

    # Get API key
    API_KEY = os.environ.get('BRIDGE_API_KEY')
    if not API_KEY:
        API_KEY = input("Enter your Bridge API key: ").strip()

    if not API_KEY or not API_KEY.startswith('fb_'):
        print("ERROR: Invalid API key. Should start with 'fb_'")
        sys.exit(1)

    # Setup
    setup_directories()

    # Test connection
    print("\nTesting connection...")
    result = bridge_request('balance')
    if result.get('ok'):
        print(f"  Connected! Gems: {result.get('gems_balance')}")
    else:
        print(f"  ERROR: {result.get('error')}")
        print("  Continuing anyway (might need to register first)...")

    print("\n" + "=" * 50)
    print("  PUT FILES IN:", SHARED_DIR)
    print("  DOWNLOADS GO TO:", DOWNLOADS_DIR)
    print("=" * 50)
    print("\nPolling for requests... (Ctrl+C to stop)\n")

    poll_loop()

if __name__ == '__main__':
    main()
