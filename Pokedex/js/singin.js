window.onload = init;

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "login.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', signin);
}

function signin(){
    var mail = document.getElementById('input-mail').value;
    var name_user = document.getElementById('input-name').value;
    var password = document.getElementById('input-password').value; 

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name_user,
            user_mail: mail,
            user_password: password
        }
    }).then(function(res) {
        alert("Registro del usuario exitoso!");
        window.location.href = "login.html";
    }).catch(function(err){
        console.log(err);
    });
}