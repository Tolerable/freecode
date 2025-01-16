// Utility function to load external scripts
function loadScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
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
        // Only show if not verified in this session
        if (!sessionStorage.getItem('ageVerified')) {
            this.createModal();
        }

        // Make sure verifyAge is available globally
        window.verifyAge = (isOver21) => {
            if (isOver21) {
                sessionStorage.setItem('ageVerified', 'true');
                const modal = document.getElementById('ageModal');
                if (modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => modal.remove(), 300);
                }
            } else {
                window.location.href = 'https://www.google.com';
            }
        };
    },

    createModal() {
        const modalHTML = `
            <div id="ageModal" class="age-modal-overlay" style="opacity: 0; transition: opacity 0.3s ease;">
                <div class="age-modal">
                    <h2>Age Verification Required</h2>
                    <p>Please confirm that you are 21 years of age or older to continue.</p>
                    <button class="age-button yes-button" onclick="verifyAge(true)">Yes, I am 21+</button>
                    <button class="age-button no-button" onclick="verifyAge(false)">No, I am under 21</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        setTimeout(() => {
            const modal = document.getElementById('ageModal');
            if (modal) modal.style.opacity = '1';
        }, 100);
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
            
            // Clean the HTML of any scripts before inserting
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const scripts = tempDiv.getElementsByTagName('script');
            Array.from(scripts).forEach(script => script.remove());
            
            navContainer.innerHTML = tempDiv.innerHTML;
            document.body.insertBefore(navContainer, document.body.firstChild);
            
            // Initialize mobile menu after nav is inserted
            setTimeout(() => this.initMobileMenu(), 0);
            
        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    },

    initMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        
        if (menuButton && menu) {
            menuButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                menu.classList.toggle('show');
            });

            document.addEventListener('click', (e) => {
                if (menu.classList.contains('show') && 
                    !e.target.closest('.mobile-menu') && 
                    !e.target.closest('.mobile-menu-button')) {
                    menu.classList.remove('show');
                }
            });
        }
    }
};

// Cookie handler
const cookieHandler = {
    async init() {
        // Check if script is already loaded
        if (document.querySelector('script[src*="ec705f4147843dbfdb127ea600fc6d08.js"]')) {
            return; // Script already exists, don't load again
        }

        try {
            // Create and append the script directly instead of using loadScript
            const cookieScript = document.createElement('script');
            cookieScript.src = 'https://cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
            cookieScript.setAttribute('data-cs-no-consent-autoblock', '1');
            cookieScript.async = true; // Make it async to not block page load
            
            // Add error handling
            cookieScript.onerror = () => {
                console.error('Error loading cookie script');
            };

            document.head.appendChild(cookieScript);
        } catch (error) {
            console.error('Error initializing cookie script:', error);
        }
    }
};

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        ageVerificationHandler.init();
        await navigationHandler.init();
        await cookieHandler.init();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}, { once: true });