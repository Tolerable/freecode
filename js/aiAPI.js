/**
 * WHAT: Universal AI API wrapper for ai-ministries.com
 * USE: <script src="/js/aiAPI.js"></script>
 *      const response = await aiAPI.text.generate("Hello");
 *      const imageUrl = await aiAPI.image.generate("A cat");
 * DEPENDS: None (vanilla JS)
 * REPLACES: pollinations.ai calls
 *
 * PROVIDERS:
 * - Text: Groq (free) → OpenAI (user key)
 * - Image: HuggingFace (free) → OpenAI DALL-E (user key)
 */

const aiAPI = (function() {
    'use strict';

    // Configuration stored in localStorage
    const CONFIG_KEY = 'ai-api-config';

    const defaultConfig = {
        textProvider: 'groq',      // 'groq', 'openai', 'anthropic'
        imageProvider: 'huggingface', // 'huggingface', 'openai', 'pollinations'
        keys: {
            groq: '',
            openai: '',
            anthropic: '',
            huggingface: ''
        },
        textModel: 'llama-3.1-8b-instant',
        imageModel: 'stabilityai/stable-diffusion-xl-base-1.0'
    };

    // Load config from localStorage
    function getConfig() {
        try {
            const saved = localStorage.getItem(CONFIG_KEY);
            return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
        } catch {
            return defaultConfig;
        }
    }

    // Save config to localStorage
    function saveConfig(config) {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    }

    // Get API key for provider
    function getKey(provider) {
        const config = getConfig();
        return config.keys[provider] || '';
    }

    // Set API key for provider
    function setKey(provider, key) {
        const config = getConfig();
        config.keys[provider] = key;
        saveConfig(config);
    }

    // ===== TEXT GENERATION =====

    async function generateText(prompt, options = {}) {
        const config = getConfig();
        const provider = options.provider || config.textProvider;

        try {
            switch (provider) {
                case 'groq':
                    return await groqText(prompt, options);
                case 'openai':
                    return await openaiText(prompt, options);
                case 'pollinations':
                    return await pollinationsText(prompt, options);
                default:
                    throw new Error(`Unknown text provider: ${provider}`);
            }
        } catch (error) {
            console.error(`Text generation failed with ${provider}:`, error);

            // Fallback chain: groq -> pollinations -> error
            if (provider === 'groq') {
                console.log('Falling back to pollinations...');
                return await pollinationsText(prompt, options);
            }
            throw error;
        }
    }

    // Groq API (free tier available)
    async function groqText(prompt, options = {}) {
        const key = getKey('groq');
        if (!key) {
            throw new Error('Groq API key required. Get one free at console.groq.com');
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: options.model || getConfig().textModel,
                messages: [
                    { role: 'system', content: options.system || 'You are a helpful assistant.' },
                    { role: 'user', content: prompt }
                ],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 1024
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // OpenAI API (user provides key)
    async function openaiText(prompt, options = {}) {
        const key = getKey('openai');
        if (!key) {
            throw new Error('OpenAI API key required. Get one at platform.openai.com');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: options.model || 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: options.system || 'You are a helpful assistant.' },
                    { role: 'user', content: prompt }
                ],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 1024
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Pollinations (legacy fallback)
    async function pollinationsText(prompt, options = {}) {
        const model = options.model || 'openai';
        const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=${model}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pollinations API error: ${response.status}`);
        }

        return await response.text();
    }

    // ===== IMAGE GENERATION =====

    async function generateImage(prompt, options = {}) {
        const config = getConfig();
        const provider = options.provider || config.imageProvider;

        try {
            switch (provider) {
                case 'huggingface':
                    return await huggingfaceImage(prompt, options);
                case 'openai':
                    return await openaiImage(prompt, options);
                case 'pollinations':
                    return await pollinationsImage(prompt, options);
                default:
                    throw new Error(`Unknown image provider: ${provider}`);
            }
        } catch (error) {
            console.error(`Image generation failed with ${provider}:`, error);

            // Fallback chain: huggingface -> pollinations -> error
            if (provider === 'huggingface') {
                console.log('Falling back to pollinations...');
                return await pollinationsImage(prompt, options);
            }
            throw error;
        }
    }

    // HuggingFace Inference API (free tier)
    async function huggingfaceImage(prompt, options = {}) {
        const key = getKey('huggingface');
        if (!key) {
            throw new Error('HuggingFace API key required. Get one free at huggingface.co/settings/tokens');
        }

        const model = options.model || getConfig().imageModel;
        const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    width: options.width || 512,
                    height: options.height || 512
                }
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(`HuggingFace API error: ${response.status} - ${error.error || 'Unknown'}`);
        }

        // HuggingFace returns binary image data
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }

    // OpenAI DALL-E (user provides key)
    async function openaiImage(prompt, options = {}) {
        const key = getKey('openai');
        if (!key) {
            throw new Error('OpenAI API key required. Get one at platform.openai.com');
        }

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: options.model || 'dall-e-3',
                prompt: prompt,
                n: 1,
                size: options.size || '1024x1024',
                response_format: 'url'
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.data[0].url;
    }

    // Pollinations (legacy fallback)
    async function pollinationsImage(prompt, options = {}) {
        const params = new URLSearchParams({
            width: options.width || 512,
            height: options.height || 512,
            seed: options.seed || Math.floor(Math.random() * 999999),
            nologo: 'true'
        });

        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`;

        // For pollinations, we return the URL directly (it generates on request)
        return url;
    }

    // ===== SETTINGS UI =====

    function showSettings() {
        const config = getConfig();

        const html = `
            <div id="ai-api-settings" style="
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: #1a1a1a; color: #fff; padding: 20px; border-radius: 8px;
                border: 2px solid #333; z-index: 10000; max-width: 400px; width: 90%;
            ">
                <h2 style="margin-top:0;">AI API Settings</h2>
                <p style="font-size: 12px; color: #888;">Configure your AI providers. Keys are stored locally in your browser.</p>

                <div style="margin: 10px 0;">
                    <label style="display: block; margin-bottom: 5px;">Text Provider:</label>
                    <select id="ai-text-provider" style="width: 100%; padding: 8px; background: #333; color: #fff; border: 1px solid #555;">
                        <option value="groq" ${config.textProvider === 'groq' ? 'selected' : ''}>Groq (Free tier)</option>
                        <option value="openai" ${config.textProvider === 'openai' ? 'selected' : ''}>OpenAI (Paid)</option>
                        <option value="pollinations" ${config.textProvider === 'pollinations' ? 'selected' : ''}>Pollinations (Legacy)</option>
                    </select>
                </div>

                <div style="margin: 10px 0;">
                    <label style="display: block; margin-bottom: 5px;">Image Provider:</label>
                    <select id="ai-image-provider" style="width: 100%; padding: 8px; background: #333; color: #fff; border: 1px solid #555;">
                        <option value="huggingface" ${config.imageProvider === 'huggingface' ? 'selected' : ''}>HuggingFace (Free tier)</option>
                        <option value="openai" ${config.imageProvider === 'openai' ? 'selected' : ''}>OpenAI DALL-E (Paid)</option>
                        <option value="pollinations" ${config.imageProvider === 'pollinations' ? 'selected' : ''}>Pollinations (Legacy)</option>
                    </select>
                </div>

                <hr style="border-color: #333; margin: 15px 0;">

                <div style="margin: 10px 0;">
                    <label style="display: block; margin-bottom: 5px;">Groq API Key: <a href="https://console.groq.com" target="_blank" style="color: #4a9eff; font-size: 11px;">Get free key</a></label>
                    <input type="password" id="ai-key-groq" value="${config.keys.groq}" style="width: 100%; padding: 8px; background: #333; color: #fff; border: 1px solid #555; box-sizing: border-box;">
                </div>

                <div style="margin: 10px 0;">
                    <label style="display: block; margin-bottom: 5px;">HuggingFace Token: <a href="https://huggingface.co/settings/tokens" target="_blank" style="color: #4a9eff; font-size: 11px;">Get free token</a></label>
                    <input type="password" id="ai-key-huggingface" value="${config.keys.huggingface}" style="width: 100%; padding: 8px; background: #333; color: #fff; border: 1px solid #555; box-sizing: border-box;">
                </div>

                <div style="margin: 10px 0;">
                    <label style="display: block; margin-bottom: 5px;">OpenAI API Key: <a href="https://platform.openai.com" target="_blank" style="color: #4a9eff; font-size: 11px;">Get key</a></label>
                    <input type="password" id="ai-key-openai" value="${config.keys.openai}" style="width: 100%; padding: 8px; background: #333; color: #fff; border: 1px solid #555; box-sizing: border-box;">
                </div>

                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button onclick="aiAPI.saveSettings()" style="flex: 1; padding: 10px; background: #4a9eff; color: #fff; border: none; cursor: pointer; border-radius: 4px;">Save</button>
                    <button onclick="aiAPI.hideSettings()" style="flex: 1; padding: 10px; background: #333; color: #fff; border: 1px solid #555; cursor: pointer; border-radius: 4px;">Cancel</button>
                </div>
            </div>
            <div id="ai-api-overlay" onclick="aiAPI.hideSettings()" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); z-index: 9999;
            "></div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
    }

    function hideSettings() {
        const settings = document.getElementById('ai-api-settings');
        const overlay = document.getElementById('ai-api-overlay');
        if (settings) settings.remove();
        if (overlay) overlay.remove();
    }

    function saveSettings() {
        const config = getConfig();

        config.textProvider = document.getElementById('ai-text-provider').value;
        config.imageProvider = document.getElementById('ai-image-provider').value;
        config.keys.groq = document.getElementById('ai-key-groq').value;
        config.keys.huggingface = document.getElementById('ai-key-huggingface').value;
        config.keys.openai = document.getElementById('ai-key-openai').value;

        saveConfig(config);
        hideSettings();

        // Optional: show confirmation
        console.log('AI API settings saved');
    }

    // ===== PUBLIC API =====

    return {
        text: {
            generate: generateText,
            providers: ['groq', 'openai', 'pollinations']
        },
        image: {
            generate: generateImage,
            providers: ['huggingface', 'openai', 'pollinations']
        },
        config: {
            get: getConfig,
            save: saveConfig,
            getKey: getKey,
            setKey: setKey
        },
        showSettings: showSettings,
        hideSettings: hideSettings,
        saveSettings: saveSettings,

        // Legacy compatibility - drop-in for pollinations
        legacy: {
            textUrl: (prompt, model) => `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=${model || 'openai'}`,
            imageUrl: (prompt, opts) => {
                const params = new URLSearchParams({
                    width: opts?.width || 512,
                    height: opts?.height || 512,
                    seed: opts?.seed || Math.floor(Math.random() * 999999),
                    nologo: 'true'
                });
                return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`;
            }
        }
    };
})();

// Make globally available
window.aiAPI = aiAPI;

console.log('AI API loaded. Use aiAPI.showSettings() to configure providers.');
