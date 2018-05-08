'use strict';

(function () {

  var RESET_PLH = 1000;
  var RESET_MIN = 0;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
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
    var adFormInputs = adForm.querySelectorAll('input');
    var filterSelectors = mapFilters.querySelectorAll('select');
    var adFormSelectors = adForm.querySelectorAll('select');
    var combinedSelectors = Array.from(filterSelectors).concat(Array.from(adFormSelectors));

    if (window.selectorsInitialValues.length) {
      combinedSelectors.forEach(function (el, i) {
        el.value = window.selectorsInitialValues[i];
      });
    }

    adFormInputs.forEach(function (el) {
      el.value = '';
    });

    document.querySelector('textarea').value = '';

    var checkboxInputs = document.querySelectorAll('input[type=checkbox]');
    for (var i = checkboxInputs.length; i--;) {
      if (checkboxInputs[i].checked) {
        checkboxInputs[i].checked = false;
      }
      checkboxInputs[i].value = checkboxInputs[i].id.split('-')[1];
    }

  }

  function getDisableFieldsets() {
    formFieldsets.forEach(function (el) {
      el.setAttribute('disabled', true);
    });
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
