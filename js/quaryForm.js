const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', validate);

function validate() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('useremail').value;
    let messages = [];
    if ( username == '') {
        messages.push('Username is empty');
    } else if ( email == '') {
        messages.push('Email is empty');
    } else if (ValidateEmail(email)) {
        messages.push('email must be valid');
    }
    if (messages.length > 0) {
        alert(messages);
    } else {
        alert('submitted');
    }

}
function ValidateEmail(mail) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (false)
  }else {
    return (true)
  }
}