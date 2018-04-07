
"use strict"
// функция активации формы
function activateForm () {
  var mapFadedElement = document.getElementsByClassName('map--faded')[0];
  mapFadedElement.classList.remove('map--faded');
  var formDisabledElement = document.getElementsByClassName('ad-form--disabled')[0];
  formDisabledElement.classList.remove('ad-form--disabled');
  pinElement.removeEventListener('click', activateForm);
  }
var pinElement = document.getElementById('drag__pin');
pinElement.addEventListener('click', activateForm);
// функция активации формы

// перетаскивание кнопки

var btnPressed = false;
var px, py, dx, dy;
pinElement.addEventListener('mousedown', function getMouseCoordinates(e) {
    btnPressed = true;
    px = e.clientX;
    py = e.clientY;
  }
);

pinElement.addEventListener('mouseup', function buttonReleased(e) {
    btnPressed = false;
  }
);

document.addEventListener('mouseup', function documentOnMouseUp(e) {
    pinElement.style.MozTransform = "";
    pinElement.style.WebkitTransform = "";
    pinElement.style.opacity = 1;
  }
);

document.addEventListener('mousemove', function windowOnMouseMove(e) {
    if(btnPressed) {
      dx = e.clientX - px;
      dy = e.clientY - py;
      pinElement.style.opacity = 0.85;
      pinElement.style.MozTransform = "translate(" + dx + "px, " + dy + "px)";
      pinElement.style.WebkitTransform = "translate(" + dx + "px, " + dy + "px)";
    }
    document.removeEventListener('mouseup', windowOnMouseMove, true);
  }
);

//
// перетаскивание кнопки
