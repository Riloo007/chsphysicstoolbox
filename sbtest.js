
var sP = document.getElementById('sidePanel');
var startX;
var startY;
var dist = 0;
var inEditView = true;

function dropdown(i) {
    i.style.position = "fixed";
    i.style.overflow = "";
}
function dropup(i) {
    i.style.position = "";
    i.style.overflow = "hidden";
}

function showUserProfile() {
    if(!inEditView) {toggleEditView();}
    get('sidePanel').children[0].classList.remove('pf-Shown');
    get('sidePanel').children[0].classList.add('pf-Hidden');
    get('sidePanel').children[1].classList.remove('pf-Hidden');
    get('sidePanel').children[1].classList.add('pf-Shown');
    get('sidePanel').classList.add('Expanded');
    get('body').style.overflow = "hidden";
}
function hideUserProfile() {
    if(!inEditView) {toggleEditView();}
    get('sidePanel').children[0].classList.add('pf-Shown');
    get('sidePanel').children[0].classList.remove('pf-Hidden');
    get('sidePanel').children[1].classList.add('pf-Hidden');
    get('sidePanel').children[1].classList.remove('pf-Shown');
    get('sidePanel').classList.remove('Expanded');
    get('body').style.overflow = "";
}

function showPanel(i) {
    _hidePanels();
    if(i == 1) {
        get("panel1").style.display = "";
    } else if(i == 2) {
        get("panel2").style.display = "";
    } else {
        get("panel3").style.display = "";
    }
}
function _hidePanels() {
    get("panel1").style.display = "none";
    get("panel2").style.display = "none";
    get("panel3").style.display = "none";
}

function toggleShowSidePanel(i) {
    if(i == true) {get("sidePanel").classList.remove('shown');}
    if(i == false) {get("sidePanel").classList.add('shown');}
}

function get(i) {
    return document.getElementById(i);
}

document.addEventListener('mousemove', function(event) {
    if(event.clientX <= 50 && !inEditView) {
        toggleShowSidePanel(true);
    } else if (!inEditView) {
        toggleShowSidePanel(false);
    }
});



document.addEventListener("DOMContentLoaded", function() {
    toggleEditView();
});

/*
sP.addEventListener('touchstart', function(e) {
  startX = e.changedTouches[0].pageX;
  startY = e.changedTouches[0].pageY;
});

sP.addEventListener('touchmove', function(e) {
  var x = e.changedTouches[0].pageX;
  var y = e.changedTouches[0].pageY;
  dist = x - startX;

  if (dist < -50) {
    sP.style.left = '-116px';
  } else if (dist > 50) {
    sP.style.left = '0px';
  }
});

sP.addEventListener('touchend', function(e) {
  if (dist < -50) {
    sP.style.left = '-116px';
  } else if (dist > 50) {
    sP.style.left = '0px';
  }
});

document.addEventListener("DOMContentLoaded", function() {
    displayPanelContentTop = get('displayPanelContent').offsetTop + 'px';
    displayPanelContentLeft = get('displayPanelContent').offsetLeft + 'px';
    document.querySelector(':root').style.setProperty('--dispContent-initial-top', displayPanelContentTop);
    document.querySelector(':root').style.setProperty('--dispContent-initial-left', displayPanelContentLeft);
}); */

//_______________________________________________
//
//              Scoreboard Script
//_______________________________________________

let pointerAdd = 1;

function toggleEditView() {
    showPanel(1);
    inEditView = !inEditView;

    get("body").overflow = "hidden";
    get("displayPanelContent").classList.toggle('dispView');
    get("mainPanel").classList.toggle('dispView');
    toggleShowSidePanel(inEditView);

    get("Main-team1Header").readOnly = !inEditView;
    get("Main-team2Header").readOnly = !inEditView;
    inEditView ? get("clearScores1").style.display = "" : get("clearScores1").style.display = "none";
    inEditView ? get("clearScores2").style.display = "" : get("clearScores2").style.display = "none";

    updateAttributes(get("Main-List1"));
    updateAttributes(get("Main-List2"));
}

function updateAttributes(teamList, iev) {
    for (let i = 0; i < ((teamList.childElementCount - 3) / 4); i++) {
        let p = i * 4 + 3;
        teamList.children[p + 0].readOnly = !inEditView;
        teamList.children[p + 1].readOnly = !inEditView;
        teamList.children[p + 2].readOnly = !inEditView;
        teamList.children[p + 3].readOnly = !inEditView;
    
        if(inEditView) {
            teamList.children[p + 2].setAttribute('onclick','');
            teamList.children[p + 3].setAttribute('onclick','');
            teamList.children[p + 2].setAttribute('oncontextmenu','');
            teamList.children[p + 3].setAttribute('oncontextmenu','');
        } else {
            teamList.children[p + 2].setAttribute('onclick','incVal(this, false)');
            teamList.children[p + 3].setAttribute('onclick','incVal(this, true)');
            teamList.children[p + 2].setAttribute('oncontextmenu','decVal(this, false); return false;');
            teamList.children[p + 3].setAttribute('oncontextmenu','decVal(this, true); return false;');
        }
    }
}

