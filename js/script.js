// script.js
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const modelSelect = document.getElementById('model-select');
    const codeOutput = document.getElementById('code-output');
    const hiddenCodeArea = document.createElement('textarea');
    hiddenCodeArea.style.display = 'none';
    document.body.appendChild(hiddenCodeArea);

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
            const encodedMessage = encodeURIComponent(message);
            const url = `https://text.pollinations.ai/${encodedMessage}?model=${selectedModel}`;
            const response = await fetch(url);
            const aiResponse = await response.text();
            
            if (aiResponse) {
                // Extract code blocks using either backticks or [CODE] tags
                const codeBlocks = aiResponse.match(/```[\s\S]*?```|\[CODE\][\s\S]*?\[\/CODE\]/g) || [];
                
                // Store all code blocks in hidden textarea
                hiddenCodeArea.value = codeBlocks
                    .map(block => block
                        .replace(/```\w*\n?|```$|\[CODE\]|\[\/CODE\]/g, '')
                        .trim())
                    .join('\n\n// -------------------- //\n\n');

                // Display cleaned message in chat (without code blocks)
                const cleanedMessage = aiResponse
                    .replace(/```[\s\S]*?```|\[CODE\][\s\S]*?\[\/CODE\]/g, '')
                    .trim();
                appendMessage('AI: ' + cleanedMessage, 'ai-message');

                // Display code in code output area
                if (hiddenCodeArea.value) {
                    codeOutput.innerHTML = '';
                    const codeSection = document.createElement('pre');
                    codeSection.className = 'code-block';
                    codeSection.textContent = hiddenCodeArea.value;
                    codeOutput.appendChild(codeSection);
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

    modelSelect.addEventListener('change', () => {
        chatMessages.innerHTML = '';
        codeOutput.innerHTML = '';
        hiddenCodeArea.value = '';
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

    fetchModels();
});