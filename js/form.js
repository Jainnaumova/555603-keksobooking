'use strict';

(function () {

  var PIN_LIMIT = 5;
  var SIZE_X = 25;
  var SIZE_Y = 70;
  var ON_ERROR_TIMEOUT = 1500;
  var SUCCESS_MESSAGE_TIMEOUT = 2000;
  var BUNGALO_PLH = 0;
  var FLAT_PLH = 1000;
  var HOUSE_PLH = 5000;
  var PALACE_PLH = 10000;
  var adForm = document.querySelector('.ad-form');
  var inputHousePrice = document.querySelector('#price');

  function onError(message) {
    var promo = document.querySelector('.promo');
    var newElement = document.createElement('div');
    newElement.textContent = message;
    newElement.classList.add('error-message');
    promo.appendChild(newElement);
    setTimeout(function () {
      promo.removeChild(newElement);
    }, ON_ERROR_TIMEOUT);
  }

  function onLoad(data) {
    window.resetForm.resetButtonClickHandler();
    for (var i = data.length; i--;) {
      data[i].id = i + 1;
    }
    window.offers = data;
  }

  function hideSuccessMessage(element) {
    setTimeout(function () {
      element.classList.add('hidden');
    }, SUCCESS_MESSAGE_TIMEOUT);
  }

  function postOnLoad() {
    window.resetForm.resetButtonClickHandler();
    var succesMessage = document.querySelector('.success');
    succesMessage.classList.remove('hidden');
    hideSuccessMessage(succesMessage);
  }

  window.backend.load(onLoad, onError);
  var pins = document.querySelector('.map__pins');

  function createPins(offersList) {
    var pinTemplate = document.querySelector('.map__pin');
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < offersList.length && i < PIN_LIMIT; i++) {
      var template = pinTemplate.cloneNode(true);
      template.style = 'left: ' + (offersList[i].location.x - SIZE_X) + 'px; top: ' + (offersList[i].location.y - SIZE_Y) + 'px';
      template.querySelector('img').src = offersList[i].author.avatar;
      template.querySelector('img').setAttribute('id', offersList[i].id);
      template.setAttribute('id', offersList[i].id);
      template.addEventListener('click', function (event) {
        window.card.createPinOffer(event);
      }, false);
      pinFragment.appendChild(template);
    }
    pins.appendChild(pinFragment);
  }

  function selectRoomNumberChangeHandler() {
    var capacity = document.querySelector('#capacity');
    var roomNumber = document.querySelector('#room_number');
    var options = capacity.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      capacity.removeChild(options[i]);
    }
    var newOptions = [];
    switch (roomNumber.value) {
      case '1':
        newOptions.push({value: '1', text: 'для 1 гостя'});
        break;
      case '2':
        newOptions.push({value: '1', text: 'для 1 гостя'});
        newOptions.push({value: '2', text: 'для 2 гостей'});
        break;
      case '3':
        newOptions.push({value: '1', text: 'для 1 гостя'});
        newOptions.push({value: '2', text: 'для 2 гостей'});
        newOptions.push({value: '3', text: 'для 3 гостей'});
        break;
      case '100':
        newOptions.push({value: '0', text: 'не для гостей'});
        break;
    }

    var capacityFragment = document.createDocumentFragment();
    for (var j = 0; j < newOptions.length; j++) {
      var optionElement = document.createElement('option');
      optionElement.setAttribute('value', newOptions[j].value);
      optionElement.textContent = newOptions[j].text;
      capacityFragment.appendChild(optionElement);
    }
    capacity.appendChild(capacityFragment);
  }

  function mainPinMouseUpHandler() {
    window.utilFunc.setActiveForm();
    window.utilFunc.setActiveFieldsets();
    window.utilFunc.setActiveMap();
    if (onLoad) {
      window.selection.filterOffers();
    }
    selectRoomNumberChangeHandler();
    selectHouseTypeChangeHandler();
    var filtersContainer = document.querySelector('.map__filters');
    filtersContainer.addEventListener('change', function () {
      window.debounce(window.selection.filterOffers);
    });

    window.removeEventListener('keydown', window.utilKeyCode.windowEnterKeyDownHandler);
  }

  function deletePins() {
    var buttons = pins.querySelectorAll('button');
    for (var i = 1; i < buttons.length; i++) {
      pins.removeChild(buttons[i]);
    }
  }

  var selectRoomNumber = adForm.elements.namedItem('rooms');
  selectRoomNumber.addEventListener('change', selectRoomNumberChangeHandler);

  var selectHouseType = document.querySelector('#type');
  selectHouseType.addEventListener('change', selectHouseTypeChangeHandler);

  function selectHouseTypeChangeHandler() {
    inputHousePrice.removeAttribute('placeholder');
    var newOptions;
    switch (selectHouseType.value) {
      case 'bungalo':
        newOptions = {placeholder: BUNGALO_PLH, min: BUNGALO_PLH};
        break;
      case 'flat':
        newOptions = {placeholder: FLAT_PLH, min: FLAT_PLH};
        break;
      case 'house':
        newOptions = {placeholder: HOUSE_PLH, min: HOUSE_PLH};
        break;
      case 'palace':
        newOptions = {placeholder: PALACE_PLH, min: PALACE_PLH};
        break;
      default:
        return;
    }
    inputHousePrice.setAttribute('placeholder', newOptions.placeholder);
    inputHousePrice.setAttribute('min', newOptions.min);
  }

  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');
  selectTimeIn.addEventListener('change', function (evt) {
    selectTimeOut.value = evt.currentTarget.value;
  });
  selectTimeOut.addEventListener('change', function (evt) {
    selectTimeIn.value = evt.currentTarget.value;
  });

  adForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(adForm);

    window.backend.send(formData, postOnLoad, onError);
  });

  window.form = {
    selectRoomNumberChangeHandler: selectRoomNumberChangeHandler,
    mainPinMouseUpHandler: mainPinMouseUpHandler,
    deletePins: deletePins,
    createPins: createPins
  };

})();
