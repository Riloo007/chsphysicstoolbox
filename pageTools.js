function generateMathHtml(equation) {
    var finalString = "";
    var tokens = equation.split("");
    finalString += "<table class='Formula'><tbody><tr><td>";
    var inExponent = 0;
    // Cycle through each character
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        // Exponents
        if (token == "^" && tokens[i+1] == "(") {
          finalString += "<sup>"
          inExponent += 1;
          i+=1;
        }
        else if (token == ")" && inExponent > 0) {
          inExponent--;
          finalString += "</sup>";
          i+=1;
        }

        // Fractions
        else if (token == "[") {
          // Problem: Fraction takes over and doesn't style exponents in the fraction
          finalString += "</td>";
          fractionIsntFinished = true;
          finalString += "<td><div><table><tbody><tr><td>"
          while(fractionIsntFinished) {
            i++;
            token = tokens[i];
            // Fraction Split
            if(token == "]" && tokens[i+1] == "/" && tokens[i+2] == "[") {
              i += 2;
              finalString += "</td></tr><tr><td><div style='border-top: 10px solid #FFFFFF;'></div></td></tr><tr><td>";
              token = tokens[i];
            } else if (token == "]") {
            // Fraction Done
              finalString += "</td></tr></tbody></table></div></td><td>"
              fractionIsntFinished = false;
            } else {
            // Fraction Contents
              finalString += token;
            }
          }
        }
        
        // Add anything else
        else {
          finalString += token;
        }
    } 

    // Close table
    finalString += "</td></tr></tbody></table>";
    return finalString;
}

function rInt(i) {
  return Math.round(Math.random() * i);
}

function pad(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

var database;
function setupFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBD8TGQSt2Oit3A0Ow4vqUbi9iSarjAhng",
    authDomain: "chsphysicstoolbox.firebaseapp.com",
    projectId: "chsphysicstoolbox",
    storageBucket: "chsphysicstoolbox.appspot.com",
    messagingSenderId: "1013873625231",
    appId: "1:1013873625231:web:9e179abf423b8891f2c8fa",
    measurementId: "G-7Z6SQHBGPV"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
}

document.addEventListener('DOMContentLoaded', function(){
  // Header and Footer
  header = `
    <table style="font-size: 20px; padding: 3px; margin-right: 15px;">
      <td style="width: 100%;"><a href="index2.html">chsphysicstoolbox</a></td>
      <td>
        <img style="width: 25px; height: 25px; cursor: pointer;" src="menu-icon.svg" onclick="toggleMenu();"> 
      </td>
    </table>
    <menu id="menu">
      <div class="messageContainer">
        <h2>Menu</h2>
        <p>Nothing here right now :)</p>
      </div>
    </menu>
  `;

  footer = `
  <div>
    <p>
        Copyright 2023 Glitch
    </p>
    <p id="FooterMessage">
    </p>
  </div>
  `

  document.getElementById('header').innerHTML = header;
  document.getElementById('footer').innerHTML = footer;

  if(!database) {setupFirebase();}
  const ref = database.ref('messages/' + pad(rInt(2)));
  ref.on('value', function(snapshot){
    snapshot.val();
    document.getElementById("FooterMessage").innerHTML = snapshot.val();
  });
});

menuOpen = false;
function toggleMenu() {
  menu = document.getElementById("menu");
  if(menuOpen) {
    menu.style.height = "0vh";
    menuOpen = false;
  } else {
    menu.style.height = "50vh";
    menuOpen = true;
  }
}


/*
//
// FIREBASE
//

  const firebaseConfig = {
    apiKey: "AIzaSyBD8TGQSt2Oit3A0Ow4vqUbi9iSarjAhng",
    authDomain: "chsphysicstoolbox.firebaseapp.com",
    projectId: "chsphysicstoolbox",
    storageBucket: "chsphysicstoolbox.appspot.com",
    messagingSenderId: "1013873625231",
    appId: "1:1013873625231:web:9e179abf423b8891f2c8fa",
    measurementId: "G-7Z6SQHBGPV"
  };

*/