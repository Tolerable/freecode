// script.js
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const modelSelect = document.getElementById('model-select');
    const codeOutput = document.getElementById('code-output');

    let conversationHistory = [];
    let availableModels = [];

    // Fetch available models when page loads
    async function fetchModels() {
        try {
            const response = await fetch('https://text.pollinations.ai/models');
            availableModels = await response.json();
            
            // Populate model select dropdown
            modelSelect.innerHTML = availableModels
                .map(model => `<option value="${model.name}" data-type="${model.type}">${model.description}</option>`)
                .join('');
        } catch (error) {
            console.error('Error fetching models:', error);
            appendMessage('System: Failed to load models', 'error-message');
        }
    }

    async function sendMessage(message) {
        const selectedModel = modelSelect.value;
        const modelType = modelSelect.options[modelSelect.selectedIndex].dataset.type;
        
        appendMessage('User: ' + message, 'user-message');
        
        // Add message to conversation history
        conversationHistory.push({ role: 'user', content: message });

        try {
            let payload = {
                messages: [...conversationHistory],
                model: selectedModel
            };

            // Special handling for different model types
            if (modelType === 'completion') {
                // For completion-type models, format differently
                payload = {
                    prompt: message,
                    model: selectedModel
                };
            }

            // Some models require system message in each request
            if (['mistral', 'mistral-large', 'unity'].includes(selectedModel)) {
                payload.messages.unshift({
                    role: 'system',
                    content: 'You are a helpful AI assistant focused on coding and technical tasks.'
                });
            }

            const response = await fetch('https://text.pollinations.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if (data.choices && data.choices[0]) {
                const aiResponse = data.choices[0].message.content;
                appendMessage('AI: ' + aiResponse, 'ai-message');
                
                // Add AI response to conversation history
                conversationHistory.push({
                    role: 'assistant',
                    content: aiResponse
                });

                // Handle code blocks
                const codeBlocks = aiResponse.match(/```[\s\S]*?```/g);
                if (codeBlocks) {
                    codeOutput.innerHTML = '';
                    codeBlocks.forEach(block => {
                        const codeSection = document.createElement('pre');
                        codeSection.textContent = block.replace(/```\w*\n?|```$/g, '');
                        codeOutput.appendChild(codeSection);
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Error: Failed to get response', 'error-message');
        }
    }

    function appendMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = className;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Clear history when model changes
    modelSelect.addEventListener('change', () => {
        conversationHistory = [];
        chatMessages.innerHTML = '';
        codeOutput.innerHTML = '';
        appendMessage('System: Switched to ' + modelSelect.options[modelSelect.selectedIndex].text, 'system-message');
    });

    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });

    // Initialize by fetching models
    fetchModels();
});