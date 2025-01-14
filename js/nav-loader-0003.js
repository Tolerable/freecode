// Simple loader that just gets everything in place
const navContainer = document.createElement('div');
navContainer.id = 'navigation-container';

// Load navigation first
fetch('https://www.ai-ministries.com/components/nav.html')
    .then(response => response.text())
    .then(html => {
        navContainer.innerHTML = html;
        document.body.insertBefore(navContainer, document.body.firstChild);

        // Once nav is loaded, add the age check script
        const ageCheckScript = document.createElement('script');
        ageCheckScript.src = 'https://www.ai-ministries.com/js/agecheck.js';
        document.head.appendChild(ageCheckScript);

        // And add the cookie script
        const cookieScript = document.createElement('script');
        cookieScript.src = 'https://www.ai-ministries.com/js/cookie-consent.js';
        document.head.appendChild(cookieScript);
    })
    .catch(error => {
        console.error('Error loading navigation:', error);
        navContainer.innerHTML = '<div style="text-align: center; padding: 1rem;">Navigation loading error. Please refresh.</div>';
    });