let input = document.getElementById('passes') as HTMLInputElement;
let eyeIcon = document.getElementById('eye-icon') as HTMLElement;

eyeIcon.addEventListener('click', function () { // funcion con evento
    if (input.type === 'password') { // exactamente igual a password
        input.type = 'text';
        eyeIcon.textContent = '😈';
    } else {
        input.type = 'password';
        eyeIcon.textContent = '👀';
    }
})

export { };
