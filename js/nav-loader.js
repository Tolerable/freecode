document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.createElement('div');
    navContainer.id = 'navigation-container';

    fetch('/components/nav.html')
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

            // Load age check
            const ageCheck = document.createElement('script');
            ageCheck.src = '/js/agecheck.js';
            ageCheck.onload = function() {
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
            };
            document.head.appendChild(ageCheck);

            // Load cookie consent
            const cookieConsent = document.createElement('script');
            cookieConsent.src = '/js/cookie-consent.js';
            document.head.appendChild(cookieConsent);
        })
        .catch(error => console.error('Error loading navigation:', error));
});