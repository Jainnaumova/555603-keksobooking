'use strict';

(function () {

  var BORDER_TOP_MAIN_PIN_FIELD = 150;
  var BORDER_RIGHT_MAIN_PIN_FIELD = 1150;
  var BORDER_BOTTOM_MAIN_PIN_FEILD = 500;
  var BORDER_LEFT_MAIN_PIN_FIELD = 0;
  var mainPin = document.querySelector('.map__pin--main');
  var addressFieldset = document.querySelector('#address');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      function restrictMainPinFieldMoving(pinCoords, min, max) {
        return Math.max(min, Math.min(pinCoords, max));
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var mainPinLeft = mainPin.offsetLeft - shift.x;
      var mainPinTop = mainPin.offsetTop - shift.y;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinLeft = restrictMainPinFieldMoving(mainPinLeft, BORDER_LEFT_MAIN_PIN_FIELD, BORDER_RIGHT_MAIN_PIN_FIELD);
      mainPinTop = restrictMainPinFieldMoving(mainPinTop, BORDER_TOP_MAIN_PIN_FIELD, BORDER_BOTTOM_MAIN_PIN_FEILD);
      mainPin.style.top = (mainPinTop) + 'px';
      mainPin.style.left = (mainPinLeft) + 'px';
      addressFieldset.value = (mainPinLeft) + ', ' + (mainPinTop);
      mainPin.addEventListener('mouseup', window.form.mainPinMouseUpHandler);
    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
