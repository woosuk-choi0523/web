firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	$("#SignUpBtn").hide();
	$("#ShowModal").hide();
	$("#signOutBtn").show();

  } else {
	$("#SignUpBtn").show();
	$("#ShowModal").show();
	$("#signOutBtn").hide();
    // No user is signed in.

  }
});


/* LOGIN PROCESS */
$("#loginBtn").click(
  function(){


    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);
/* ShowModal dialog button*/
$("#ShowModal").click(
  function(){
	      var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
	  dialog.showModal();
  }
);

/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
		$("#loginBtn").show();
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

  }
);
