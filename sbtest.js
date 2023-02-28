
var sP = document.getElementById('sidePanel');
var startX;
var startY;
var dist = 0;
var inEditView = true;
var p3saveReminder;

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

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

function fullScreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}

function exitfullScreen() {
    document.exitFullscreen();
}

function showPanel(i) {
    _hidePanels();
    if(i == 1) {
        if(get('p1teamList1').value != get('p1teamList1').children[0].innerHTML) {
            p1LoadStyles(0, get('p1teamList1').value);
        }
        if(get('p1teamList2').value != get('p1teamList2').children[0].innerHTML) {
            p1LoadStyles(1, get('p1teamList2').value);
        }
        get("panel1").style.display = "";
    } else if(i == 2) {
        if(get('p2SelectList').value == get('p2SelectList').children[0].innerHTML) {
            get('p2SelectList').value = get('p2SelectList').children[1].innerHTML;
        }
        p2LoadTeam(get('p2SelectList').value);
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
    showWarning("Loading...");
    //toggleEditView();
    //toggleEditView();
    showPanel(1);

    let onchangeElements = get('p2_settingsList').getElementsByTagName('input');
    for(let x = 0; x < onchangeElements.length; x++) {
        onchangeElements[x].setAttribute('onchange', 'p2UpdateColors();');
    }
});

function p1LoadTeam(i, team) {
    var teamData = userData.Basketball.Teams[team];
    p1AddPlayers(i);
    if(i == 1) {
        get('Main-team1Header').value = teamData.DName;
    } else {
        get('Main-team2Header').value = teamData.DName;
    }
    
    p1LoadStyles(i-1, team);
}

function style(i) {
    x = i.split('}');
    for(y=0; y<x.length - 1; y++) {
        document.styleSheets[1].insertRule(x[y], document.styleSheets[1].cssRules.length);
    }
}

function p1LoadStyles(i, team) {
    var sheet;
    if(i == 1) {sheet = 'dp1'} else {sheet = 'dp2';}
    var colorData = userData.Basketball.Teams[team].Settings;

    newStyles = `
    .${sheet} {
        background-color: ${colorData.BColor};
        background-image: url(${colorData.BImg});
        background-size: ${colorData.BSize}%;
        color: ${colorData.THColor};
        font-size: ${colorData.THSize}px;
    }

    .${sheet} input {
        background-color: ${colorData.IColor}${parseInt(colorData.ITransparency).toString(16)};
        font-size: ${colorData.TSSize}px;
        box-shadow: inset 0 0 10px ${colorData.IShadowColor}${colorData.IShadow ? parseInt(colorData.ITransparency).toString(16) : '00'};
        color: ${colorData.TSColor};
        margin: 2px;
    }
    
    .${sheet} > div.displayPanelContent {
        backdrop-filter: blur(${colorData.BBlur}px);
    }
    
    .${sheet} > div.overlay {
        /*backdrop-filter: brightness(1.2) contrast(2);*/
    }
    
    .${sheet} input.Main-titles {
        color: ${colorData.TTColor};
        font-size: ${colorData.TTSize}px;
    }
    `

    style(newStyles);
}

