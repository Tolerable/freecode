// Age verification - uses localStorage (reliable) + cookie (subdomains)
function setAgeVerified() {
    try { localStorage.setItem('ageVerified', 'true'); } catch(e) {}
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    // Only set domain if on ai-ministries.com (avoids rejection on localhost/other domains)
    const isAiMinistries = window.location.hostname.endsWith('ai-ministries.com');
    const domainPart = isAiMinistries ? '; domain=.ai-ministries.com' : '';
    document.cookie = `ageVerified=true${domainPart}; path=/; expires=${expires}; SameSite=Lax`;
}

function isAgeVerified() {
    try { if (localStorage.getItem('ageVerified') === 'true') return true; } catch(e) {}
    return document.cookie.split(';').some(c => c.trim().startsWith('ageVerified=true'));
}

window.verifyAge = function(isOver21) {
    if (isOver21) {
        setAgeVerified();
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
        const response = await fetch('https://www.ai-ministries.com/components/nav.html?v=' + Date.now());
        const html = await response.text();
        navContainer.innerHTML = html;
        document.body.insertBefore(navContainer, document.body.firstChild);

        // 2. Execute scripts from loaded HTML (innerHTML doesn't auto-execute)
        // Must load external scripts first, THEN inline scripts
        const scripts = navContainer.querySelectorAll('script');
        const externalScripts = [];
        const inlineScripts = [];
        
        scripts.forEach(oldScript => {
            if (oldScript.src) {
                externalScripts.push(oldScript.src);
            } else {
                inlineScripts.push(oldScript.textContent);
            }
        });
        
        // Load external scripts and wait for them
        await Promise.all(externalScripts.map(src => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }));
        
        // Now run inline scripts (aiAuth is available)
        inlineScripts.forEach(code => {
            const script = document.createElement('script');
            script.textContent = code;
            document.head.appendChild(script);
        });

        // 3. Setup mobile menu only
        const menuButton = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        if (menuButton && menu) {
            menuButton.addEventListener('click', () => menu.classList.toggle('show'));
        }

        // 4. Check age if not verified (cookie shared across subdomains)
        if (!isAgeVerified()) {
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