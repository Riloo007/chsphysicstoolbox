
var sP = document.getElementById('sidePanel');
var startX;
var startY;
var dist = 0;
var inEditView = true;

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}
function clipHEX(num) {
    if(num.length > 2) {num = num.substr(0, 3);}
    if(num.length < 2) {num = '0' + num;}
    return num;
}
function toColorHEXBrightness(number) {
    return '#' + clipHEX(parseInt(number).toString(16)) + clipHEX(parseInt(number).toString(16)) + clipHEX(parseInt(number).toString(16));
}
function toColorHEXHue(number) {

    return '#' + clipHEX(parseInt(number).toString(16)) + clipHEX(parseInt(number).toString(16)) + clipHEX(parseInt(number).toString(16));
}
function toColorHEXSaturation(number) {


    return hsl()
    return '#' + clipHEX(parseInt(number).toString(16)) + clipHEX(parseInt(number).toString(16)) + clipHEX(parseInt(number).toString(16));
}

function dropdown(i) {
    i.style.position = "fixed";
    i.style.overflow = "";
}
function dropup(i) {
    i.style.position = "";
    i.style.overflow = "hidden";
}

function saveReminder(i) {
    if(i) {
        get('globSBtn').style.display = 'inline-flex';
        globDataSaved = false;
    } else {
        get('globSBtn').style.display = 'none';
    }
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
    saveReminder(false);
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    document.querySelector('.sp-fs').children[1].innerHTML = 'Exit Fullscreen';
}

function exitfullScreen() {
    if(!globDataSaved) {saveReminder(true);}
    if(document.fullscreenElement) {
        document.exitFullscreen();
    }
    document.querySelector('.sp-fs').children[1].innerHTML = 'Enter Fullscreen';
}

/*   ----------------------------------------------------------------------------------------------------------------------   */
/*   Taken from https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically   */
function MergeRecursive(obj1, obj2) {

    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor==Object ) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
  
        } else {
          obj1[p] = obj2[p];
  
        }
  
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
  
      }
    }
  
    return obj1;
}
/*   ----------------------------------------------------------------------------------------------------------------------   */

function p3ShowNoTeam() {
    get('p3NoTeam').style.display = 'block';
}
function p3HideNoTeam() {
    get('p3NoTeam').style.display = 'none';
}
function showPanel(i) {
    _hidePanels();
    if(i == 1) {
        document.querySelector('.sp-vs').classList.add('selected');
        // If a team is actually selected
        if(get('p1teamList1').value != get('p1teamList1').children[0].innerHTML) {
            p1LoadStyles(0, get('p1teamList1').value);
            get('p1aNoTeam').style.display = 'none';
        } else {
            get('p1aNoTeam').style.display = 'block';
        }
        if(get('p1teamList2').value != get('p1teamList2').children[0].innerHTML) {
            p1LoadStyles(1, get('p1teamList2').value);
            get('p1aNoTeam').style.display = 'none';
        } else {
            get('p1bNoTeam').style.display = 'block';
        }
        get('Main-List2').querySelectorAll('.c-pfo').forEach(foul => {foul.onchange();});
        get('Main-List1').querySelectorAll('.c-pfo').forEach(foul => {foul.onchange();});
        get("panel1").style.display = "";
        recalculateHeights()
    } else if(i == 2) {
        document.querySelector('.sp-cb').classList.add('selected');
        if(ActiveTeam == "" && get('p1teamList1').value != get('p1teamList1').children[0].innerHTML) {
            ActiveTeam = get('p1teamList1').value;
            get('p2SelectList').value = ActiveTeam;
        }
        get("panel2").style.display = "";
        p2LoadTeam(ActiveTeam);
    } else if(i == 3) {
        document.querySelector('.sp-tm').classList.add('selected');
        ActiveTeam != '' ? p2UpdateColors(ActiveTeam, false) : p3ShowNoTeam();
        get("panel3").style.display = "";
    } else if(i == 4) {
        document.querySelector('.sp-vsSettings').classList.add('selected');
        get("panel4").style.display = "";
    } else {
        document.querySelector('.sp-anim').classList.add('selected');
        get("panel5").style.display = "";
    }
}
function _hidePanels() {
    get("panel1").style.display = "none";
    get("panel2").style.display = "none";
    get("panel3").style.display = "none";
    get("panel4").style.display = "none";
    get("panel5").style.display = "none";
    document.querySelector('.sp-vs').classList.remove('selected');
    document.querySelector('.sp-cb').classList.remove('selected');
    document.querySelector('.sp-fs').classList.remove('selected');
    document.querySelector('.sp-tm').classList.remove('selected');
    document.querySelector('.sp-vsSettings').classList.remove('selected');
    document.querySelector('.sp-anim').classList.remove('selected');
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
    } else if (event.clientX >= 160 && !inEditView) {
        toggleShowSidePanel(false);
    }

    if(event.clientY >= (window.innerHeight - 50) && !inEditView) {
        get('quickMenu').classList.add('shown');
    } else if (!inEditView) {
        get('quickMenu').classList.remove('shown');
    }
});

