// Load cookie script with your ID - this is all we need for cookie consent
const cookieScript = document.createElement('script');
cookieScript.src = '//cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
cookieScript.setAttribute('data-cs-no-consent-autoblock', '1');
document.head.appendChild(cookieScript);

// Age verification code
function showAgeVerification() {
    if (localStorage.getItem('ageVerified')) return;

    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.9); z-index: 10000; display: flex; 
                    justify-content: center; align-items: center;">
            <div style="background: #000; padding: 2rem; border: 2px solid #dc2626; 
                        border-radius: 8px; text-align: center; color: white;">
                <h2 style="margin-bottom: 1rem;">Age Verification Required</h2>
                <p style="margin-bottom: 2rem;">You must be 21 or older to view this site.</p>
                <button onclick="verifyAge(true)" 
                        style="background: #dc2626; color: white; border: none; 
                               padding: 0.5rem 2rem; margin: 0 0.5rem; cursor: pointer; 
                               border-radius: 4px;">
                    YES, I'M OVER 21
                </button>
                <button onclick="verifyAge(false)" 
                        style="background: #333; color: white; border: none; 
                               padding: 0.5rem 2rem; margin: 0 0.5rem; cursor: pointer; 
                               border-radius: 4px;">
                    NO, I'M UNDER 21
                </button>
            </div>
        </div>`;
    document.body.appendChild(modal);
}

window.verifyAge = function(isOver21) {
    if (isOver21) {
        localStorage.setItem('ageVerified', 'true');
        document.querySelector('[style*="position: fixed"]').remove();
    } else {
        window.location.href = 'https://www.google.com';
    }
};

setTimeout(showAgeVerification, 500);