document.addEventListener('DOMContentLoaded', function() {
    // Create a container div with a specific class for scoping
    const navContainer = document.createElement('div');
    navContainer.className = 'ai-ministries-nav-only'; // Scoping class
    
    fetch('components/nav.html')
        .then(response => response.text())
        .then(html => {
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
        .catch(error => console.error('Error loading navigation:', error));
});