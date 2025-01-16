// nav-loader.js
// Create a promise-based script loader
function loadScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        
        // Add any custom attributes
        Object.entries(attributes).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });
        
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error: ${src}`));
        document.head.appendChild(script);
    });
}

// Age verification handler
const ageVerificationHandler = {
    init() {
        // Make sure verifyAge is available globally
        window.verifyAge = function(isOver21) {
            if (isOver21) {
                localStorage.setItem('ageVerified', 'true');
                const modal = document.getElementById('ageModal');
                if (modal) modal.remove();
            } else {
                window.location.href = 'https://www.google.com';
            }
        };
    }
};

// Navigation handler
const navigationHandler = {
    async init() {
        const navContainer = document.createElement('div');
        navContainer.id = 'navigation-container';
        
        try {
            const response = await fetch('https://www.ai-ministries.com/components/nav.html');
            const html = await response.text();
            navContainer.innerHTML = html;
            
            // Insert navigation at the start of body
            document.body.insertBefore(navContainer, document.body.firstChild);
            
            // Execute any scripts from the loaded content
            const scripts = navContainer.getElementsByTagName('script');
            Array.from(scripts).forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.body.appendChild(newScript);
            });
        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    }
};

// Cookie handler
const cookieHandler = {
    async init() {
        try {
            await loadScript('https://cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js', {
                'data-cs-no-consent-autoblock': '1'
            });
        } catch (error) {
            console.error('Error loading cookie script:', error);
        }
    }
};

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize all handlers in sequence
        ageVerificationHandler.init();
        await navigationHandler.init();
        await cookieHandler.init();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}, { once: true }); // Use once: true to ensure the listener only fires once