var p2ActiveTeam = '';
function p2LoadTeam(i) {
    var plist = userData.Basketball.Teams[i].Players;
    get('p2TeamHeader').value = userData.Basketball.Teams[i].DName;
    get('p2Team-List').innerHTML = `<p class="h-pl">Player</p><p class="h-po">Points</p><p class="h-fo">Fouls</p>`;
    for(let x in plist) {
        console.log(x);
        get('p2Team-List').innerHTML += `<input class="c-pnu" value='${plist[x].pnumb}'><input class="c-pna" value='${plist[x].pname}'><input class="c-ppo" type='number' value='0'><input class="c-pfo" type='number' value='0'>`
    }
    var teamSettings = userData.Basketball.Teams[i].Settings;
    if(!!teamSettings) {
        get('p2BColor').value = teamSettings.BColor;
        get('p2BImg').value = teamSettings.BImg;
        get('p2BSize').value = teamSettings.BSize;
        get('p2BBlur').value = teamSettings.BBlur;
        get('p2IShadow').checked = teamSettings.IShadow;
        get('p2IShadowColor').value = teamSettings.IShadowColor;
        get('p2IColor').value = teamSettings.IColor;
        get('p2ITransparency').value = teamSettings.ITransparency;
        get('p2TTColor').value = teamSettings.TTColor;
        get('p2THColor').value = teamSettings.THColor;
        get('p2TSColor').value = teamSettings.TSColor;
        get('p2TWColor').value = teamSettings.TWColor;
        get('p2TTSize').value = teamSettings.TTSize;
        get('p2THSize').value = teamSettings.THSize;
        get('p2TSSize').value = teamSettings.TSSize;
    } else {
        userData.Basketball.Teams[i].Settings = {};
        teamSettings = userData.Basketball.Teams[i].Settings;

        teamSettings.BColor = '#000000';
        teamSettings.BImg = '';
        teamSettings.BSize = '90';
        teamSettings.BBlur = '0';
        teamSettings.IShadow = 'true';
        teamSettings.IShadowColor = '#FFFFFF'
        teamSettings.IColor = '#555555';
        teamSettings.ITransparency = '128';
        teamSettings.TTColor = '#FFFFFF';
        teamSettings.THColor = '#FFFFFF';
        teamSettings.TSColor = '#FFFFFF';
        teamSettings.TWColor = '#FF88aa';
        teamSettings.TTSize = '40';
        teamSettings.THSize = '25';
        teamSettings.TSSize = '35';

        p2LoadTeam(get('p2SelectList').value);
    }
    p2UpdateColors();
}

function p2UpdateColors() {
    const team = get('p2SelectList').value;

    userData.Basketball.Teams[team].Settings.BColor = get('p2BColor').value;
    userData.Basketball.Teams[team].Settings.BImg = get('p2BImg').value;
    userData.Basketball.Teams[team].Settings.BSize = get('p2BSize').value;
    userData.Basketball.Teams[team].Settings.BBlur = get('p2BBlur').value;
    userData.Basketball.Teams[team].Settings.IShadow = get('p2IShadow').checked;
    userData.Basketball.Teams[team].Settings.IShadowColor = get('p2IShadowColor').value
    userData.Basketball.Teams[team].Settings.IColor = get('p2IColor').value;
    userData.Basketball.Teams[team].Settings.ITransparency = get('p2ITransparency').value;
    userData.Basketball.Teams[team].Settings.TTColor = get('p2TTColor').value;
    userData.Basketball.Teams[team].Settings.THColor = get('p2THColor').value;
    userData.Basketball.Teams[team].Settings.TSColor = get('p2TSColor').value;
    userData.Basketball.Teams[team].Settings.TWColor = get('p2TWColor').value;
    userData.Basketball.Teams[team].Settings.TTSize = get('p2TTSize').value;
    userData.Basketball.Teams[team].Settings.THSize = get('p2THSize').value;
    userData.Basketball.Teams[team].Settings.TSSize = get('p2TSSize').value;

    sheet = 'dp2'
    var colorData = userData.Basketball.Teams[team].Settings;

    newStyles = `
    .${sheet} {
        background-color: ${colorData.BColor};
        background-image: url(${colorData.BImg});
        background-size: ${colorData.BSize}%;
        color: ${colorData.THColor};
        font-size: ${colorData.THSize}px;
    }

    .${sheet} input {
        background-color: ${colorData.IColor}${parseInt(colorData.ITransparency).toString(16)};
        font-size: ${colorData.TSSize}px;
        box-shadow: inset 0 0 10px ${colorData.IShadowColor}${colorData.IShadow ? parseInt(colorData.ITransparency).toString(16) : '00'};
        color: ${colorData.TSColor};
        margin: 2px;
    }
    
    .${sheet} > div.displayPanelContent {
        backdrop-filter: blur(${colorData.BBlur}px);
    }
    
    .${sheet} > div.overlay {
        /*backdrop-filter: brightness(1.2) contrast(2);*/
    }
    
    .${sheet} input.Main-titles {
        color: ${colorData.TTColor};
        font-size: ${colorData.TTSize}px;
    }
    `
    ////
    console.log(newStyles);
    style(newStyles);
    ////

}

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

