// Function to load cookie script
function loadCookieScript() {
    const cookieScript = document.createElement('script');
    cookieScript.src = 'https://cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
    cookieScript.setAttribute('data-cs-no-consent-autoblock', '1');
    document.head.appendChild(cookieScript);
}

// Call function to load the script on page load
loadCookieScript();