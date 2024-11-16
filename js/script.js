// script.js
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const modelSelect = document.getElementById('model-select');
    const codeOutput = document.getElementById('code-output');

    // Fetch available models when page loads
    async function fetchModels() {
        try {
            const response = await fetch('https://text.pollinations.ai/models');
            const models = await response.json();
            
            modelSelect.innerHTML = models
                .map(model => `<option value="${model.name}">${model.description}</option>`)
                .join('');
        } catch (error) {
            console.error('Error fetching models:', error);
            appendMessage('System: Failed to load models', 'error-message');
        }
    }

    async function sendMessage(message) {
        const selectedModel = modelSelect.value;
        appendMessage('User: ' + message, 'user-message');

        try {
            // Use URL encoded parameters for the request
            const encodedMessage = encodeURIComponent(message);
            const url = `https://text.pollinations.ai/${encodedMessage}?model=${selectedModel}`;

            const response = await fetch(url);
            
            // Get raw text response
            const aiResponse = await response.text();
            
            if (aiResponse) {
                appendMessage('AI: ' + aiResponse, 'ai-message');
                
                // Process code blocks if present
                const codeMatch = aiResponse.match(/\[CODE\]([\s\S]*?)\[\/CODE\]/g);
                if (codeMatch) {
                    codeOutput.innerHTML = '';
                    codeMatch.forEach(block => {
                        const codeContent = block.replace(/\[CODE\]|\[\/CODE\]/g, '').trim();
                        const codeSection = document.createElement('pre');
                        codeSection.textContent = codeContent;
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

    // Event listeners
    modelSelect.addEventListener('change', () => {
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

    // Initialize
    fetchModels();
});