function p1AddPlayers(i) {
    if(i == 1) {
        var plist = userData.Basketball.Teams[get('p1teamList1').value].Players;
        get('Main-List1').innerHTML = `<p class="h-pl">Player</p><p class="h-po">Points</p><p class="h-fo">Fouls</p>`;
        for(let x in plist) {
            console.log(x);
            get('Main-List1').innerHTML += `<input class="c-pnu" readonly value='${plist[x].pnumb}'><input readonly class="c-pna" value='${plist[x].pname}'><input class="c-ppo" type='number' value='0'><input class="c-pfo" type='number' value='0'>`
        }
    } else {
        var plist = userData.Basketball.Teams[get('p1teamList2').value].Players;
        get('Main-List2').innerHTML = `<p class="h-pl">Player</p><p class="h-po">Points</p><p class="h-fo">Fouls</p>`;
        for(let x in plist) {
            get('Main-List2').innerHTML += `<input class="c-pnu" readonly value='${plist[x].pnumb}'><input readonly class="c-pna" value='${plist[x].pname}'><input class="c-ppo" type='number' value='0'><input class="c-pfo" type='number' value='0'>`
        }
    }
}

function toggleEditView() {
    showPanel(1);
    inEditView = !inEditView;
    inEditView ? exitfullScreen() : fullScreen();
    inEditView ? get('expandIcon').style.backgroundImage = 'url(expand-icon.png)' : get('expandIcon').style.backgroundImage = 'url(ex.png)';
    
    get("displayPanelContent").classList.toggle('dispView');
    get("mainPanel").classList.toggle('dispView');
    toggleShowSidePanel(inEditView);

    //get("Main-team1Header").readOnly = !inEditView;
    //get("Main-team2Header").readOnly = !inEditView;
    inEditView ? get("clearScores1").style.display = "" : get("clearScores1").style.display = "none";
    inEditView ? get("clearScores2").style.display = "" : get("clearScores2").style.display = "none";

    updateAttributes(get("Main-List1"));
    updateAttributes(get("Main-List2"));
    //get("body").overflow = "hidden";
}

