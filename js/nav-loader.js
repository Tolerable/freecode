(function() {
    // Dynamically load the agecheck.js
    const ageCheckScript = document.createElement('script');
    ageCheckScript.src = 'https://www.ai-ministries.com/js/agecheck.js';
    ageCheckScript.onload = function() {
      // After agecheck.js loads, proceed with navigation loading and then check for the modal.
        loadNavigation();
        checkAndShowAgeModal();
    };
    ageCheckScript.onerror = function() {
        console.error('Error loading agecheck.js');
        loadNavigation(); // Still try to load navigation even if this fails
    };
    document.head.appendChild(ageCheckScript);
    // Load the cookie consent
    const cookieScript = document.createElement('script');
    cookieScript.src = 'https://www.ai-ministries.com/js/cookie-consent.js';
    document.head.appendChild(cookieScript);
    // Immediately load the navigation bar and check for Age
    function loadNavigation() {
        const navContainer = document.createElement('div');
        navContainer.id = 'navigation-container';
        fetch('https://www.ai-ministries.com/components/nav.html')
            .then(response => response.text())
            .then(html => {
                navContainer.innerHTML = html;
                document.body.insertBefore(navContainer, document.body.firstChild);
                // Execute scripts with better error handling
                const scripts = navContainer.getElementsByTagName('script');
                const loadScripts = Array.from(scripts).map(script => {
                    return new Promise((resolve, reject) => {
                        const newScript = document.createElement('script');
                        // Copy any attributes from the original script
                        Array.from(script.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        newScript.textContent = script.textContent;
                        newScript.onload = () => resolve();
                        newScript.onerror = () => {
                            console.error('Error executing nav script:', script);
                            resolve(); // Resolve even if there's an error with this script, try to load others.
                        }
                        script.parentNode.replaceChild(newScript, script);
                    });
                });
                Promise.all(loadScripts).then(() => {
                    // Dispatch the navLoaded event
                    document.dispatchEvent(new Event('navLoaded'));
                });
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                navContainer.innerHTML = '<div style="text-align: center; padding: 1rem;">Navigation loading error. Please refresh.</div>';
                document.dispatchEvent(new Event('navLoaded')); // Still fire this in case of failure
            });
    }
    // Immediately check age and potentially render modal
    function checkAndShowAgeModal() {
        if (!localStorage.getItem('ageVerified')) {
            const modal = document.createElement('div');
            modal.id = 'ageModal';
            modal.classList.add('age-modal-overlay');
            modal.innerHTML = `
                <div class="age-modal">
                    <h2>Age Verification Required</h2>
                    <p>You must be 21 or older to view this site.</p>
                    <button class="age-button yes-button" onclick="verifyAge(true)">
                        YES, I'M OVER 21
                    </button>
                    <button class="age-button no-button" onclick="verifyAge(false)">
                        NO, I'M UNDER 21
                    </button>
                </div>`;
            document.body.appendChild(modal);
        }
    }
})();