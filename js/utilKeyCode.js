'use strict';

(function () {
  var KeyCodes = {
    ENTER: 13,
    ESC: 27
  };
  var map = document.querySelector('.map');
  // Функция закрытия карточки

  function buttonClickHandler() {
    window.removeEventListener('keydown', windowEscKeyDownHandler);
    var popup = document.querySelector('.popup');
    map.removeChild(popup);
  }
  function windowEnterKeyDownHandler(evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      window.form.mainPinMouseUpHandler();
    }
  }
  function windowEscKeyDownHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === KeyCodes.ESC) {
      window.utilKeyCode.buttonClickHandler();
    }
  }

  window.utilKeyCode = {
    buttonClickHandler: buttonClickHandler,
    windowEnterKeyDownHandler: windowEnterKeyDownHandler,
    windowEscKeyDownHandler: windowEscKeyDownHandler
  };
})();
