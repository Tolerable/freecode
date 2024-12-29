window.CookieScriptSettings = {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    buttonBackground: '#dc2626',
    buttonColor: '#ffffff',
    banner: {
        title: 'This website uses local storage and limited cookies',
        desc: 'We use local storage for website functionality and minimal third-party services for hosting. No personal data is collected or tracked.',
        buttons: {
            accept: 'Accept',
            reject: 'Reject',
            manage: 'Manage',
            close: '×'
        }
    }
};

const cookieScript = document.createElement('script');
cookieScript.src = '//cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
cookieScript.setAttribute('data-cs-no-consent-autoblock', '1');
document.head.appendChild(cookieScript);

// Add age verification
function checkAge() {
    // Check if already verified
    if (localStorage.getItem('ageVerified')) {
        return;
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: #000;
        padding: 2rem;
        border: 2px solid #dc2626;
        border-radius: 8px;
        text-align: center;
        color: white;
    `;

    content.innerHTML = `
        <h2 style="margin-bottom: 1rem;">Age Verification Required</h2>
        <p style="margin-bottom: 2rem;">You must be 21 or older to view this site.</p>
        <button onclick="verifyAge(true)" style="background: #dc2626; color: white; border: none; padding: 0.5rem 2rem; margin: 0 0.5rem; cursor: pointer; border-radius: 4px;">YES, I'M OVER 21</button>
        <button onclick="verifyAge(false)" style="background: #333; color: white; border: none; padding: 0.5rem 2rem; margin: 0 0.5rem; cursor: pointer; border-radius: 4px;">NO, I'M UNDER 21</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Add to window so buttons can access it
window.verifyAge = function(isOver21) {
    if (isOver21) {
        localStorage.setItem('ageVerified', 'true');
        document.querySelector('[style*="position: fixed"]').remove();
    } else {
        window.location.href = 'https://www.google.com';
    }
};

// Run age check after page loads
document.addEventListener('DOMContentLoaded', checkAge);