function updateAttributes(teamList, iev) {
    for (let i = 0; i < ((teamList.childElementCount - 3) / 4); i++) {
        let p = i * 4 + 3;
        //teamList.children[p + 0].readOnly = !inEditView;
        //teamList.children[p + 1].readOnly = !inEditView;
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
    textColor = userData.Basketball.Teams[get('p1teamList' + i).value].Settings.TSColor;
    i == 1 ? teamList = get("Main-List1") : teamList = get("Main-List2");
    for (let i = 0; i < ((teamList.childElementCount - 3) / 4); i++) {
        let p = i * 4 + 3;
        teamList.children[p + 2].value = '0';
        teamList.children[p + 3].value = '0';
        teamList.children[p + 2].style.color = textColor;
        teamList.children[p + 3].style.color = textColor;
    }
}

function incVal(i, j) {
    // this i = input
    // bool j = warning styles
    if(i.parentElement.id == "Main-List1") {x = 1;}
    if(i.parentElement.id == "Main-List2") {x = 2;}
    warningColor = userData.Basketball.Teams[get('p1teamList' + x).value].Settings.TWColor;
    textColor = userData.Basketball.Teams[get('p1teamList' + x).value].Settings.TSColor;
    i.value = parseInt(i.value) + pointerAdd;
    if(j) {
        if(i.value >= 4) {i.style.color = warningColor;}
        if(i.value < 4) {i.style.color = textColor}        
    }
}

function decVal(i, j) {
    if(i.parentElement.id == "Main-List1") {x = 1;}
    if(i.parentElement.id == "Main-List2") {x = 2;}
    warningColor = userData.Basketball.Teams[get('p1teamList' + x).value].Settings.TWColor;
    textColor = userData.Basketball.Teams[get('p1teamList' + x).value].Settings.TSColor;
    // this i = input
    // bool j = warning styles
    i.value = parseInt(i.value) - pointerAdd;
    if(j) {
        if(i.value >= 4) {i.style.color = warningColor;}
        if(i.value < 4) {i.style.color = textColor;}        
    }
    return false;
}

var p3ActiveTeam = '';
function AddTeam(teamName, loadOnly) {
    let x = 1;
    if(!loadOnly) {
        if(!!userData.Basketball.Teams[teamName]) {
            while(!!userData.Basketball.Teams[teamName + x]) {
                x++;
            }
        } else {
            x = '';
        }
        userData.Basketball.Teams[teamName + x] = {
            DName: teamName,
            Players: {
    
            },
            Settings: {
    
            }
        }
    } else {x = ''}
    p3ActiveTeam = teamName + x;
    
    if(!teamName){teamName = 'New Team';}
    var newTeam = document.createElement('li');
    // p3LoadTeam(this.dataset.value);
    newTeam.innerHTML = `<input value="${teamName + x}" onchange="teamNameChanged(this);"><div class="trashIcon" onclick="RemoveTeam(this);"></div><div class="p3overlay" data-value="${teamName + x}" onclick="p3LoadTeam(this.dataset.value);"></div>`;
    get("p3_settingsList").append(newTeam);
}
function teamNameChanged(i) {
    userData.Basketball.Teams[i.value] = userData.Basketball.Teams[i.parentElement.children[1].dataset.value];
    delete userData.Basketball.Teams[i.parentElement.children[1].dataset.value];
    i.parentElement.children[1].dataset.value = i.value;
}
function teamTitleChanged() {
    console.log(get('p3TeamHeader').value);
    userData.Basketball.Teams[p3ActiveTeam].DName = get('p3TeamHeader').value;
}

var thisRef;
function RemoveTeam(i, force) {
    // Remove from database ...
    // ...
    if(force) {
        //get('p3message').innerHTML = "Removing " + i.parentElement.children[1].dataset.value + "...";
        delete userData.Basketball.Teams[i.parentElement.children[1].dataset.value];
        i.parentElement.remove();
    } else {
        thisRef = i;
        showWarning('Are you sure you want to remove the team "' + i.parentElement.children[0].value + '"?', 'Yes, delete', 'No, cancel', 'RemoveTeam(thisRef, true);', 'null');
    }

}


function showWarning(msg, confMsg, cancMsg, confCommand, cancCommand) {
    if(!confMsg) {get('globConfirm').style.display = 'none';} else {get('globConfirm').style.display = '';}
    if(!cancMsg) {get('globCancel').style.display = 'none';} else {get('globCancel').style.display = '';}
    get('globWarningMessage').style.display = 'flex';
    get('globMessage').innerHTML = msg;
    get('globConfirm').innerHTML = confMsg;
    get('globCancel').innerHTML = cancMsg;
    get('globConfirm').setAttribute('onclick', "hideWarning(); " + confCommand);
    get('globCancel').setAttribute('onclick', "hideWarning(); " + cancCommand);
}
function hideWarning() {
    get('globWarningMessage').style.display = 'none';
}

function p3LoadTeam(i) {
    p3ActiveTeam = i;
    console.log(userData.Basketball.Teams);
    get('p3TeamHeader').value = userData.Basketball.Teams[i].DName;
    get("p3TeamList").innerHTML = '';
    if(!userData.Basketball.Teams[i].Players) {userData.Basketball.Teams[i].Players = {};}
    k = Object.keys(userData.Basketball.Teams[i].Players);
    for(let x = 0; x < k.length; x++) {
        console.log(userData.Basketball.Teams[i].Players[pad(x)].pname);
        AddPlayer(userData.Basketball.Teams[i].Players[pad(x)].pnumb, userData.Basketball.Teams[i].Players[k[x]].pname, true);
    }
}

function AddPlayer(i, j, loadOnly) {
    if(!i) {i = '';}
    if(!j) {j = 'New Player'; p3saveReminder = true;}
    var newPlayer = document.createElement('li');
    newPlayer.innerHTML = `<input class="c-pnu" value="${i}" onchange="playerNumberChanged(this);"><input class="c-pna" value="${j}" onchange="playerNameChanged(this);"><div onclick="RemovePlayer(this);" class="trashIcon"></div>`;
    get("p3TeamList").append(newPlayer);
    pnumb = i;
    pname = j;
    if(!loadOnly) {
        userData.Basketball.Teams[p3ActiveTeam].Players[pad(get('p3TeamList').children.length - 1)] = {pnumb, pname};
    }
}

function playerNameChanged(i) {
    pnumb = i.parentElement.children[0].value;
    pname = i.value;
    userData.Basketball.Teams[p3ActiveTeam].Players[pad(Array.prototype.indexOf.call(get('p3TeamList').children, i.parentElement))] = {pnumb, pname};
}
function playerNumberChanged(i) {
    pnumb = i.value;
    pname = i.parentElement.children[1].value;
    userData.Basketball.Teams[p3ActiveTeam].Players[pad(Array.prototype.indexOf.call(get('p3TeamList').children, i.parentElement))] = {pnumb, pname};
}


function RemovePlayer(i) {
    userData.Basketball.Teams[p3ActiveTeam].Players = {};
    //delete userData.Basketball.Teams[p3ActiveTeam].Players[pad(Array.prototype.indexOf.call(get('p3TeamList').children, i.parentElement))];
    i.parentElement.remove();

    // Shift all player indexes
    let y = 0;
    for(x = 0; x < get('p3TeamList').children.length; x++) {
        userData.Basketball.Teams[p3ActiveTeam].Players[pad(y)] = {
            pname: get('p3TeamList').children[x].children[1].value,
            pnumb: get('p3TeamList').children[x].children[0].value
        }
        y++
    }
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

function loadDataFromCloud() {
    firebase.database().ref('accounts/' + userUID).once('value', (snapshot) => {
        userData = snapshot.val();
        // Do something with the user's data
        console.log(userData);
        get('username').innerHTML = userData.email;
        try {
          var teams = userData.Basketball.Teams;
          var htmlData = '<option disabled selected>Choose a team...</option>';
          for(let i in teams) {
              htmlData += "<option>" + i + "</option>"
              AddTeam(i, true);
              console.log(i);
          }
          get('p1teamList1').innerHTML = htmlData;
          get('p1teamList2').innerHTML = htmlData;
          get('p2SelectList').innerHTML = htmlData;

          hideWarning();
        } catch {
          console.log('Teams Path not Found');
          showPanel(3);
          showWarning("No teams found, start by creating some", "Okay")
        }
    });
}

function saveDataToCloud() {
    firebase.database().ref('accounts/' + userUID).set(userData).then(() => {
        showWarning("Data saved successfully!", 'Okay');
    });
}

const persist = firebase.auth.Auth.Persistence.LOCAL;

var userData;
var userUID;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      // Get the user's authentication token and use it to authenticate Firebase requests
      user.getIdToken().then((idToken) => {
        userUID = user.uid;
        loadDataFromCloud();
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