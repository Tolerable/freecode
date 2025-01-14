// Cookie consent script with safety checks and error handling
(function() {
    try {
        const cookieScript = document.createElement('script');
        cookieScript.src = '//cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
        cookieScript.async = true; // Make it async to not block
        cookieScript.setAttribute('data-cs-no-consent-autoblock', '1');
        cookieScript.setAttribute('data-cs-position', 'bottom-right');
        cookieScript.setAttribute('data-cs-style-vars', '--cs_bg_color:rgba(0,0,0,0.8); --cs_icon_size:24px;');
        
        // Add error handling
        cookieScript.onerror = function(error) {
            console.error('Error loading cookie consent script:', error);
        };
        
        // Add load handling
        cookieScript.onload = function() {
            console.log('Cookie consent script loaded successfully');
        };
        
        document.head.appendChild(cookieScript);
    } catch(e) {
        console.error('Error initializing cookie consent:', e);
    }
})();