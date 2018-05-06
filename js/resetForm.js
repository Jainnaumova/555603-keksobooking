'use strict';

(function () {

  var RESET_PLH = 1000;
  var RESET_MIN = 0;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var formFieldsets = document.querySelectorAll('fieldset');
  var initialPinX;
  var initialPinY;
  var offsetLeft = mainPin.offsetLeft - 1;
  var offsetTop = mainPin.offsetTop;
  initialPinX = offsetLeft;
  initialPinY = offsetTop;
  var addressFieldset = document.querySelector('#address');
  addressFieldset.value = initialPinX + ', ' + initialPinY;
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', resetButtonClickHandler);

  function resetButtonClickHandler() {
    window.form.deletePins();
    resetInputData();
    resetInputPrice();
    getDisableFieldsets();
    returnPinToInitialPosition();
    window.utilFunc.setInActiveFieldsets();
    if (window.utilFunc.checkIfCardIsOpen()) {
      window.utilKeyCode.buttonClickHandler();
    }
    window.form.selectRoomNumberChangeHandler();
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    addressFieldset.value = initialPinX + ', ' + initialPinY;
  }

  function returnPinToInitialPosition() {
    mainPin.style.top = initialPinY + 'px';
    mainPin.style.left = initialPinX + 'px';
  }

  function resetInputData() {
    var allInputs = document.querySelectorAll('input');
    var selectors = document.querySelectorAll('select');

    if (window.selectorsInitialValues.length) {
      for (var k = 0; k < selectors.length; k++) {
        selectors[k].value = window.selectorsInitialValues[k];
      }
    }

    document.querySelector('textarea').value = '';
    for (var j = allInputs.length; j--;) {
      allInputs[j].value = '';
    }
    var checkboxInputs = document.querySelectorAll('input[type=checkbox]');
    for (var i = checkboxInputs.length; i--;) {
      if (checkboxInputs[i].checked) {
        checkboxInputs[i].checked = false;
      }
      checkboxInputs[i].value = checkboxInputs[i].id.split('-')[1];
    }

  }

  function getDisableFieldsets() {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', true);
    }
  }

  var inputHousePrice = document.querySelector('#price');

  function resetInputPrice() {
    inputHousePrice.placeholder = RESET_PLH;
    inputHousePrice.min = RESET_MIN;
  }

  window.resetForm = {
    resetButtonClickHandler: resetButtonClickHandler,
    getDisableFieldsets: getDisableFieldsets
  };
})();
