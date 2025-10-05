const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const queryType = document.querySelector('input[name="query-type"]:checked');
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked;

    const formAlert = document.querySelectorAll('.form-alert');

    let isValid = true;

    //first name validation
    if (firstName === '') {
        isValid = false;

        document.querySelector('#first-name + .form-alert').style.display = 'block';
        document.querySelector('#first-name').classList.add('form-error');
        document.querySelector('#first-name').classList.remove('form-success');
    } else {
        document.querySelector('#first-name + .form-alert').style.display = 'none';
        document.querySelector('#first-name').classList.remove('form-error');
        document.querySelector('#first-name').classList.add('form-success');
    }

    //last name validation
    if (lastName === '') {
        isValid = false;
        
        document.querySelector('#last-name + .form-alert').style.display = 'block';
        document.querySelector('#last-name').classList.add('form-error');
        document.querySelector('#last-name').classList.remove('form-success');
    } else {
        document.querySelector('#last-name + .form-alert').style.display = 'none';
        document.querySelector('#last-name').classList.remove('form-error');
        document.querySelector('#last-name').classList.add('form-success');
    }

    //email validation
    if(!isValidEmail(email)) {
        isValid = false;

        document.querySelector('#email + .form-alert').style.display = 'block';
        document.querySelector('#email').classList.add('form-error');
        document.querySelector('#email').classList.remove('form-success');
    } else {
        document.querySelector('#email + .form-alert').style.display = 'none';
        document.querySelector('#email').classList.remove('form-error');
        document.querySelector('#email').classList.add('form-success');
    }

    //query type validation
    if (queryType === null) {
        isValid = false;

        document.querySelector('.radio-inputs + .form-alert').style.display = 'block';
    } else {
        document.querySelector('.radio-inputs + .form-alert').style.display = 'none';
    }

    //message validation
    if (message === '') {
        isValid = false;
        
        document.querySelector('#message + .form-alert').style.display = 'block';
        document.querySelector('#message').classList.add('form-error');
        document.querySelector('#message').classList.remove('form-success');
    } else {
        document.querySelector('#message + .form-alert').style.display = 'none';
        document.querySelector('#message').classList.remove('form-error');
        document.querySelector('#message').classList.add('form-success');
    }

    //consent validation
    if(!consent) {
        isValid = false;

        formAlert[5].classList.add('form-error');
    } else {
        formAlert[5].classList.remove('form-error');
    }

    //form is valid
    if(isValid) {
        successMessage.classList.add('active');
        form.reset();
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('active');
        }, 5000);
    } 
});

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}