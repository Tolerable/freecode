// Set up age verification function first
window.verifyAge = function(isOver21) {
    if (isOver21) {
        sessionStorage.setItem('ageVerified', 'true');
        const modal = document.getElementById('ageModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    } else {
        window.location.href = 'https://www.google.com';
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    // 1. Load navigation
    const navContainer = document.createElement('div');
    navContainer.id = 'navigation-container';
    
    try {
        // Get nav HTML
        const response = await fetch('https://www.ai-ministries.com/components/nav.html');
        const html = await response.text();
        navContainer.innerHTML = html;
        document.body.insertBefore(navContainer, document.body.firstChild);

        // 2. Setup mobile menu only
        const menuButton = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        if (menuButton && menu) {
            menuButton.addEventListener('click', () => menu.classList.toggle('show'));
        }

        // 3. Load cookie script exactly as provided
        const cookieScript = document.createElement('script');
        cookieScript.type = 'text/javascript';
        cookieScript.charset = 'UTF-8';
        cookieScript.src = '//cdn.cookie-script.com/s/ec705f4147843dbfdb127ea600fc6d08.js';
        document.head.appendChild(cookieScript);

        // 4. Check age if not verified this session
        if (!sessionStorage.getItem('ageVerified')) {
            const modalHTML = `
                <div id="ageModal" class="age-modal-overlay" style="opacity: 0; transition: opacity 0.3s ease;">
                    <div class="age-modal">
                        <h2>Age Verification Required</h2>
                        <p>Please confirm that you are 21 years of age or older to continue.</p>
                        <button class="age-button yes-button" onclick="verifyAge(true)">Yes, I am 21+</button>
                        <button class="age-button no-button" onclick="verifyAge(false)">No, I am under 21</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            setTimeout(() => {
                const modal = document.getElementById('ageModal');
                if (modal) modal.style.opacity = '1';
            }, 100);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
});