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
        content: `You are a helpful AI coding assistant. Keep responses clear and well-formatted.
        - Use line breaks between paragraphs for readability
        - Place code in a single \`\`\` block
        - Maintain natural conversation style
        - Add proper spacing in explanations`
    };

	async function fetchModels() {
		try {
			const response = await fetch('https://text.pollinations.ai/models');
			const models = await response.json();
			modelSelect.innerHTML = models
				.map(model => `<option value="${model.name}">${model.description} (${model.type})</option>`)
				.join('');
		} catch (error) {
			console.error("Error fetching models:", error);
			modelSelect.innerHTML = '<option value="openai">OpenAI GPT-4o (chat)</option>';  // Fallback option
			appendMessage('System: Failed to load models, using default', 'error-message');
		}
	}

    async function sendMessage(message) {
        const selectedModel = modelSelect.value;
        appendMessage('User: ' + message, 'user-message');

        try {
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
				// Extract code block if present
				const codeMatch = aiResponse.match(/```[\s\S]*?```/);
				
				// Clean message but only remove the code block, keeping natural spacing
				let cleanedMessage = aiResponse
					.replace(/```[\s\S]*?```/g, '')
					.trim();

				// Display formatted message
				appendMessage('AI: ' + cleanedMessage, 'ai-message');

				// Only update code display if there's new code
				if (codeMatch) {
					const code = codeMatch[0]
						.replace(/```\w*\n/, '')  // Remove opening ``` and language identifier
						.replace(/```$/, '')      // Remove closing ```
						.trim();

					codeOutput.innerHTML = `
						<div class="code-header">
							<span>Code Solution</span>
							<button onclick="copyCode()" class="copy-button">Copy Code</button>
						</div>
						<pre><code>${escapeHtml(code)}</code></pre>
					`;

					// Add copy functionality
					window.copyCode = function() {
						const tempTextArea = document.createElement('textarea');
						tempTextArea.value = code;  // This will now have the clean code without language identifier
						document.body.appendChild(tempTextArea);
						tempTextArea.select();
						document.execCommand('copy');
						document.body.removeChild(tempTextArea);
						
						const copyBtn = document.querySelector('.copy-button');
						copyBtn.textContent = 'Copied!';
						setTimeout(() => copyBtn.textContent = 'Copy Code', 2000);
					};
				}
				// Removed the else clause that was clearing codeOutput

				conversationHistory.push({ role: 'assistant', content: aiResponse });
			}
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Error: Failed to get response', 'error-message');
        }
    }

    // Escape HTML to prevent code execution
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Preserve line breaks in messages
	function appendMessage(message, className) {
		const messageDiv = document.createElement('div');
		messageDiv.className = className;
		
		// Split by newlines but handle spacing better
		const paragraphs = message.split('\n')
			.map(para => para.trim())
			.filter(para => para.length > 0); // Remove empty lines
		
		paragraphs.forEach((para, index) => {
			const p = document.createElement('p');
			p.textContent = para;
			messageDiv.appendChild(p);
			
			// Add only one line break between paragraphs, not after the last one
			if (index < paragraphs.length - 1) {
				messageDiv.appendChild(document.createElement('br'));
			}
		});

		chatMessages.appendChild(messageDiv);
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

    modelSelect.addEventListener('change', () => {
        chatMessages.innerHTML = '';
        codeOutput.innerHTML = '';
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

    // Initialize by loading models
    fetchModels();
});