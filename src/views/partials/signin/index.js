const $email-check = document.querySelectorAll('#email-check')

function checkEmail (e) {
    e.preventDefault();

}

$email-check.addEventlistener('click', checkEmail);