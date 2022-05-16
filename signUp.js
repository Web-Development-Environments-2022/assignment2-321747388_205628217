// validation
$(document).ready(function(){
	$("#signUpForm").validate({
	  	rules: {
			userName:{
				required: true,
				freeUserName: true
			},

			password:{
				required: true,
				minlength: 6,
				checkPsw: true
			},

			firstName:{
				required: true,
				lettersOnly: true
			},
			
			lastName:{
				required: true,
				lettersOnly: true
			},

			email: {
			required: true,
			email: true
			},

			birthday: {
			required: true
			}
		},

	 	messages :{
			userName:{
				freeUserName:"This user name is taken, please choose a new one."
			}, 

			password:{
				checkPsw:"Password must include letters and digits."
			},
			
			firstName:{
				lettersOnly: "First name must contain letters only."
			}, 

			lastName:{
				lettersOnly: "Last name must contain letters only."
			}
	  	},

		//on submit
		submitHandler: function(event) {
            signUpUser();
		}
	}),
	//methods
	// check if password is valid
	$.validator.addMethod("checkPsw", function (value) {
		if (!/[a-zA-Z]/.test(value)) {
			return false;
		}
		else if (!/[0-9]/.test(value)) {
			return false;
		}
		return true	
	}),
	// check if name contains letters only
	$.validator.addMethod("lettersOnly", function (value) {
		return /^[a-z]+$/i.test(value)	
	})
	// check if the user name is available
	$.validator.addMethod("freeUserName", function (value) {
		for (let i = 0; i < db.length; i++){
			let user = db[i];
			if (user.userName == value)
			return false 
		}	
		return true;
	})
})

// add user to database
function signUpUser(){
    var $userInput = $('#signUpForm :input');
    var userInputValues = {};
    $userInput.each(function() {
        userInputValues[this.name] = $(this).val();
    });
    newUser = {
        userName: userInputValues["userName"],
        password: userInputValues["password"]
    }
    db.push(newUser);
}