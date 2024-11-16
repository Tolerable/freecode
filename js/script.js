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

    // System message to instruct AI behavior
    const systemMessage = {
        role: 'system',
        content: `You are a helpful AI assistant focused on coding and technical discussions. 
        Maintain conversation context and remember previous messages.
        When sharing code examples, use triple backticks or markdown code blocks.
        Provide clear explanations along with your code.
        Keep responses technical but friendly.
        Format code properly with correct indentation and syntax.`
    };

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
            // Add user message to history
            conversationHistory.push({ role: 'user', content: message });

            // Keep last 10 messages from each participant
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }

            // Prepare the POST request
            const requestBody = {
                messages: [systemMessage, ...conversationHistory],
                model: selectedModel
            };

            const response = await fetch('https://text.pollinations.ai/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            const aiResponse = await response.text();
            
            if (aiResponse) {
                // Extract code blocks
                const codeBlocks = aiResponse.match(/```[\s\S]*?```/g) || [];
                
                // Clean the message for chat display
                let cleanedMessage = aiResponse
                    .replace(/```[\s\S]*?```/g, '')
                    .trim();

                if (codeBlocks.length > 0) {
                    cleanedMessage += '\n(Code examples available in the code section below)';
                }

                // Display clean message in chat
                appendMessage('AI: ' + cleanedMessage, 'ai-message');

                // Add AI response to history
                conversationHistory.push({ role: 'assistant', content: aiResponse });

                // Handle code blocks
                if (codeBlocks.length > 0) {
                    codeOutput.innerHTML = '';
                    hiddenCodeArea.value = '';
                    let formattedCode = '';
                    
                    codeBlocks.forEach((block, index) => {
                        const cleanCode = block
                            .replace(/```\w*\n?|```$/g, '')
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
        conversationHistory = [];
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