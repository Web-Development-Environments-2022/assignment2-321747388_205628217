//log in
function logIn(){
    var $userInput = $('#logInForm :input');
    var userInputValues = {};
    $userInput.each(function() {
        userInputValues[this.name] = $(this).val();
    });
	alert(userInputValues["loginUserName"]);
	alert(userInputValues["loginPassword"]);
    // if user exists and password is correct
    var validUser = validateUser(userInputValues["loginUserName"], userInputValues["loginPassword"]);
    if (validUser == true){
        showScreen("settings");
    }
    else{
        alert("Incorrect user name or password.")
    }
}

function validateUser(userName, password){
    for (let i = 0; i < db.length; i++){
        if (userName === db[i].userName && password === db[i].password){
            return true;            
        }
    }
    return false;
}