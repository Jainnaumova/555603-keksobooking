'use strict';

(function () {
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
  }

  function returnPinToInitialPosition() {
    mainPin.style.top = initialPinY + 'px';
    mainPin.style.left = initialPinX + 'px';
  }

  function resetInputData() {
    var allInputs = document.querySelectorAll('input');
    var checkboxInputs = allInputs.type('checkbox');
    // document.querySelector('checked').type = false;
    for (var i = checkboxInputs.length; i--;) {
      checkboxInputs[i].setAttribute('unchecked', true);
    }

    document.querySelector('textarea').value = '';
    for (var j = allInputs.length; j--;) {
      allInputs[j].value = '';
    }
  }

  function getDisableFieldsets() {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', true);
    }
  }

  var inputHousePrice = document.querySelector('#price');

  function resetInputPrice() {
    inputHousePrice.placeholder = '1000';
    inputHousePrice.min = '0';
  }

  window.resetForm = {
    resetButtonClickHandler: resetButtonClickHandler
  };
})();
