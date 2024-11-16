// js/nav-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation bar
    fetch('components/nav.html')
        .then(response => response.text())
        .then(data => {
            // Insert the navigation at the start of the body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Add mobile menu functionality after nav is loaded
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        });
});