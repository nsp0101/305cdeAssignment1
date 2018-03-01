var userNum = 0;
var allAge = 0;


  // Initialize Firebase 
  var config = {
    apiKey: "AIzaSyDliGmrsDx2h-jEVh841CGzKxxAnvAQaPk",
    authDomain: "assignment1-8525e.firebaseapp.com",
    databaseURL: "https://assignment1-8525e.firebaseio.com",
    projectId: "assignment1-8525e",
    storageBucket: "assignment1-8525e.appspot.com",
    messagingSenderId: "22249652018"
  };
  firebase.initializeApp(config);


var dbRef= firebase.database().ref().child("registers")

dbRef.on('value', function(snap) {
    var registers = snap.val()
    userNum = registers.length;
    for (var i = 0; i < registers.length; i++) {
        allAge += registers[i].age;
    }
});

// Print data to table 1
var dbRefName= firebase.database().ref().child("registers").orderByChild("name");
dbRefName.on("child_added", snap => {
    $("#sortByName").append("<tr><td>" + snap.child("username").val() + "</td><td>" + snap.child("name").val() + "</td><td>" + snap.child("email").val() + "</td><td>" + snap.child("age").val() + "</td></tr>");
});

// Print data to table 2
var dbRefAge= firebase.database().ref().child("registers").orderByChild("age");
dbRefAge.on("child_added", snap => {
    $("#sortByAge").append("<tr><td>" + snap.child("username").val() + "</td><td>" + snap.child("name").val() + "</td><td>" + snap.child("email").val() + "</td><td>" + snap.child("age").val() + "</td></tr>");
});

document.getElementById('avgAge').onclick = function() {
    var result = allAge / userNum;
   alert("The average age is " + result);
};
    
document.getElementById('addUser').onclick = function(){
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var age = parseInt(document.getElementById('age').value);
 
    var message;
    if (validateUsername() && validateName() 
        && validateEmail() && validatePwd() && validateAge()) {
        firebase.database().ref('registers/' + userNum).set({
            username: username,
            name: name,
            email: email,
            password: password,
            age: age
        });
        message = "Form submitted";
    } else {
        message = "Form not submitted";
    }
    alert(message);
};

//Clear all input
document.getElementById('clear').onclick = function(){
    document.getElementById('username').value = "";
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('age').value = "";
};

function validateUsername(){
    var username = document.getElementById('username').value;
    if (!username || (username.length < 3)) {
        alert('Please at least 3 characters for your username!');
        return false;
    }else{
        return true;
    }
}

function validateName(){
    var name = document.getElementById('name').value;
    if (!name || (name.length < 3) || (name.indexOf(' ') == -1)) {
        alert('Please enter a correct name(First Name + Last Name)!');
        return false;
    }else{
        return true;
    }
}

function validateEmail(){
    var email = document.getElementById('email').value;
    if (!email || (email.length < 6) || (email.indexOf('@') == -1)) {
        alert('Please enter a valid email address!');
        return false;
    }else{
        return true;
    }
}

function validatePwd(){
    var password = document.getElementById('password').value;
    if (!password || (password.length < 6)) {
        alert('Please at least input a 6 characters password!');
        return false;
    }else{
        return true;
    }
}

function validateAge(){
    var age = parseInt(document.getElementById('age').value);
    if (!age || (age < 1) || (age > 90)) {
        alert('The age must greater than 1 and less that 90!');
        return false;
    }else{
        return true;
    }
}