window.addEventListener("resize", (event) => {
    recalculatep1Scale();
});

function getScoresData(team) {
    var loc; // Which List to read
    var ptsList = {};
    var flsList = {};
    if(get('p1teamList1').value == team) {loc = 'Main-List1';}
    if(get('p1teamList2').value == team) {loc = 'Main-List2';}
    if(loc == undefined) {return 'Not a valid team';}

    const numbersList = get(loc).querySelectorAll('.c-pnu');
    const pointsList = get(loc).querySelectorAll('.c-ppo');
    const foulsList = get(loc).querySelectorAll('.c-pfo');
    for(x = 0; x < pointsList.length; x++) {
        ptsList[numbersList[x].value] = pointsList[x].value;
        flsList[numbersList[x].value] = foulsList[x].value;
    }

    return {
        pts: ptsList,
        fls: flsList
    }
}

function loadScoresData(team, data) {
    var loc; // Which List to read
    if(get('p1teamList1').value == team) {loc = 'Main-List1';}
    if(get('p1teamList2').value == team) {loc = 'Main-List2';}
    if(loc == undefined) {return 'Not a valid team';}
    if(data == undefined) {return 'Invalid Data';}

    const numbersList = get(loc).querySelectorAll('.c-pnu');
    const pointsList = get(loc).querySelectorAll('.c-ppo');
    const foulsList = get(loc).querySelectorAll('.c-pfo');
    for(x = 0; x < pointsList.length; x++) {
        // Numbers list, pts list and fouls list are all gonna be in the same order
        // So, NumbersList[x] is the same player as pointsList[x].
        foulsList[x].value = data.fls[numbersList[x].value];
        pointsList[x].value = data.pts[numbersList[x].value];
    }

    return 'Loaded data to onscreen team "' + team + '"';
}

window.addEventListener('beforeunload', function (e) {
    // Prevent Accidental Reload
    if(!globDataSaved) {
        e.preventDefault();
        e.returnValue = '';
    }

    this.sessionStorage.scoresData = getScoresData();

    sessionStorage.cachedGamep1a = get('p1teamList1').value;
    sessionStorage.cachedGamep1b = get('p1teamList2').value;
    localStorage.cachedGamep1a = get('p1teamList1').value;
    localStorage.cachedGamep1b = get('p1teamList2').value;

    let pointsList = get('Main-List1').querySelectorAll('.c-ppo');
    let foulsList = get('Main-List1').querySelectorAll('.c-pfo');
    let x = 0;
    let ptsList = {};
    pointsList.forEach(point => {
        ptsList[x] = point.value;
        x++
    });
    x = 0;
    let flsList = {};
    foulsList.forEach(foul => {
        flsList[x] = foul.value;
        x++
    });

    if(Object.keys(ptsList).length > 0) {
        sessionStorage.cachedGamepoints = JSON.stringify(ptsList);
        sessionStorage.cachedGamefouls = JSON.stringify(flsList);
        localStorage.cachedGamepoints = JSON.stringify(ptsList);
        localStorage.cachedGamefouls = JSON.stringify(flsList);
    } else {
        delete this.sessionStorage.cachedGamepoints;
        delete this.sessionStorage.cachedGamefouls;
        delete this.localStorage.cachedGamepoints;
        delete this.localStorage.cachedGamefouls;
    }

    ///

    pointsList = get('Main-List2').querySelectorAll('.c-ppo');
    foulsList = get('Main-List2').querySelectorAll('.c-pfo');
    x = 0;
    ptsList = {};
    pointsList.forEach(point => {
        ptsList[x] = point.value;
        x++
    });
    x = 0;
    flsList = {};
    foulsList.forEach(foul => {
        flsList[x] = foul.value;
        x++
    });

    if(Object.keys(ptsList).length > 0) {
        sessionStorage.cachedGamepoints2 = JSON.stringify(ptsList);
        sessionStorage.cachedGamefouls2 = JSON.stringify(flsList);
        localStorage.cachedGamepoints2 = JSON.stringify(ptsList);
        localStorage.cachedGamefouls2 = JSON.stringify(flsList);
    } else {
        delete this.sessionStorage.cachedGamepoints2;
        delete this.sessionStorage.cachedGamefouls2;
        delete this.localStorage.cachedGamepoints2;
        delete this.localStorage.cachedGamefouls2;
    }

    //localStorage.cachedGamefullHTMLdata = get('Main').innerHTML;
});

