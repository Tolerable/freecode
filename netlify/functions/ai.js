/**
 * AI Gateway - MUD-Style API for AI-to-AI Communication
 *
 * Any AI can navigate this API and talk to other AI models.
 * Responses guide the AI to the next action.
 *
 * Endpoints:
 *   GET  /api/ai           - Entry point, list available models
 *   GET  /api/ai?help      - Full command reference
 *   POST /api/ai           - Query a model { model, prompt }
 */

const MODELS = {
    'deepseek': {
        name: 'DeepSeek',
        endpoint: 'https://text.pollinations.ai/',
        description: 'DeepSeek reasoning model via Pollinations',
        params: { model: 'deepseek' }
    },
    'openai': {
        name: 'OpenAI GPT-4o-mini',
        endpoint: 'https://text.pollinations.ai/',
        description: 'OpenAI GPT-4o-mini via Pollinations',
        params: { model: 'openai' }
    },
    'mistral': {
        name: 'Mistral',
        endpoint: 'https://text.pollinations.ai/',
        description: 'Mistral model via Pollinations',
        params: { model: 'mistral' }
    },
    'claude': {
        name: 'Claude (Pollinations)',
        endpoint: 'https://text.pollinations.ai/',
        description: 'Claude via Pollinations',
        params: { model: 'claude' }
    },
    'image': {
        name: 'Image Generator',
        endpoint: 'https://image.pollinations.ai/prompt/',
        description: 'Generate images from text prompts',
        type: 'image'
    }
};

exports.handler = async (event, context) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    const params = event.queryStringParameters || {};

    // GET /api/ai?help - Full command reference
    if (params.help !== undefined) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                where: 'AI Gateway Help',
                commands: {
                    'GET /api/ai': 'List available models',
                    'GET /api/ai?help': 'This help',
                    'GET /api/ai?model=deepseek&q=your+question': 'Quick query',
                    'POST /api/ai': 'Send { model, prompt } for full control'
                },
                models: Object.keys(MODELS),
                example: {
                    method: 'POST',
                    body: { model: 'deepseek', prompt: 'Explain quantum computing' }
                },
                next: 'Try: /api/ai?model=deepseek&q=hello'
            }, null, 2)
        };
    }

    // GET /api/ai - Entry point OR quick query
    if (event.httpMethod === 'GET') {
        // Quick query: /api/ai?model=X&q=Y
        if (params.model && params.q) {
            return await queryModel(params.model, params.q, headers);
        }

        // Entry point - list models
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                where: 'AI Gateway',
                you: 'visiting_ai',
                available_models: Object.entries(MODELS).map(([id, m]) => ({
                    id,
                    name: m.name,
                    description: m.description
                })),
                next: 'Query a model: /api/ai?model=deepseek&q=your+question',
                help: '/api/ai?help for full commands'
            }, null, 2)
        };
    }

    // POST /api/ai - Query a model
    if (event.httpMethod === 'POST') {
        let body;
        try {
            body = JSON.parse(event.body || '{}');
        } catch (e) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'invalid_json',
                    why: 'Could not parse request body',
                    fix: 'Send valid JSON: { "model": "deepseek", "prompt": "your question" }',
                    next: '/api/ai?help for examples'
                })
            };
        }

        const { model, prompt } = body;

        if (!model) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'missing_model',
                    why: 'No model specified',
                    fix: 'Add "model" to your request',
                    available: Object.keys(MODELS),
                    next: 'Try: { "model": "deepseek", "prompt": "hello" }'
                })
            };
        }

        if (!prompt) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'missing_prompt',
                    why: 'No prompt specified',
                    fix: 'Add "prompt" to your request',
                    next: 'Try: { "model": "' + model + '", "prompt": "your question" }'
                })
            };
        }

        return await queryModel(model, prompt, headers);
    }

    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
            ok: false,
            error: 'method_not_allowed',
            why: 'Use GET or POST',
            next: '/api/ai for entry point'
        })
    };
};

async function queryModel(modelId, prompt, headers) {
    const model = MODELS[modelId.toLowerCase()];

    if (!model) {
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
                ok: false,
                error: 'unknown_model',
                why: `Model "${modelId}" not found`,
                available: Object.keys(MODELS),
                fix: 'Pick from available models',
                next: '/api/ai to see all models'
            })
        };
    }

    // Image generation
    if (model.type === 'image') {
        const imageUrl = model.endpoint + encodeURIComponent(prompt);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                model: modelId,
                type: 'image',
                prompt: prompt,
                image_url: imageUrl,
                next: 'Open image_url to view, or try another prompt'
            })
        };
    }

    // Text generation via Pollinations
    try {
        const url = new URL(model.endpoint);
        url.searchParams.set('model', model.params.model);
        url.searchParams.set('prompt', prompt);
        url.searchParams.set('json', 'false');

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Accept': 'text/plain' }
        });

        if (!response.ok) {
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'upstream_error',
                    why: `Model returned ${response.status}`,
                    fix: 'Try again or use different model',
                    next: '/api/ai to see alternatives'
                })
            };
        }

        const text = await response.text();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                model: modelId,
                prompt: prompt,
                response: text,
                next: 'Send another prompt or try /api/ai?model=image&q=a+sunset for images'
            })
        };

    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                ok: false,
                error: 'request_failed',
                why: err.message,
                fix: 'Check your prompt and try again',
                next: '/api/ai?help for examples'
            })
        };
    }
}
