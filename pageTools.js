var variableSortString;   // Cloud stored string that sorts the variables for the different equations
var activeFormula;        // The selected/solved variable
var noOfVars;             // The number of variables in the string

function generateMathHtml(equation, varIndex, genTypeSimple) {
  //console.log("STARTING SUBROUTINE AT VARINDEX ", varIndex);
    if (varIndex == 'undefined') {
      var varIndex = 0;
      console.log('CAUGHT VAR INDEX')
    }
    var finalString = "";
    //console.log(equation);
    var tokens = equation.split("");
    finalString += "<table class='Formula'><tbody><tr><td>";
    var inExponent = 0;
    var inSub = 0;
    var inVec = 0;
    var inESV = "*";
    var inBTN = false;
    // Cycle through each character
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        //console.log('STAT: ', inBTN, inESV, '\nTOKEN: ', token);

        // Take care of Escaped Characters
        if (token == "~") {
          finalString += tokens[i+1];
          i++;
        }
        else if (token == "\u0394") {
          finalString += "&Delta;";
          //console.log("GOTCHA");
        }
        // Vector Quantities
        else if (token == "v" && tokens[i+1] == "e" && tokens[i+2] == "c" && tokens[i+3] == "(") {
          finalString += "<span class='vec'>";
          i+=3;
          ///console.log('VEC');
          inESV += 'V';
        }
        // Superscript
        else if (token == "^" && tokens[i+1] == "(") {
          finalString += "<sup>"
          ///console.log('SUP');
          i+=1;
          inESV += 'E';
        }
        // Subscript
        else if (token == "s" && tokens[i+1] == "u" && tokens[i+2] == "b" && tokens[i+3] == "(") {
          finalString += "<sub>";
          ///console.log('SUB');
          i+=3;
          inESV += 'S';
        }
        // Close Super/Subscript
        else if (token == ")") {
          if (inESV.charAt(inESV.length-1) == 'E') {finalString += "</sup>"; if(inBTN) {finalString += "</div>"; inBTN = false;}} else
          if (inESV.charAt(inESV.length-1) == 'S') {finalString += "</sub>"; if(inBTN) {finalString += "</div>"; inBTN = false;}} else
          if (inESV.charAt(inESV.length-1) == 'V') {finalString += "</div></span>";} else 
          {console.log("ERR: ", inESV.charAt(inESV.length-1));}
          inESV = inESV.substring(0,inESV.length-1);
          ///console.log('OUT');
        }
        // Fractions
        else if (token == "[") {
          var off = 0;
          while(tokens[i + off] != "]" && tokens[i + off] != "undefined") {
            off++;
          }
          ///console.log(off, "[SPACES UNTIL FRACTION SPLITS]");
          ///console.log("[RESULTING STRING]: ", equation.substr(i+1, off-1));
          var fetch = generateMathHtml(equation.substr(i+1, off-1), varIndex, genTypeSimple);
          varIndex = fetch[1];
          finalString += "</td><td><div><table><tbody><tr><td>" + fetch[0];
          finalString += "</td></tr><tr><td><div style='border-top: 10px solid #FFFFFF;'></div></td></tr><tr><td>";
          off += 3;
          var offp = off;
          while(tokens[i + offp] != "]" && tokens[i + offp] != "undefined") {
            offp++;
          }
          ///console.log(offp - off, "[SPACES UNTIL FRACTION ENDS]");
          ///console.log("[RESULTING STRING]: ", equation.substr(i + off, offp - off));
          var fetch = generateMathHtml(equation.substr(i + off, offp - off), varIndex, genTypeSimple);
          varIndex = fetch[1];
          finalString += fetch[0] + "</td></tr></tbody></table></div></td><td>";
          i += offp;
        }
        // Delta
        // Nothing Special
        else if(genTypeSimple || "0123456789+-=±√".includes(token)) {
          if(inBTN && inESV.charAt(inESV.length-1) != 'E' && inESV.charAt(inESV.length-1) != 'S') {finalString += "</div>"; inBTN = false;}
          finalString += token;
        }
        // Must be a variable (So long as it isn't in an exponent or subscript)
        else if(inESV.charAt(inESV.length-1) != 'E' && inESV.charAt(inESV.length-1) != 'S') {
            if(inBTN) {finalString += "</div>";}
            var vi = variableSortString.charAt(activeFormula * noOfVars + varIndex);
            finalString += "<div class='varBtn' onclick='selectVariable(" + vi + ")' onmouseover='showDefinition(" + vi + ")' onmouseout='setMessage(``)'>" + token;
            inBTN = true;
            varIndex++;
        }
        // Anything left in subscripts/superscripts
        else {
          finalString += token;
        }
        // Problem?

        
        // Anything else
        /*
        else if (inESV.charAt(inESV.length-1) != 'E' && inESV.charAt(inESV.length-1) != 'S') {
          if(genTypeSimple || "0123456789+-=±√".includes(token)) {
            finalString += token;
          } else if(!inBTN) {
            var vi = variableSortString.charAt(activeFormula * noOfVars + varIndex);
            finalString += "<div class='varBtn' onclick='selectVariable(" + vi + ")' onmouseover='showDefinition(" + vi + ")' onmouseout='setMessage(``)'>" + token;
            inBTN = true;
            varIndex++;
          }
        } 
        // Likely unnessecary:
        else {
          if("=±√-".includes(token)) {
            if(inBTN) {finalString+='</div>' + token; inBTN = false;}
            //finalString += '=';
          }
          else if(token == 'Δ') {finalString+='Δ'+tokens[i+1]}
          else {finalString += token;}
          console.log("[" + token + "]!")
        }*/
    } 

    // Close table
    finalString += "</div></td></tr></tbody></table>";
    return [finalString, varIndex];
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
    <meta name="viewport" content="width=device-width, initial-scale=.8">
    <table style="font-size: 20px; margin: 10px; width: calc(100% - 20px);">
      <td style="width: 100%;"><a href="index.html">chsphysicstoolbox</a></td>
      <td>
        <img style="width: 25px; height: 25px; cursor: pointer;" src="menu-icon.svg" onclick="toggleMenu();"> 
      </td>
    </table>
    <menu id="menu">
      <div class="messageContainer">
        <p class="msgcontainer" >This website is in HEAVY development! Please be patient and note that some functions may be broken or simply not work at all.</p>
        <h2>Menu</h2>
        <p>Formula Lists
        <ul>
          <li><a onclick="window.location.href = 'equations-and-formula-sheets.html#10'; location.reload();">&emsp;Physics 10</a></li>
          <li><a onclick="window.location.href = 'equations-and-formula-sheets.html#20'; location.reload();">&emsp;Physics 20</a><br></li>
          <li><a onclick="window.location.href = 'equations-and-formula-sheets.html#30'; location.reload();">&emsp;Physics 30</a><br></li>
        </ul></p>
        <p>Other stuff
        &emsp;Yeah
        </p>
      </div>
    </menu>
  `;

  footer = `
  <div>
    <p>
        Copyright 2023 Glitch
    </p>
    <p id="FooterMessage">
      If you see this message, then something is very wrong! Try connecting to a network or reloading the page.
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
