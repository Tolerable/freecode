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

// Create and inject the cookie script
const cookieScript = document.createElement('script');
cookieScript.src = '//cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
cookieScript.setAttribute('data-cs-no-consent-autoblock', '1');
document.head.appendChild(cookieScript);