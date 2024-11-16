document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const codeOutput = document.getElementById('code-output');

    async function sendMessage(message) {
        // Add user message to chat
        appendMessage('User: ' + message, 'user-message');

        try {
            // Replace this URL with your pollinations.ai endpoint
            const response = await fetch('https://text.pollinations.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'openai',  // or your chosen model
                    messages: [{
                        role: 'user',
                        content: message
                    }]
                })
            });

            const data = await response.json();
            
            if (data.choices && data.choices[0]) {
                const aiResponse = data.choices[0].message.content;
                appendMessage('AI: ' + aiResponse, 'ai-message');
                
                // Check if response contains code and display it
                const codeMatch = aiResponse.match(/```[\s\S]*?```/g);
                if (codeMatch) {
                    codeOutput.textContent = codeMatch[0].replace(/```/g, '');
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
});