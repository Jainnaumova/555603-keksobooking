'use strict';

(function () {

  var PIN_LIMIT = 5;
  var SIZE_X = 25;
  var SIZE_Y = 70;
  var ON_ERROR_TIMEOUT = 1500;
  var SUCCESS_MESSAGE_TIMEOUT = 2000;
  var Room = {
    NUMBER_1: '1',
    NUMBER_2: '2',
    NUMBER_3: '3',
    NUMBER_100: '100'
  };
  var RoomSize = {
    VALUE_0: '0',
    VALUE_1: '1',
    VALUE_2: '2',
    VALUE_3: '3'
  };
  var RoomCapacity = {
    TEXT_0: 'не для гостей',
    TEXT_1: 'для 1 гостя',
    TEXT_2: 'для 2 гостей',
    TEXT_3: 'для 3 гостей'
  };
  var HouseType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };
  var PlaceholderValue = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
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
    offersList.forEach(function (el, i) {
      if (i < PIN_LIMIT) {
        var template = pinTemplate.cloneNode(true);
        template.style = 'left: ' + (el.location.x - SIZE_X) + 'px; top: ' + (el.location.y - SIZE_Y) + 'px';
        template.querySelector('img').src = el.author.avatar;
        template.querySelector('img').setAttribute('id', el.id);
        template.setAttribute('id', el.id);
        template.addEventListener('click', function (event) {
          window.card.createPinOffer(event);
        }, false);
        pinFragment.appendChild(template);
      }
    });
    pins.appendChild(pinFragment);
  }

  function selectRoomNumberChangeHandler() {
    var capacity = document.querySelector('#capacity');
    var roomNumber = document.querySelector('#room_number');
    var options = capacity.querySelectorAll('option');
    options.forEach(function (el) {
      capacity.removeChild(el);
    });
    var newOptions = [];
    switch (roomNumber.value) {
      case Room.NUMBER_1:
        newOptions.push({value: RoomSize.VALUE_1, text: RoomCapacity.TEXT_1});
        break;
      case Room.NUMBER_2:
        newOptions.push({value: RoomSize.VALUE_1, text: RoomCapacity.TEXT_1});
        newOptions.push({value: RoomSize.VALUE_2, text: RoomCapacity.TEXT_2});
        break;
      case Room.NUMBER_3:
        newOptions.push({value: RoomSize.VALUE_1, text: RoomCapacity.TEXT_1});
        newOptions.push({value: RoomSize.VALUE_2, text: RoomCapacity.TEXT_2});
        newOptions.push({value: RoomSize.VALUE_3, text: RoomCapacity.TEXT_3});
        break;
      case Room.NUMBER_100:
        newOptions.push({value: RoomSize.ROOM_NUMBER_VALUE_0, text: RoomCapacity.TEXT_0});
        break;
    }

    var capacityFragment = document.createDocumentFragment();
    newOptions.forEach(function (el) {
      var optionElement = document.createElement('option');
      optionElement.setAttribute('value', el.value);
      optionElement.textContent = el.text;
      capacityFragment.appendChild(optionElement);
    });
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
    buttons.forEach(function (el, i) {
      if (i > 0) {
        pins.removeChild(el);
      }
    });
  }

  var selectRoomNumber = adForm.elements.namedItem('rooms');
  selectRoomNumber.addEventListener('change', selectRoomNumberChangeHandler);

  var selectHouseType = document.querySelector('#type');
  selectHouseType.addEventListener('change', selectHouseTypeChangeHandler);

  function selectHouseTypeChangeHandler() {
    inputHousePrice.removeAttribute('placeholder');
    var newOptions;
    switch (selectHouseType.value) {
      case HouseType.BUNGALO:
        newOptions = {placeholder: PlaceholderValue.BUNGALO, min: PlaceholderValue.BUNGALO};
        break;
      case HouseType.FLAT:
        newOptions = {placeholder: PlaceholderValue.FLAT, min: PlaceholderValue.FLAT};
        break;
      case HouseType.HOUSE:
        newOptions = {placeholder: PlaceholderValue.HOUSE, min: PlaceholderValue.HOUSE};
        break;
      case HouseType.PALACE:
        newOptions = {placeholder: PlaceholderValue.PALACE, min: PlaceholderValue.PALACE};
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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
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
