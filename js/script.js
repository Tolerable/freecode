// script.js
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const modelSelect = document.getElementById('model-select');
    const codeOutput = document.getElementById('code-output');
    
    let conversationHistory = [];

    const systemMessage = {
        role: 'system',
        content: `You are a helpful AI coding assistant. Format your responses clearly:
        - Use natural paragraphs with proper spacing for explanations
        - Put complete code solutions in a single code block using triple backticks
        - Keep code blocks complete and self-contained
        - Maintain conversation context and personality
        - Add line breaks between thoughts for readability`
    };

    async function sendMessage(message) {
        const selectedModel = modelSelect.value;
        appendMessage('User: ' + message, 'user-message');

        try {
            // Keep conversation history limited but meaningful
            conversationHistory.push({ role: 'user', content: message });
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }

            const response = await fetch('https://text.pollinations.ai/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [systemMessage, ...conversationHistory],
                    model: selectedModel
                })
            });

            const aiResponse = await response.text();
            
            if (aiResponse) {
                // Extract any code block
                const codeMatch = aiResponse.match(/```[\s\S]*?```/);
                const code = codeMatch ? codeMatch[0].replace(/```/g, '').trim() : null;
                
                // Clean chat message and format with proper spacing
                let cleanedMessage = aiResponse
                    .replace(/```[\s\S]*?```/g, '')
                    .replace(/\n{3,}/g, '\n\n')  // Limit consecutive newlines
                    .trim()
                    .split('\n')
                    .map(line => line.trim())
                    .join('\n');

                // Add indication if there's code
                if (code) {
                    cleanedMessage += '\n\nI\'ve provided the complete code solution in the code section below.';
                }

                appendMessage('AI: ' + cleanedMessage, 'ai-message');
                
                // Update code display if there's code
                if (code) {
                    codeOutput.innerHTML = `
                        <div class="code-container">
                            <div class="code-header">
                                <span>Code Solution</span>
                                <button class="copy-button" onclick="navigator.clipboard.writeText(\`${code}\`)">
                                    Copy Code
                                </button>
                            </div>
                            <pre class="code-block">${code}</pre>
                        </div>
                    `;
                } else {
                    codeOutput.innerHTML = '';
                }

                conversationHistory.push({ role: 'assistant', content: aiResponse });
            }
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Error: Failed to get response', 'error-message');
        }
    }

    function appendMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = className;
        // Use <pre> for chat to maintain formatting but wrap text
        const preElement = document.createElement('pre');
        preElement.style.whiteSpace = 'pre-wrap';
        preElement.style.wordBreak = 'break-word';
        preElement.textContent = message;
        messageDiv.appendChild(preElement);
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