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
            navContainer.innerHTML = html;
            document.body.insertBefore(navContainer, document.body.firstChild);
            
            // Initialize mobile menu functionality after content is loaded
            initializeMobileMenu();
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            navContainer.innerHTML = '<p>Error loading navigation. Please refresh the page.</p>';
        });
});

function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-trigger');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    if (mobileDropdowns) {
        mobileDropdowns.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const content = this.nextElementSibling;
                if (content) {
                    content.classList.toggle('active');
                }
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            if (mobileMenuButton) {
                mobileMenuButton.classList.remove('active');
            }
        }
    });
}