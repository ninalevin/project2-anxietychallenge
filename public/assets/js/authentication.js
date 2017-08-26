$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyA_O7K2wLkFH7wIr-XA-rtpV3bzIGKg3lc",
    authDomain: "szfirebase.firebaseapp.com",
    databaseURL: "https://szfirebase.firebaseio.com",
    projectId: "szfirebase",
    storageBucket: "szfirebase.appspot.com",
    messagingSenderId: "296084749114"
  };
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("logged in");

      // Display picture and name on page
      notLoggedIn();
      // $("#user_name").text(localStorage.name);
      // $("#users_update").text("Welcome, " + localStorage.name);
      // $("#display_picture").attr("src", localStorage.picture);
    } else {
      console.log("not logged in");
      notLoggedIn();
    }
  });

  $("#logout_button").on("click", function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      localStorage.removeItem("name");
      localStorage.removeItem("picture");
      localStorage.removeItem("email");
      localStorage.removeItem("guid");
      localStorage.removeItem("userid");
      window.location.href = window.location.origin;
      console.log("You've signed out");
    }).catch(function(error) {
      // An error happened.
    });
  })

  function notLoggedIn() {
    $("#login_button").on('click', function() {

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        name = user.displayName;
        email = user.email;
        photo = user.photoURL;
        uid = user.uid;
        // console.log("USER OBJECT 0", user);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("picture", user.photoURL);
        localStorage.setItem("guid", user.uid);
        localStorage.setItem("email", user.email);
        // console.log(localStorage.name);
        // $("#user_name").text(localStorage.name);
        // $("#display_picture").src(localStorage.photoURL);

        var userObject = {
          guid: user.uid,
          name: user.displayName,
          email: user.email,
          picture: user.photoURL
        };

        // console.log("USER OBJECT", userObject);
        console.log("USER OBJECT", userObject);

        //Checks for user in database
        // NOTE: We'll probably be using a $.get here so that we can get
        // access to all the existing users.
        $.post("/user/check", userObject)
          .done(function(data) {
            console.log("POSTING DATA", data);
            // localStorage.setItem("userid", data.user_data.id);
            // console.log(localStorage.userid);
            // var destination = data.redirect;
            // window.location.href = window.location + destination;
            // console.log(localStorage.userid);
            // console.log("writing to db");
          });

        //If the we can find the user in the json, we send an object back
        //with the new users cred.

        //otherwise, if the user exists, we display their homepage, with a
        //$.get to their id's data

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        // ...
      });
    });
  }
  });