function resetScores(i) {
    i == 1 ? teamList = get("Main-List1") : teamList = get("Main-List2");
    for (let i = 0; i < ((teamList.childElementCount - 3) / 4); i++) {
        let p = i * 4 + 3;
        teamList.children[p + 2].value = '0';
        teamList.children[p + 3].value = '0';
        teamList.children[p + 2].style.color = getVars(1).textColor;
        teamList.children[p + 3].style.color = getVars(1).textColor;
    }
}

function incVal(i, j) {
    // this i = input
    // bool j = warning styles
    i.value = parseInt(i.value) + pointerAdd;
    if(j) {
        if(i.value >= 4) {i.style.color = getVars(1).warningcolor;}
        if(i.value < 4) {i.style.color = getVars(1).textColor;}        
    }
}

function decVal(i, j) {
    // this i = input
    // bool j = warning styles
    i.value = parseInt(i.value) - pointerAdd;
    if(j) {
        if(i.value >= 4) {i.style.color = getVars(1).warningcolor;}
        if(i.value < 4) {i.style.color = getVars(1).textColor;}        
    }
    return false;
}

function getVars(i) {
    if(i == 1) {
        // ...
    } else {

    }
    return {
        warningcolor: '#ff00bb',
        textColor: '#000000'
    }
}

function AddTeam(teamName) {
    if(!teamName){teamName = 'New Team';}
    var newTeam = document.createElement('li');
    newTeam.innerHTML = `<input value="${teamName}"><div data-value="${teamName}" onclick="p3LoadTeam(this.dataset.value);" class="loadIcon"></div><div class="trashIcon" onclick="RemoveTeam(this);"></div>`;
    get("p3_settingsList").append(newTeam);
}

function RemoveTeam(i) {
    // Remove from database ...
    // ...

    i.parentElement.remove();
}

function p3LoadTeam(i) {
    console.log(userData.Basketball.Teams);
    get('p3TeamHeader').value = userData.Basketball.Teams[i].DName;
    get("p3TeamList").innerHTML = '';
    k = Object.keys(userData.Basketball.Teams[i].Players);
    for(let x = 0; x < k.length; x++) {
        AddPlayer(k[x], userData.Basketball.Teams[i].Players[k[x]]);
    }
}

function AddPlayer(i, j) {
    if(!i) {i = '';}
    if(!j) {j = 'New Player';}
    var newPlayer = document.createElement('li');
    newPlayer.innerHTML = `<input class="c-pnu" value="${i}"><input class="c-pna" value="${j}"><div onclick="RemovePlayer(this);" class="trashIcon"></div>`;
    get("p3TeamList").append(newPlayer);
}

function RemovePlayer(i) {
    // Remove from Database ....
    // ...

    i.parentElement.remove();
}

//_________________________________________
//
//        Firebase setup and Login
//_________________________________________

var database;
function setupFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyB54arIWiHODagJUmcMVa4olpSMGNUIxII",
    authDomain: "scorekeeping-c6efa.firebaseapp.com",
    databaseURL: "https://scorekeeping-c6efa-default-rtdb.firebaseio.com",
    projectId: "scorekeeping-c6efa",
    storageBucket: "scorekeeping-c6efa.appspot.com",
    messagingSenderId: "653633600985",
    appId: "1:653633600985:web:61ae0782bca7b101a16dc8"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
}
setupFirebase();

const persist = firebase.auth.Auth.Persistence.LOCAL;

var userData
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      // Get the user's authentication token and use it to authenticate Firebase requests
      user.getIdToken().then((idToken) => {
        // Use the authentication token to authenticate Firebase requests
        // For example, to read from the Realtime Database:
        firebase.database().ref('accounts/' + user.uid).once('value', (snapshot) => {
          userData = snapshot.val();
          // Do something with the user's data
          console.log(userData);
          get('username').innerHTML = user.email;
          var teams = userData.Basketball.Teams;
          var htmlData = '';
          for(let i in teams) {
            htmlData += "<option>" + i + "</option>"
            AddTeam(i);
            console.log(i);
          }
          get('p1teamList1').innerHTML = htmlData;
          get('p1teamList2').innerHTML = htmlData;
        });
      });
    } else {
      // User is not signed in
      // Redirect to the sign-in page or show a sign-in form
      console.log("NOT LOGGED IN");
      a = document.createElement('a'); a.href = 'sbsignup.html'; a.click();
    }
  });

  function logoutuser() {
    firebase.auth().signOut().then(() => {
        a = document.createElement('a'); a.href = 'sbsignup.html'; a.click();
    }).catch((error) => {
        console.log("Could not sign out: ", error);
    })
  }