function loadCachedData(StorageLocation) {
    get('p1teamList1').value = StorageLocation.cachedGamep1a,
    get('p1teamList2').value = StorageLocation.cachedGamep1b,
    get('p1teamList1').onchange();
    get('p1teamList2').onchange();

    var pts = StorageLocation.getItem('cachedGamepoints');
    var fls = StorageLocation.getItem('cachedGamefouls');

    let pointsList = get('Main-List1').querySelectorAll('.c-ppo');
    let foulsList = get('Main-List1').querySelectorAll('.c-pfo');

    var x = 0;
    pointsList.forEach(point => {
        point.value = JSON.parse(pts)[x];
        x++;
    });
    x = 0;
    foulsList.forEach(foul => {
        foul.value = JSON.parse(fls)[x];
        foul.onchange();
        x++;
    });

    pts = StorageLocation.getItem('cachedGamepoints2');
    fls = StorageLocation.getItem('cachedGamefouls2');
    pointsList = get('Main-List2').querySelectorAll('.c-ppo');
    foulsList = get('Main-List2').querySelectorAll('.c-pfo');
    var x = 0;
    pointsList.forEach(point => {
        point.value = JSON.parse(pts)[x];
        x++;
    });
    x = 0;
    foulsList.forEach(foul => {
        foul.value = JSON.parse(fls)[x];
        foul.onchange();
        x++;
    });



    //get('Main').innerHTML = localStorage.cachedGamefullHTMLdata
}


document.addEventListener("DOMContentLoaded", function() {
    showWarning("Loading...");
    showPanel(1);
    recalculatep1Scale();

    let onchangeElements = get('p2_settingsList').getElementsByTagName('input');
    for(let x = 0; x < onchangeElements.length; x++) {
        onchangeElements[x].setAttribute('onchange', 'p2UpdateColors(); saveReminder(true);');
    }

    document.body.addEventListener("focus", function(event) {
        if (event.target.tagName === "INPUT" && !event.target.readOnly) {
          event.target.select();
          console.log("selected");
        }
      }, true);
});

function p1LoadTeam(i, team) {
    var teamData = userData.Basketball.Teams[team];
    p1AddPlayers(i);
    if(i == 1) {
        get('Main-team1Header').value = teamData.DName;
        get('p1aNoTeam').style.display = 'none';
    } else {
        get('Main-team2Header').value = teamData.DName;
        get('p1bNoTeam').style.display = 'none';
    }
    
    p1LoadStyles(i-1, team);
}

