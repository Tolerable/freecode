// Age verification function
function verifyAge(isOver21) {
    if (isOver21) {
        localStorage.setItem('ageVerified', 'true');
        document.querySelector('[style*="position: fixed"]').remove();
    } else {
        window.location.href = 'https://www.google.com';
    }
}