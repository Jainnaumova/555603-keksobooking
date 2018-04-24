'use strict';

window.utilKeyCode = (function () {
  var KeyCodes = {
    ENTER: 13,
    ESC: 27
  };
  var map = document.querySelector('.map');
  // Функция закрытия карточки

  return {
    buttonClickHandler: function () {
      window.removeEventListener('keydown', window.utilKeyCode.windowEscKeyDownHandler);
      var popup = document.querySelector('.popup');
      map.removeChild(popup);
    },
    windowEnterKeyDownHandler: function (evt) {
      if (evt.keyCode === KeyCodes.ENTER) {
        window.form.mainPinMouseUpHandler();
      }
    },
    windowEscKeyDownHandler: function (evt) {
      evt.preventDefault();
      if (evt.keyCode === KeyCodes.ESC) {
        window.utilKeyCode.buttonClickHandler();
      }
    }
  };
})();