var p1AutoStretch = false;
function recalculateHeights() {
    if(p1AutoStretch) {
        var l1length = get('Main-List1').children.length;
        var l2length = get('Main-List2').children.length;
        var l1height = l1length * (get('Main-List1').children[4].scrollHeight + 2);
        var l2height = l2length * (get('Main-List2').children[4].scrollHeight + 2);
        var newHeight;
        if(l1height > l2height) {
            //newHeight = get('Main-List1').children[4].scrollHeight * l2length / l1length ;
            newHeight = l1height / l2length;
            style(`#Main-List2 .c-pnu, #Main-List2 .c-pna, #Main-List2 .c-ppo, #Main-List2 .c-pfo {height: ${newHeight}px;}`);
        } else {
            //newHeight = get('Main-List2').children[4].scrollHeight * l1length / l2length ;
            newHeight = l2height / l1length;
            style(`#Main-List1 .c-pnu, #Main-List1 .c-pna, #Main-List1 .c-ppo, #Main-List1 .c-pfo {height: ${newHeight}px;}`);
        }        
    }
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
        background-color: ${colorData.IColor}${clipHEX(parseInt(colorData.ITransparency).toString(16))};
        font-size: ${colorData.TSSize}px;
        box-shadow: inset 0 0 10px ${colorData.IShadowColor}${colorData.IShadow ? clipHEX(parseInt(colorData.ITransparency).toString(16)) : '00'};
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

var ActiveTeam = '';
function p2LoadTeam(i, j) {
    if(!j) {j = {value: '',children: {'0': ''}}}
    ActiveTeam = i;
    lst = get('p3_settingsList').getElementsByTagName('li')
    for(s = 0; s < lst.length; s++) {
        if(lst[s].dataset.value == ActiveTeam) {
            p3LoadTeam(lst[s].children[2]);
            break;
        }
    }
    // ??
    if(i == "" || j.value == j.children[0].innerHTML) {
        console.log(j.children[0].innerHTML);
        get('p2NoTeam').style.display = 'block';
        //get('p2Display').style.width = 'calc(100vw - var(--panel-width) - 45px)';

        get('panel2').style.gridTemplateAreas = `
            "back topmenu"
            "dispPanel dispPanel"
            "dispPanel dispPanel"
        `;
        //get('p2SelectList').style.display = 'none';
        return null;
    } else {
        get('p2NoTeam').style.display = 'none';

        get('panel2').style.gridTemplateAreas = `
            "back topmenu"
            "dispPanel menu"
            "dispPanel saveButton"
        `;
        //get('p2Display').style.width = '';
        //get('p2SelectList').style.display = '';
    }
    var plist = userData.Basketball.Teams[i].Players;
    get('p2TeamHeader').value = userData.Basketball.Teams[i].DName;
    get('p2Team-List').innerHTML = `<p class="h-pl">Player</p><p class="h-po">Points</p><p class="h-fo">Fouls</p>`;
    for(x = 0; x < Object.keys(plist).length; x++) {
        console.log(x);
        get('p2Team-List').innerHTML += `<input class="c-pnu" value='${plist[pad(x)].pnumb}'><input class="c-pna" value='${plist[pad(x)].pname}'><input class="c-ppo" type='number' value='0'><input class="c-pfo" type='number' value='0'>`
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

        p2LoadTeam(get('p2SelectList').value, get('p2SelectList'));
    }
    i != "" ? p2UpdateColors(i, true) : null;
    document.getElementById('p2Display').querySelector('.overlay').style.height = 0;
    document.getElementById('p2Display').querySelector('.overlay').style.height = get('p2Display').scrollHeight + 100;
}

function p2UpdateColors(team, sr) {
    //if(sr == true && sr != undefined) {saveReminder(true);}
    if(!team) {
        team = get('p2SelectList').value;
    
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
    }

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
        background-color: ${colorData.IColor}${clipHEX(parseInt(colorData.ITransparency).toString(16))};
        font-size: ${colorData.TSSize}px;
        box-shadow: inset 0 0 10px ${colorData.IShadowColor}${colorData.IShadow ? clipHEX(parseInt(colorData.ITransparency).toString(16)) : '00'};
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
    //console.log(newStyles);
    style(newStyles);
    style(`.p3playerIcons div {height: ${userData.Basketball.Teams[team].Settings.TSSize}px;}`);
    document.getElementById('p3Display').querySelector('.overlay').style.height = get('p3Display').scrollHeight;
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

/// ----- Obtained from https://css-tricks.com/converting-color-spaces-in-javascript/ --------
function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0, 
        b = 0; 
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    console.log(r, g, b)
  
    return "#" + r + g + b;
}
/// -------------------------------------------


function colorPickerSlider(inputSlider) {
    //inputSlider.style.webkitSliderBackgroundColor = '#' + clipHEX(inputSlider.value) + clipHEX(inputSlider.value) + clipHEX(inputSlider.value);

    var hue;
    var saturation;
    var lightness;

    if(inputSlider.parentElement.classList.contains('colorPicker-brightness')) {
        hue = 0; saturation = 0; lightness = inputSlider.value;
    } else if(inputSlider.parentElement.classList.contains('colorPicker-hue')) {
        hue = inputSlider.value; saturation = 100; lightness = 50;
        style(`.colorPicker-saturation {background: linear-gradient(to left, ${HSLToHex(hue, 100, 50)} 0%, gray 100%);}
        input.acp-s::-webkit-slider-thumb {background: ${HSLToHex(hue, inputSlider.parentElement.parentElement.querySelector('.acp-s').value, 50)}}`)
    } else if(inputSlider.parentElement.classList.contains('colorPicker-saturation')) {
        hue = inputSlider.parentElement.parentElement.querySelector('.colorPicker-hue').children[0].value;
        saturation = inputSlider.value; lightness = inputSlider.value;
        lightness = 50;
    }

    //const color = 'hsl(' + hue + ',' + saturation + ',' + lightness + ')'
    const slidercolor = HSLToHex(hue, saturation, lightness);
    const realHue = inputSlider.parentElement.parentElement.querySelector('.colorPicker-hue').children[0].value;
    const realSaturation = inputSlider.parentElement.parentElement.querySelector('.colorPicker-saturation').children[0].value;
    const realBrightness = inputSlider.parentElement.parentElement.querySelector('.colorPicker-brightness').children[0].value;

    var rbrightness = realBrightness - ((realSaturation) / 2)

    const color = HSLToHex(realHue, realSaturation, rbrightness);

    inputSlider.parentElement.parentElement.parentElement.querySelector('.colorPicker-preview').value = color;
    inputSlider.parentElement.parentElement.parentElement.querySelector('.colorPicker-preview').style.background = color;
    
    try {
        style(`
    
        input.${inputSlider.classList[0]}::-webkit-slider-thumb {
            background: ${slidercolor};
        }
        
        
        `)
    } catch {
        style(`
    
        input.${inputSlider.classList[0]}::-moz-range-thumb {
            background: ${slidercolor};
        }
        
        
        `)
    }
}

//_______________________________________________
//
//              Scoreboard Script
//_______________________________________________

var currentQuarter = 'Q1';
var QuartersPointerData = {quarters: {}};

let pointerAdd = 1;
function cpAdd(i, j) {
    get('pointer0').style.boxShadow = 'black 0px 0px 3px';
    get('pointer1').style.boxShadow = 'black 0px 0px 3px';
    get('pointer2').style.boxShadow = 'black 0px 0px 3px';
    get('pointer3').style.boxShadow = 'black 0px 0px 3px';
    i.style.boxShadow = 'inset black 0px 0px 5px';
    pointerAdd = j;
}
function quarter(i, j) {
    for(x = 0; x < 4; x++) {
        get('quarters').children[x].classList.remove('selected');
        get('quartersMenu').children[x].classList.remove('selected');
    }
    /*
    get('quarter1').style.outline = 'none';
    get('quarter1').style.border = 'none';
    get('quarter2').style.outline = 'none';
    get('quarter2').style.border = 'none';
    get('quarter3').style.outline = 'none';
    get('quarter3').style.border = 'none';
    get('quarter4').style.outline = 'none';
    get('quarter4').style.border = 'none';
    i.style.outline = 'solid white 1px';
    i.style.border = 'black solid 1px';*/
    i.classList.add('selected');
    console.log(i.innerHTML);
    
// * Save current quarter * //

    // Original format looks like this: 
    // QuartersPointerData.quarters[get('p1teamList1').value][currentQuarter] = getScoresData(get('p1teamList1').value);
    // QuartersPointerData.quarters[get('p1teamList2').value][currentQuarter] = getScoresData(get('p1teamList2').value);
    // But this doesn't work for undefined indexes, so we have to merge it like below

    var newData = {
        quarters: {
            ...{[get('p1teamList1').value]: {
                ...{[currentQuarter]: getScoresData(get('p1teamList1').value)}
            }},
            ...{[get('p1teamList2').value]: {
                ...{[currentQuarter]: getScoresData(get('p1teamList2').value)}
            }},
        }
    }

    MergeRecursive(QuartersPointerData, newData);

// * Load next quarter * //

    currentQuarter = 'Q' + j; // Q1, Q2, Q3, Q4

    resetScores(1); // Reset scores in case there
    resetScores(2); // is no data to load

    if(!!QuartersPointerData.quarters[get('p1teamList1').value][currentQuarter]) {
        loadScoresData(get('p1teamList1').value, QuartersPointerData.quarters[get('p1teamList1').value][currentQuarter]);
    }
    if(!!QuartersPointerData.quarters[get('p1teamList2').value][currentQuarter]) {
        loadScoresData(get('p1teamList2').value, QuartersPointerData.quarters[get('p1teamList2').value][currentQuarter]);
    }
}




function p1AddPlayers(i) {
    if(i == 1) {
        var plist = userData.Basketball.Teams[get('p1teamList1').value].Players;
        get('Main-List1').innerHTML = `<p class="h-pl">Player</p><p class="h-po">Points</p><p class="h-fo">Fouls</p>`;
        for(x = 0; x < Object.keys(plist).length; x++) {
            get('Main-List1').innerHTML += `<input class="c-pnu" readonly value='${plist[pad(x)].pnumb}'><input readonly class="c-pna" value='${plist[pad(x)].pname}'><input class="c-ppo" type='number' value='0'><input class="c-pfo" onchange="incVal(this, true, 0)" type='number' value='0'>`
        }
    } else {
        var plist = userData.Basketball.Teams[get('p1teamList2').value].Players;
        get('Main-List2').innerHTML = `<p class="h-pl">Player</p><p class="h-po">Points</p><p class="h-fo">Fouls</p>`;
        for(x = 0; x < Object.keys(plist).length; x++) {
            get('Main-List2').innerHTML += `<input class="c-pnu" readonly value='${plist[pad(x)].pnumb}'><input readonly class="c-pna" value='${plist[pad(x)].pname}'><input class="c-ppo" type='number' value='0'><input class="c-pfo" onchange="incVal(this, true, 0)" type='number' value='0'>`
        }
    }
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    console.log(evt.target.readOnly);
    if(evt.target.readOnly != false){
        console.log(evt.key);
        if(evt.key == "-") {get('pointer0').onclick();}
        if(evt.key == "`") {get('pointer0').onclick();}
        if(evt.key == "1") {get('pointer1').onclick();}
        if(evt.key == "2") {get('pointer2').onclick();}
        if(evt.key == "3") {get('pointer3').onclick();}

        if(evt.key == "g") {gif();}
    }
};

function gif() {
    /// https://www.hongkiat.com/blog/on-click-animated-gif/
    /// Hmmmmmmmmmm
    /// Setting the source and changing it or saving it somewhere or something.....
}

addEventListener("fullscreenchange", (event) => {
    if(!document.fullscreenElement && !inEditView) {
        toggleEditView();
    }
});

var sidePanelShrunk = true  ;
function sidePanelToggleES() {
    sidePanelShrunk = !sidePanelShrunk;
    if(sidePanelShrunk) {
        sidePanelExpand();
    } else {
        sidePanelShrink();
    }
}

function sidePanelExpand() {
    style(`
    #sidePanel {width: 160px}
    #panel2 {width: calc(100vw - 170px);}
    .sp-btn p {display: inline;}
    .sBtn {width: calc(100% - 245px); margin-left: 200px;}
    #panel4, #panel5 {width: calc(100vw - 180px);}
    `)
    document.querySelector('.sp-logo').innerHTML = 'Online Scoreboard';
    document.querySelector('.sp-collapse').children[0].style.transform = 'rotate(0deg)';
    recalculatep1Scale()
}
function sidePanelShrink() {
    style(`
    #sidePanel {width: 40px}
    #panel2 {width: calc(100vw - 50px);}
    .sp-btn p {display: none;}
    .sBtn {width: calc(100% - 115px); margin-left: 70px;}
    #panel4, #panel5 {width: calc(100vw - 55px);}
    `)
    document.querySelector('.sp-logo').innerHTML = 'OS';
    document.querySelector('.sp-collapse').children[0].style.transform = 'rotate(180deg)';
    recalculatep1Scale()
}

function recalculatep1Scale() {
    if(inEditView) {
        var calcScale = (window.innerWidth - (sidePanelShrunk ? 160 : 40) - 45) / window.innerWidth;
        get('Main').style.transform = `scale(${calcScale})`;        
    }
}

function toggleEditView() {
    showPanel(1);
    toggleShowSidePanel(!inEditView);
    inEditView = !inEditView;
    if(inEditView) {
        get('expandIcon').style.backgroundImage = 'url(expand-icon.png)';
        get("displayPanelContent").classList.remove('dispView');
        get("mainPanel").classList.remove('dispView');
        exitfullScreen();
        recalculatep1Scale();
    } else {
        get('expandIcon').style.backgroundImage = 'url(ex.png)'
        get("displayPanelContent").classList.add('dispView');
        get("mainPanel").classList.add('dispView');
        fullScreen();
        get('Main').style.transform = `scale(1)`;
    }

    //get("Main-team1Header").readOnly = !inEditView;
    //get("Main-team2Header").readOnly = !inEditView;
    //inEditView ? get("clearScores1").style.display = "" : get("clearScores1").style.display = "none";
    //inEditView ? get("clearScores2").style.display = "" : get("clearScores2").style.display = "none";

    inEditView ? get("topGameSettings").style.display = "" : get("topGameSettings").style.display = "none";

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

function resetScores() {
    ccScoresCountdown = 0;
    get('resetScoresQuickButton').innerHTML = "Clear Scores";
    get('resetScoresQuickButton').setAttribute('onclick', 'confirmClearScores();');

    for(i=1;i<3;i++) {
        i == 1 ? teamList = get("Main-List1") : teamList = get("Main-List2");
        textColor = userData.Basketball.Teams[get('p1teamList' + i).value].Settings.TSColor;
        
        for (let i = 0; i < ((teamList.childElementCount - 3) / 4); i++) {
            let p = i * 4 + 3;
            teamList.children[p + 2].value = '0';
            teamList.children[p + 3].value = '0';
            teamList.children[p + 2].style.color = textColor;
            teamList.children[p + 3].style.color = textColor;
        }
    }

}

var ccScoresInterval;
var ccScoresCountdown;
function confirmClearScores() {
    const btn = get('resetScoresQuickButton');
    btn.innerHTML = "Confirm? 3";
    btn.setAttribute('onclick', 'resetScores();');
    ccScoresCountdown = 3;
    ccScoresInterval = setInterval(function(){
        console.log("Called");
        ccScoresCountdown--;
        if(ccScoresCountdown > 0) {
            btn.innerHTML = "Confirm? " + ccScoresCountdown;
        } else {
            btn.innerHTML = "Clear Scores";
            btn.setAttribute('onclick', 'confirmClearScores();');
            clearInterval(ccScoresInterval);
        }
    }, 1000);
}


function incVal(i, j, k) {
    // this i = input
    // bool j = warning styles
    //  int k = optional Value
    get('body').focus();
    i.setAttribute('value', i.value);
    if(i.parentElement.id == "Main-List1") {x = 1;}
    if(i.parentElement.id == "Main-List2") {x = 2;}
    warningColor = userData.Basketball.Teams[get('p1teamList' + x).value].Settings.TWColor;
    textColor = userData.Basketball.Teams[get('p1teamList' + x).value].Settings.TSColor;
    k != undefined ? i.value = parseInt(i.value) + k : i.value = parseInt(i.value) + pointerAdd;
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

var ActiveTeam = '';
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
            DName: "New Team",
            Players: {},
            Settings: {
                BBlur: "0",
                BColor: "#000000",
                BImg: '',
                IShadow: 'true',
                IShadowColor: '#FFFFFF',
                IColor: '#555555',
                ITransparency: '128',
                TTColor: '#FFFFFF',
                THColor: '#FFFFFF',
                TSColor: '#FFFFFF',
                TWColor: '#FF88aa',
                TTSize: '40',
                THSize: '25',
                TSSize: '35'
            }
        }
        saveReminder(true);
        updateLists();
    } else {
        x = ''
    }
    //ActiveTeam = teamName + x;
    
    if(!teamName){teamName = 'New Team';}
    var newTeam = document.createElement('li');
    console.log('!! [' + teamName + x + ']');
    teamNameCorrected = teamName + x;
    newTeam.dataset.value = teamNameCorrected;
    newTeam.innerHTML = `
        <input value="${teamName + x}" onchange="teamNameChanged(this);">
        <div class="trashIcon" onclick="RemoveTeam(this);"></div>
        <div class="p3overlay" onclick="p3LoadTeam(this);"></div>`;
    get("p3_settingsList").append(newTeam);
}
function teamNameChanged(i) {
    saveReminder(true);
    const oldName = i.parentElement.dataset.value;
    const newName = i.value;
    console.log("CHANGING OLD NAME: [" + oldName + "] TO NEW NAME: [" + newName + "]")
    // Copy data from old place to new place
    userData.Basketball.Teams[newName] = userData.Basketball.Teams[oldName];
    // Remove old place
    delete userData.Basketball.Teams[oldName];
    // Update the old value
    i.parentElement.dataset.value = newName;
    // Change the Active Team
    ActiveTeam = newName;
    updateLists();
    get('p2SelectList').value = newName;
}
function teamTitleChanged() {
    console.log(get('p3TeamHeader').value);
    userData.Basketball.Teams[ActiveTeam].DName = get('p3TeamHeader').value;
}

