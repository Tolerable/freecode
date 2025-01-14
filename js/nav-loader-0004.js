// Simple loader - NO COOKIE SCRIPT
const navContainer = document.createElement('div');
navContainer.id = 'navigation-container';

// Load navigation first
fetch('https://www.ai-ministries.com/components/nav.html')
    .then(response => response.text())
    .then(html => {
        navContainer.innerHTML = html;
        document.body.insertBefore(navContainer, document.body.firstChild);

        // Once nav is loaded, add JUST the age check script
        const ageCheckScript = document.createElement('script');
        ageCheckScript.src = 'https://www.ai-ministries.com/js/agecheck.js';
        document.head.appendChild(ageCheckScript);
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
        navContainer.innerHTML = '<div style="text-align: center; padding: 1rem;">Navigation loading error. Please refresh.</div>';
    });