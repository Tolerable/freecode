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

    let conversationHistory = [];

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
            // Add user message to conversation history
            conversationHistory.push({ role: 'user', content: message });

            // Create the full context with conversation history
            const context = conversationHistory.map(msg => 
                `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
            ).join('\n');

            const encodedMessage = encodeURIComponent(context);
            const url = `https://text.pollinations.ai/${encodedMessage}?model=${selectedModel}`;
            const response = await fetch(url);
            const aiResponse = await response.text();
            
            if (aiResponse) {
                // Extract code blocks
                const codeBlocks = aiResponse.match(/```[\s\S]*?```|\[CODE\][\s\S]*?\[\/CODE\]/g) || [];
                
                // Clean the message
                let cleanedMessage = aiResponse
                    .replace(/```[\s\S]*?```|\[CODE\][\s\S]*?\[\/CODE\]/g, '')
                    .replace(/###[\s\S]*?###/g, '')
                    .replace(/\n{3,}/g, '\n\n')
                    .trim();

                if (codeBlocks.length > 0) {
                    cleanedMessage += '\n(Code examples available in the code section below)';
                }

                // Display clean message in chat
                appendMessage('AI: ' + cleanedMessage, 'ai-message');

                // Add AI response to conversation history
                conversationHistory.push({ role: 'assistant', content: aiResponse });

                // Limit conversation history to last 10 messages
                if (conversationHistory.length > 10) {
                    conversationHistory = conversationHistory.slice(-10);
                }

                // Handle code blocks if present
                if (codeBlocks.length > 0) {
                    codeOutput.innerHTML = '';
                    hiddenCodeArea.value = '';
                    let formattedCode = '';
                    
                    codeBlocks.forEach((block, index) => {
                        const cleanCode = block
                            .replace(/```\w*\n?|```$|\[CODE\]|\[\/CODE\]/g, '')
                            .trim();
                        
                        if (index > 0) {
                            formattedCode += '\n\n// -------------------- //\n\n';
                        }
                        
                        formattedCode += cleanCode;
                    });

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
        conversationHistory = [];  // Clear conversation history when model changes
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