// Function to initialize age check modal
function initAgeCheck() {
    // Check if age already verified
    if (localStorage.getItem('ageVerified')) {
        return; // Exit if verified already
    }

    // Create modal overlay and content
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'age-modal-overlay';
    modalOverlay.id = 'ageModal';
	
    const modalContent = document.createElement('div');
    modalContent.className = 'age-modal';
    modalContent.innerHTML = `
        <h2>Age Verification</h2>
        <p>You must be 21 years of age or older to enter this site.</p>
        <button class="age-button yes-button" onclick="window.verifyAge(true)">I am 21 or older</button>
        <button class="age-button no-button" onclick="window.verifyAge(false)">I am under 21</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}

// Age verification function (needs to be global)
window.verifyAge = function(isOver21) {
    if (isOver21) {
        localStorage.setItem('ageVerified', 'true');
        const modal = document.getElementById('ageModal');
        if (modal) {
            modal.remove();
        }
    } else {
        window.location.href = 'https://www.google.com';
    }
};

// Call function to initialize modal on page load
initAgeCheck();