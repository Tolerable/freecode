// Claude File Bridge - Netlify Function
// Handles: signup, login, upload, pull, poll, balance

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://todhqdgatlejylifqpni.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Generate secure API key (32 chars)
function generateApiKey() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let key = 'fb_'; // file bridge prefix
    for (let i = 0; i < 32; i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
    }
    return key;
}

// Calculate gem cost based on file size
function calculateCost(sizeBytes) {
    const sizeMB = sizeBytes / (1024 * 1024);
    if (sizeMB <= 1) return 1;
    if (sizeMB <= 5) return 5;
    if (sizeMB <= 25) return 15;
    if (sizeMB <= 50) return 30;
    return -1; // Too large
}

exports.handler = async (event) => {
    // CORS headers
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

    const { action, api_key } = body;

    // === SIGNUP ===
    if (action === 'signup') {
        const { email } = body;
        if (!email || !email.includes('@')) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'Valid email required' })
            };
        }

        // Check if email exists
        const { data: existing } = await supabase
            .from('bridge_users')
            .select('id')
            .eq('email', email)
            .single();

        if (existing) {
            return {
                statusCode: 409,
                headers,
                body: JSON.stringify({ ok: false, error: 'Email already registered' })
            };
        }

        // Create user
        const newKey = generateApiKey();
        const { data: user, error } = await supabase
            .from('bridge_users')
            .insert({
                email: email,
                api_key: newKey,
                gems_balance: 50 // Free starter gems
            })
            .select()
            .single();

        if (error) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ ok: false, error: error.message })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                api_key: newKey,
                gems_balance: 50,
                message: 'Account created! Save your API key - you\'ll need it to connect.'
            })
        };
    }

    // === All other actions require api_key ===
    if (!api_key) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ ok: false, error: 'API key required' })
        };
    }

    // Get user
    const { data: user } = await supabase
        .from('bridge_users')
        .select('*')
        .eq('api_key', api_key)
        .single();

    if (!user) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ ok: false, error: 'Invalid API key' })
        };
    }

    // === BALANCE ===
    if (action === 'balance') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                gems_balance: user.gems_balance,
                email: user.email
            })
        };
    }

    // === UPLOAD (phone/claude -> home PC) ===
    if (action === 'upload') {
        const { filename, content_base64 } = body;

        if (!filename || !content_base64) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'filename and content_base64 required' })
            };
        }

        // Validate file size
        const sizeBytes = Buffer.from(content_base64, 'base64').length;
        const cost = calculateCost(sizeBytes);

        if (cost === -1) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'File too large (50MB max)' })
            };
        }

        if (user.gems_balance < cost) {
            return {
                statusCode: 402,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'Insufficient gems',
                    needed: cost,
                    have: user.gems_balance
                })
            };
        }

        // Queue file for PC poller
        await supabase.from('bridge_queue').insert({
            user_id: user.id,
            direction: 'to_pc',
            filename: filename,
            content_base64: content_base64,
            size_bytes: sizeBytes,
            status: 'pending'
        });

        // Deduct gems
        await supabase
            .from('bridge_users')
            .update({ gems_balance: user.gems_balance - cost })
            .eq('id', user.id);

        // Log usage
        await supabase.from('bridge_usage').insert({
            user_id: user.id,
            action: 'upload',
            filename: filename,
            size_bytes: sizeBytes,
            gems_spent: cost
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                gems_spent: cost,
                gems_remaining: user.gems_balance - cost
            })
        };
    }

    // === PULL (request file from home PC) ===
    if (action === 'pull') {
        const { filepath } = body;

        if (!filepath) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'filepath required' })
            };
        }

        // Create pull request
        const { data: request, error } = await supabase
            .from('bridge_requests')
            .insert({
                user_id: user.id,
                filepath: filepath,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ ok: false, error: error.message })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                request_id: request.id,
                status: 'pending',
                message: 'Request queued. PC poller will fulfill it.'
            })
        };
    }

    // === FETCH (check if pull request is ready) ===
    if (action === 'fetch') {
        const { request_id } = body;

        if (!request_id) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'request_id required' })
            };
        }

        const { data: request } = await supabase
            .from('bridge_requests')
            .select('*')
            .eq('id', request_id)
            .eq('user_id', user.id)
            .single();

        if (!request) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ ok: false, error: 'Request not found' })
            };
        }

        if (request.status === 'ready' && request.content_base64) {
            // Charge gems now that file is ready
            const cost = calculateCost(request.size_bytes || 1000);

            if (user.gems_balance < cost) {
                return {
                    statusCode: 402,
                    headers,
                    body: JSON.stringify({
                        ok: false,
                        error: 'Insufficient gems to download',
                        needed: cost,
                        have: user.gems_balance
                    })
                };
            }

            // Deduct gems
            await supabase
                .from('bridge_users')
                .update({ gems_balance: user.gems_balance - cost })
                .eq('id', user.id);

            // Mark as downloaded
            await supabase
                .from('bridge_requests')
                .update({ status: 'downloaded' })
                .eq('id', request_id);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    ok: true,
                    filename: request.filepath.split('/').pop(),
                    filepath: request.filepath,
                    content_base64: request.content_base64,
                    size: request.size_bytes,
                    gems_spent: cost,
                    gems_remaining: user.gems_balance - cost
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: false,
                status: request.status,
                message: request.status === 'pending' ? 'Waiting for PC to respond' : request.status
            })
        };
    }

    // === POLL (PC poller checks for pending requests) ===
    if (action === 'poll') {
        // Get pending pull requests
        const { data: requests } = await supabase
            .from('bridge_requests')
            .select('id, filepath')
            .eq('user_id', user.id)
            .eq('status', 'pending');

        // Get pending uploads to PC
        const { data: uploads } = await supabase
            .from('bridge_queue')
            .select('id, filename, content_base64, size_bytes')
            .eq('user_id', user.id)
            .eq('direction', 'to_pc')
            .eq('status', 'pending');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                pull_requests: requests || [],
                uploads: uploads || []
            })
        };
    }

    // === RESPOND (PC poller fulfills a pull request) ===
    if (action === 'respond') {
        const { request_id, content_base64, size_bytes, error: respError } = body;

        if (!request_id) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ ok: false, error: 'request_id required' })
            };
        }

        if (respError) {
            await supabase
                .from('bridge_requests')
                .update({ status: 'error', error_message: respError })
                .eq('id', request_id)
                .eq('user_id', user.id);
        } else {
            await supabase
                .from('bridge_requests')
                .update({
                    status: 'ready',
                    content_base64: content_base64,
                    size_bytes: size_bytes,
                    fulfilled_at: new Date().toISOString()
                })
                .eq('id', request_id)
                .eq('user_id', user.id);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ ok: true })
        };
    }

    // === CONFIRM (PC poller confirms upload received) ===
    if (action === 'confirm') {
        const { queue_id } = body;

        await supabase
            .from('bridge_queue')
            .update({ status: 'delivered' })
            .eq('id', queue_id)
            .eq('user_id', user.id);

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
