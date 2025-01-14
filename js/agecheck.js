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