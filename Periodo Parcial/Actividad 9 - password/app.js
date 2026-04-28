var input = document.getElementById('passes');
var eyeIcon = document.getElementById('eye-icon');
eyeIcon.addEventListener('click', function () {
    if (input.type === 'password') { // exactamente igual a password
        input.type = 'text';
        eyeIcon.textContent = '😈';
    }
    else {
        input.type = 'password';
        eyeIcon.textContent = '👀';
    }
});
