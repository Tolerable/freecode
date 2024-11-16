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
            // Create the URL with parameters
            const encodedMessage = encodeURIComponent(message);
            const seed = Math.floor(Math.random() * 1000000); // Random seed
            const url = `https://text.pollinations.ai/${encodedMessage}?model=${selectedModel}&seed=${seed}&private=true`;

            const response = await fetch(url);
            
            // Handle the raw text response
            const aiResponse = await response.text();
            
            if (aiResponse) {
                appendMessage('AI: ' + aiResponse, 'ai-message');
                
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