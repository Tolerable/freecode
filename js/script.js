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
                // Extract code blocks
                const codeBlocks = aiResponse.match(/```[\s\S]*?```|\[CODE\][\s\S]*?\[\/CODE\]/g) || [];
                
                // Clean the message by removing all code blocks and ### markers
                let cleanedMessage = aiResponse
                    .replace(/```[\s\S]*?```|\[CODE\][\s\S]*?\[\/CODE\]/g, '')  // Remove code blocks
                    .replace(/###[\s\S]*?###/g, '')  // Remove ### sections
                    .replace(/\n{3,}/g, '\n\n')  // Remove excessive newlines
                    .trim();

                // Add indicator if there's code
                if (codeBlocks.length > 0) {
                    cleanedMessage += '\n(Code examples available in the code section below)';
                }

                // Display clean message in chat
                appendMessage('AI: ' + cleanedMessage, 'ai-message');

                // Handle code blocks if present
                if (codeBlocks.length > 0) {
                    codeOutput.innerHTML = '';
                    hiddenCodeArea.value = '';
                    let formattedCode = '';
                    
                    codeBlocks.forEach((block, index) => {
                        // Clean the code block
                        const cleanCode = block
                            .replace(/```\w*\n?|```$|\[CODE\]|\[\/CODE\]/g, '')
                            .trim();
                        
                        // Add separator between blocks
                        if (index > 0) {
                            formattedCode += '\n\n// -------------------- //\n\n';
                        }
                        
                        formattedCode += cleanCode;
                    });

                    // Store in hidden textarea and display in code output
                    hiddenCodeArea.value = formattedCode;
                    const codeSection = document.createElement('pre');
                    codeSection.className = 'code-block';
                    codeSection.textContent = formattedCode;
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