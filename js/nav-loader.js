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

    // Load the navigation
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
                        Array.from(script.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        newScript.textContent = script.textContent;
                        newScript.onload = () => resolve();
                        newScript.onerror = () => {
                            console.error('Error executing nav script:', script);
                            resolve();
                        }
                        script.parentNode.replaceChild(newScript, script);
                    });
                });
                
                Promise.all(loadScripts)
                    .then(() => {
                        document.dispatchEvent(new Event('navLoaded'));
                        initMobileMenu(); // Initialize mobile menu after nav is loaded
                    });
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                navContainer.innerHTML = '<div style="text-align: center; padding: 1rem;">Navigation loading error. Please refresh.</div>';
                document.dispatchEvent(new Event('navLoaded'));
            });
    }

    // Initialize mobile menu functionality
    function initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!mobileMenuButton || !mobileMenu) {
            console.log('Mobile menu elements not found, retrying...');
            setTimeout(initMobileMenu, 100);
            return;
        }

        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('show');
            
            // Toggle aria-expanded attribute
            const isExpanded = mobileMenu.classList.contains('show');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('show') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.remove('show');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Check and show age modal if needed
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