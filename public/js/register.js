const socket = io()
socket.on('connect', () => {
    console.log(`h
    h
    h`)
})

const SendCode = () => {
    socket.emit('register', document.getElementById('email').value)
}

const checkValidateName = () => {
    var error = "";
    Name = document.getElementById("name").value;

    var illegalChars = /\W/; // allow letters, numbers, and underscores
    if (Name == "") {
        error = " Please enter Username";
    } else if ((Name.length < 5) || (Name.length > 15)) {
        error = " Username must have 5-15 characters";
    } else if (illegalChars.test(Name)) {
        error = " Please enter valid Username. Use only numbers and alphabets";
    } else {
        error = "";
    }
    if (error == "") {
        socket.emit('validateName', Name);
    } else {
        errormsg = document.getElementById("nameMsg");
        errormsg.style.color = 'red';
        errormsg.innerHTML = error;
    }
}
const checkValidateEmail = () => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    input = document.getElementById("email");
    errormsg = document.getElementById("emailMsg");
    if (!input.value.match(validRegex)) {
        errormsg.innerHTML = "Email is invalid"
        errormsg.style.color = 'red';
    }
    else {
        socket.emit('validateEmail', input.value);
    }
}
const checkPass = async () => {
    pass = document.getElementById("password").value;
    if (pass.length < 6) {
        errormsg = document.getElementById("passwordMsg");
        errormsg.innerHTML = 'password must be at least 6 characters'
        errormsg.style.color = 'red';
    } else{ errormsg.innerHTML = "" }
}
const checkRepass = async () => {
    pass = document.getElementById("password").value;
    repass = document.getElementById("rePassword").value;
    if (pass != repass) {
        errormsg = document.getElementById("rePasswordMsg");
        errormsg.innerHTML ="password does not match"
        errormsg.style.color = 'red';
    }
    else {errormsg.innerHTML = ""}
}
const sendCode = async ()=>{
    email = document.getElementById("email").value;
    socket.emit('sendCode', email);
}

socket.on('error', (data) => {
    Element = document.getElementById(data.id);
    ElementMsg = document.getElementById(data.id + 'Msg');
    ElementMsg.innerHTML = data.error;
    ElementMsg.style.color = "red";
})

socket.on('sendcode',async (data)=>{
    document.getElementById('nameMsg').innerHTML = 'code sent'
    document.getElementById('nameMsg').style.color = "green";

    document.getElementById('verifyButton').style.display = "none";
    console.log('none')
    timer = document.getElementById('Timer');
    timer.style.display = "inline";
    let div = document.getElementById("codeinput");
    div.style.display = "inline"
    console.log(data)
    const downloadTimer = setInterval(() => {
        if (data.time <= 0) {
            document.getElementById("verifyButton").style.display = "inline";
            timer.style.display = "none";
            clearInterval(downloadTimer);
        }
        timer.innerHTML = "Resend code after "+data.time;
        data.time -= 1;
    }, 1000 ) })
socket.on('success', (data) => {
    Element = document.getElementById(data.id);
    ElementMsg = document.getElementById(data.id + 'Msg');
    ElementMsg.innerHTML = data.msg;
    ElementMsg.style.color = "green";
    ElementMsg.style.height = "20px";
})
