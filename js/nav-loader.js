// Enhanced nav-loader.js
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.createElement('div');
    navContainer.id = 'navigation-container';

    fetch('/components/nav.html')
        .then(response => response.text())
        .then(html => {
            navContainer.innerHTML = html;
            document.body.insertBefore(navContainer, document.body.firstChild);
            
            // Execute scripts with better error handling
            const scripts = navContainer.getElementsByTagName('script');
            Array.from(scripts).forEach(script => {
                try {
                    const newScript = document.createElement('script');
                    // Copy any attributes from the original script
                    Array.from(script.attributes).forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    newScript.textContent = script.textContent;
                    script.parentNode.replaceChild(newScript, script);
                } catch (error) {
                    console.error('Error executing nav script:', error);
                }
            });

            // Add touch event handling for mobile devices
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const dropdowns = document.querySelectorAll('.mobile-dropdown-trigger');

            if (mobileMenuButton && mobileMenu) {
                // Handle both click and touch events
                ['click', 'touchstart'].forEach(eventType => {
                    mobileMenuButton.addEventListener(eventType, function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        mobileMenu.classList.toggle('show');
                    }, { passive: false });
                });

                // Improve scrolling on iOS
                mobileMenu.addEventListener('touchmove', function(e) {
                    e.stopPropagation();
                }, { passive: true });

                // Close menu on outside click/touch
                document.addEventListener('click', function(e) {
                    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                        mobileMenu.classList.remove('show');
                    }
                });

                // Handle orientation change
                window.addEventListener('orientationchange', function() {
                    if (window.innerWidth > 768) {
                        mobileMenu.classList.remove('show');
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            navContainer.innerHTML = '<div style="text-align: center; padding: 1rem;">Navigation loading error. Please refresh.</div>';
        });
});