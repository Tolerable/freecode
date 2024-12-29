// Load cookie consent first
const cookieConsentScript = document.createElement('script');
cookieConsentScript.src = '/js/cookie-consent.js';
document.head.appendChild(cookieConsentScript);

// Your existing nav-loader.js code below...

document.addEventListener('DOMContentLoaded', function () {
    // Create a container div with a specific class for scoping
    const navContainer = document.createElement('div');
    navContainer.className = 'ai-ministries-nav-only'; // Scoping class

    // Correct path to nav.html
    fetch('/components/nav.html') // Absolute path to the nav.html file
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load nav.html: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            navContainer.innerHTML = html;
            document.body.insertBefore(navContainer, document.body.firstChild);

            // Add mobile menu functionality
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        })
        .catch((error) =>
            console.error('Error loading navigation:', error.message)
        );
});
