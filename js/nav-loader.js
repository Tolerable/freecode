document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.createElement('div');
    navContainer.id = 'navigation-container';

    fetch('https://www.ai-ministries.com/components/nav.html')
        .then(response => response.text())
        .then(html => {
            navContainer.innerHTML = html;
            document.body.insertBefore(navContainer, document.body.firstChild);
            
            // Execute specific scripts that were in the loaded content
            const scripts = navContainer.querySelectorAll('script[src*="agecheck.js"], script[src*="cookie-consent.js"]');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                document.body.appendChild(newScript);
            });
            
             const inlineScripts = navContainer.querySelectorAll('script:not([src])');
                inlineScripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                });
        })
        .catch(error => console.error('Error loading navigation:', error));
});