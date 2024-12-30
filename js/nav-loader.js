// nav-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Create a container for the navigation
    const navContainer = document.createElement('div');
    navContainer.id = 'navigation-container';

    // Load the navigation content
    fetch('/components/nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Extract just the body content from the loaded HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Get just the nav content (not the entire HTML document)
            const navContent = tempDiv.querySelector('.ai-ministries-nav-only');
            if (navContent) {
                navContainer.appendChild(navContent);
                document.body.insertBefore(navContainer, document.body.firstChild);
                
                // Initialize mobile menu after content is loaded
                initializeMobileMenu();
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            navContainer.innerHTML = '<p>Error loading navigation. Please refresh the page.</p>';
        });

    function initializeMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                mobileMenu.classList.toggle('show');
                console.log('Menu toggled', mobileMenu.classList.contains('show'));
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (mobileMenu.classList.contains('show') && 
                    !mobileMenu.contains(e.target) && 
                    !mobileMenuButton.contains(e.target)) {
                    mobileMenu.classList.remove('show');
                }
            });
        } else {
            console.error('Mobile menu elements not found');
        }
    }
});