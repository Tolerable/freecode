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
            
            // Remove any script tags from the HTML before setting innerHTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const scripts = tempDiv.getElementsByTagName('script');
            Array.from(scripts).forEach(script => script.remove());
            
            // Set the cleaned HTML
            navContainer.innerHTML = tempDiv.innerHTML;
            
            // Insert navigation at the start of body
            document.body.insertBefore(navContainer, document.body.firstChild);
            
            // Initialize mobile menu functionality
            this.initMobileMenu();
        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    },

    initMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        
        if (menuButton && menu) {
            // Toggle menu open/closed when button clicked
            menuButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent document click from immediately closing it
                menu.classList.toggle('show');
            });

            // Hide menu if clicking outside of it
            document.addEventListener('click', (event) => {
                if (!event.target.closest('.mobile-menu') && 
                    !event.target.closest('.mobile-menu-button') && 
                    menu.classList.contains('show')) {
                    menu.classList.remove('show');
                }
            });
        }
    }
};



// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize all handlers in sequence
        ageVerificationHandler.init();
        await navigationHandler.init();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}, { once: true }); // Use once: true to ensure the listener only fires once