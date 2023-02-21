var sP = document.getElementById('sidePanel');
var startX;
var startY;
var dist = 0;
var inEditView = true;

function toggleEditView() {
    inEditView = !inEditView;

    get("displayPanelContent").classList.toggle('dispView');
    get("mainPanel").classList.toggle('dispView');
    toggleShowSidePanel(inEditView);
}

function toggleShowSidePanel(i) {
    if(i == true) {get("sidePanel").classList.remove('shown');}
    if(i == false) {get("sidePanel").classList.add('shown');}
}

function get(i) {
    return document.getElementById(i);
}

document.addEventListener('mousemove', function(event) {
    if(event.clientX <= 100 && !inEditView) {
        toggleShowSidePanel(true);
    } else if (!inEditView) {
        toggleShowSidePanel(false);
    }
});



document.addEventListener("DOMContentLoaded", function() {
    get("sidePanel").addEventListener('click', function() {
        if(!inEditView) {toggleEditView();}
    });
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