firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	  window.location.replace("http://rurulala.kro.kr"); //return to root

  } else {
	  var userEmail=getCookie("user_email");
	  console.log('rurulala');
	  if(userEmail != null){
	  document.getElementById("#email").value = userEmail;
  }
  }
});


/* LOGIN PROCESS */

$("#loginBtn").click(
  function(){


    var email = $("#email").val();
    var password = $("#password").val();
		setCookie("user_email",email,30); //set "user_email" cookie, expires in 30 days
	  if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
		  
		$("#error").text(errorMessage);
      });
    }
  }
);


/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

  }
);

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}