// nav-loader.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.createElement('div');
    navContainer.id = 'navigation-container';

    fetch('https://www.ai-ministries.com/components/nav.html')
        .then(response => response.text())
        .then(html => {
            navContainer.innerHTML = html;
            document.body.insertBefore(navContainer, document.body.firstChild);
            
            // Execute any scripts that were in the loaded content
            const scripts = navContainer.getElementsByTagName('script');
            for(let script of scripts) {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.body.appendChild(newScript);
            }
        })
        .catch(error => console.error('Error loading navigation:', error));
});