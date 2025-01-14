// Load cookie script with your ID and styling options
const cookieScript = document.createElement('script');
cookieScript.src = '//cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
cookieScript.setAttribute('data-cs-no-consent-autoblock', '1');
cookieScript.setAttribute('data-cs-position', 'bottom-right');
cookieScript.setAttribute('data-cs-style-vars', '--cs_bg_color:rgba(0,0,0,0.8); --cs_icon_size:24px;');
document.head.appendChild(cookieScript);