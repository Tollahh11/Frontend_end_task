let boy = document.getElementById("bodyy")
boy.style.margin = "auto"
boy.style.maxWidth = "50%"
boy.style.marginTop = "100px"
let formm = document.getElementById("formm")
formm.style.backgroundColor = "aqua"
formm.style.padding = "15%"
formm.style.borderRadius = "90px"
function valid(){
    let mail = document.forms['formm']['email'].value;
    let password = document.forms['formm']['password'].value;
    let confirmpassword = document.forms['formm']['confirmpassword'].value;
    if(mail == ""){
        alert("E-mail is required");
        return false;
    }
    if(password == ""){
        alert("Password is required");
        return false;
    }
    if (password.length < 6) {
            alert("Password must be greater than 6 characters")    
    }
    if (password != confirmpassword) {
            alert("Both passwords must be same")
    }
    
}