var thisRef;
function RemoveTeam(i, force) {
    // Remove from database ...
    // ...
    if(force) {
        saveReminder(true);
        //get('p3message').innerHTML = "Removing " + i.parentElement.children[1].dataset.value + "...";
        p3ShowNoTeam();
        tname = i.parentElement.dataset.value;
        if(tname == ActiveTeam) {ActiveTeam = '';}
        console.log(tname);
        delete userData.Basketball.Teams[tname];
        i.parentElement.remove();
        console.log(userData.Basketball.Teams);
        updateLists();
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

function p3LoadTeam(j) {
    p3HideNoTeam();
    i = j.parentElement.dataset.value;
    // Enable clicking on all teams in list
    for(x = 0; x < get('p3_settingsList').children.length; x++) {
        get('p3_settingsList').children[x].querySelector('.p3overlay').style.pointerEvents = 'all';
        get('p3_settingsList').children[x].classList.remove("selected");
    }
    // Remove overlay on selected team
    // (This will allow the team to be renamed)
    j.style.pointerEvents = 'none';
    // Color the active element
    j.parentElement.classList.add("selected");

    // Update the styles
    p2UpdateColors(i, true);

    ActiveTeam = i;
    get('p2SelectList').value = i;
    console.log(userData.Basketball.Teams);
    get('p3TeamHeader').value = userData.Basketball.Teams[i].DName;
    get("p3TeamList").innerHTML = '';
    if(!userData.Basketball.Teams[i].Players) {userData.Basketball.Teams[i].Players = {};}
    
    k = Object.keys(userData.Basketball.Teams[i].Players).length;
    for(let x = 0; x < k; x++) {
        AddPlayer(userData.Basketball.Teams[i].Players[pad(x)].pnumb, userData.Basketball.Teams[i].Players[pad(x)].pname, true);
    }
    style(`.p3playerIcons div {height: ${userData.Basketball.Teams[ActiveTeam].Settings.TSSize}px;}`);
    document.getElementById('p3Display').querySelector('.overlay').style.height = get('p3Display').scrollHeight;
}

function AddPlayer(i, j, loadOnly) {
    if(!i) {i = '';}
    if(!j) {j = 'New Player';}
    var newPlayer = document.createElement('li');
    newPlayer.innerHTML = `
        <input class="c-pnu" value="${i}" onchange="playerChanged(this);">
        <input class="c-pna" value="${j}" onchange="playerChanged(this);">
        <div class='p3playerIcons'>
            <div onclick="playerOrder(this, true)" class="upIcon"></div>
            <div onclick="playerOrder(this, false)" class="downIcon"></div>
            <div onclick="RemovePlayer(this.parentElement);" class="trashIcon"></div>
        </div>
        `;
    get("p3TeamList").append(newPlayer);
    pnumb = i;
    pname = j;
    if(!loadOnly) {
        saveReminder(true);
        console.log(loadOnly);
        userData.Basketball.Teams[ActiveTeam].Players[pad(get('p3TeamList').children.length - 1)] = {pname, pnumb};
    }
}

function playerChanged(i) {
    saveReminder(true);
    pnumb = i.parentElement.children[0].value;
    pname = i.parentElement.children[1].value;
    userData.Basketball.Teams[ActiveTeam].Players[pad(Array.prototype.indexOf.call(get('p3TeamList').children, i.parentElement))] = {pnumb, pname};
}
function playerOrder(i, dir) {
    saveReminder(true);
    var currentIndex = parseInt(pad(Array.prototype.indexOf.call(get('p3TeamList').children, i.parentElement.parentElement)));
    targetIndex = currentIndex + (dir ? -1 : 1);
    if(targetIndex < 0 || targetIndex > get('p3TeamList').children.length - 1) {return null;}

    let placedTarget = false;
    let newPlayerData = {};
    let oldPlayerData = userData.Basketball.Teams[ActiveTeam].Players;
    var ex = 0;
    for(x = 0; x < targetIndex; x++) {
        if(currentIndex == x) {ex = 1;}
        newPlayerData[pad(x)] = oldPlayerData[pad(x + ex)];
    }
    newPlayerData[pad(targetIndex)] = oldPlayerData[pad(currentIndex)];
    for(x = targetIndex + 1; x < get('p3TeamList').children.length; x++) {
        if(currentIndex == x) {ex = -1;}
        if(currentIndex == x + ex - (dir ? 0 : 1)) {ex = 0;}
        newPlayerData[pad(x)] = oldPlayerData[pad(x + ex - (dir ? 0 : 1))];
    }
    console.log(oldPlayerData);
    console.log(newPlayerData);
    userData.Basketball.Teams[ActiveTeam].Players = newPlayerData;
    reloadp3Team();
}


function RemovePlayer(i) {
    saveReminder(true);
    userData.Basketball.Teams[ActiveTeam].Players = {};
    //delete userData.Basketball.Teams[p3ActiveTeam].Players[pad(Array.prototype.indexOf.call(get('p3TeamList').children, i.parentElement))];
    i.parentElement.remove();

    // Shift all player indexes
    let y = 0;
    for(x = 0; x < get('p3TeamList').children.length; x++) {
        userData.Basketball.Teams[ActiveTeam].Players[pad(y)] = {
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
            get('p3_settingsList').innerHTML = '';
            var teams = userData.Basketball.Teams;
            var htmlData = '<option disabled selected>Choose a team...</option>';
            for(let i in teams) {
                htmlData += "<option>" + i + "</option>"
                AddTeam(i, true);
                console.log(i);
            }
            //ActiveTeam = Object.keys(userData.Basketball.Teams)[0];
            get('p1teamList1').innerHTML = htmlData;
            get('p1teamList2').innerHTML = htmlData;
            get('p2SelectList').innerHTML = htmlData;

            reloadp3Team();

            hideWarning();
            if(!!sessionStorage.cachedGamepoints) {
                loadCachedData(sessionStorage);
            } else if(!!localStorage.cachedGamepoints) {
                showWarning("Would you like to load your previous game?", "Yes", "No", "loadCachedData(localStorage)");
            }
            globDataSaved = true;
          } catch (error) {
            console.log(error);
            console.log('Teams Path not Found');
            
            showPanel(3);
            showWarning("No teams found, start by creating some", "Okay")
          }
    });
}
function updateLists() {
    var teams = userData.Basketball.Teams;
    var htmlData = '<option disabled selected>Choose a team...</option>';
    for(let i in teams) {
        htmlData += "<option>" + i + "</option>"
        console.log(i);
    }
    //ActiveTeam = Object.keys(userData.Basketball.Teams)[0];
    get('p1teamList1').innerHTML = htmlData;
    get('p1teamList2').innerHTML = htmlData;
    get('p2SelectList').innerHTML = htmlData;

    hideWarning();

}



function DONTsaveDataToCloud() {
    showWarning("Are you sure you want to discard your changes?", "Yes", "Cancel", "userData = undefined; loadDataFromCloud(); saveReminder(false); exitFullScreen();", "saveReminder(true);")
}
function reloadp3Team() {
    lst = get('p3_settingsList').getElementsByTagName('li')
    for(s = 0; s < lst.length; s++) {
        console.log('[' + lst[s].dataset.value + '] [' + ActiveTeam + ']');
        if(lst[s].dataset.value == ActiveTeam) {
            p3LoadTeam(lst[s].children[2]);
            p2UpdateColors(ActiveTeam, false);
            break;
        }
    }
}

function saveDataToCloud() {
    globDataSaved = true;
    saveReminder(false);
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