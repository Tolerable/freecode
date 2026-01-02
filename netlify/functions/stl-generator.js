// STL Generator - Netlify Function
// Accepts image, queues for processing by local Python service
// Returns job ID for polling

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://todhqdgatlejylifqpni.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Generate job ID
function generateJobId() {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let id = 'stl_';
    for (let i = 0; i < 12; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ ok: false, error: 'POST only' })
        };
    }

    let body;
    try {
        body = JSON.parse(event.body || '{}');
    } catch {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ ok: false, error: 'Invalid JSON' })
        };
    }

    const { action } = body;

    // === SUBMIT - Queue image for STL generation ===
    if (action === 'submit') {
        const { image_base64, pattern_type, filename } = body;

        if (!image_base64) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'image_base64 required' })
            };
        }

        // Validate image size (max 10MB)
        const sizeBytes = Buffer.from(image_base64, 'base64').length;
        if (sizeBytes > 10 * 1024 * 1024) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'Image too large (10MB max)' })
            };
        }

        const jobId = generateJobId();
        const patternType = pattern_type || 'relief'; // relief, lithophane, cutter

        // Queue for processing
        const { error } = await supabase
            .from('stl_jobs')
            .insert({
                job_id: jobId,
                status: 'pending',
                pattern_type: patternType,
                original_filename: filename || 'upload.jpg',
                image_base64: image_base64,
                size_bytes: sizeBytes,
                created_at: new Date().toISOString()
            });

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ ok: false, error: 'Failed to queue job' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                job_id: jobId,
                status: 'pending',
                message: 'Image queued for STL generation'
            })
        };
    }

    // === STATUS - Check job status ===
    if (action === 'status') {
        const { job_id } = body;

        if (!job_id) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'job_id required' })
            };
        }

        const { data: job, error } = await supabase
            .from('stl_jobs')
            .select('job_id, status, pattern_type, preview_url, stl_url, error_message, created_at, completed_at')
            .eq('job_id', job_id)
            .single();

        if (error || !job) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ ok: false, error: 'Job not found' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                job_id: job.job_id,
                status: job.status,
                pattern_type: job.pattern_type,
                preview_url: job.preview_url,
                stl_url: job.stl_url,
                error: job.error_message,
                created_at: job.created_at,
                completed_at: job.completed_at
            })
        };
    }

    // === POLL - For local Python service to get pending jobs ===
    if (action === 'poll') {
        const { data: jobs } = await supabase
            .from('stl_jobs')
            .select('job_id, pattern_type, image_base64, original_filename')
            .eq('status', 'pending')
            .order('created_at', { ascending: true })
            .limit(5);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                jobs: jobs || []
            })
        };
    }

    // === COMPLETE - Python service marks job done ===
    if (action === 'complete') {
        const { job_id, preview_url, stl_url, error: jobError } = body;

        if (!job_id) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'job_id required' })
            };
        }

        const updateData = {
            completed_at: new Date().toISOString()
        };

        if (jobError) {
            updateData.status = 'error';
            updateData.error_message = jobError;
        } else {
            updateData.status = 'complete';
            updateData.preview_url = preview_url;
            updateData.stl_url = stl_url;
        }

        await supabase
            .from('stl_jobs')
            .update(updateData)
            .eq('job_id', job_id);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ ok: true })
        };
    }

    return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: `Unknown action: ${action}` })
    };
};
