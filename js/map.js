'use strict';

// Массив данных для предложения
var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckInTimes = ['12:00', '13:00', '14:00'];
var offerCheckOutTimes = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var typesDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Лачуга'
};

// Функция для получения рандомного числа из двух крайних
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания элементов массива
function getShuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getFeatures(array) {
  var randomNumber = getRandomInteger(1, array.length);
  return getShuffle(array).slice(0, randomNumber);
}

function getOffers() {
  var offers = [];
  for (var i = 0; i < offerTitles.length; i++) {
    var x = getRandomInteger(300, 900);
    var y = getRandomInteger(150, 500);
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: offerTitles[i],
        address: x + ', ' + y,
        price: getRandomInteger(1000, 1000000),
        type: getShuffle(offerTypes)[0],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: getShuffle(offerCheckInTimes)[0],
        checkout: getShuffle(offerCheckOutTimes)[0],
        features: getFeatures(offerFeatures),
        description: '',
        photos: getShuffle(offerPhotos)
      },
      location: {
        x: x,
        y: y
      }
    };
    offers.push(obj);
  }
  return offers;
}

var offers = getOffers();

// Показать карту
function getActiveMap() {
  var activeMap = document.querySelector('.map');
  activeMap.classList.remove('map--faded');
}

// Показать форму заполнения
function getActiveForm() {
  var activeForm = document.querySelector('.ad-form--disabled');
  activeForm.classList.remove('ad-form--disabled');
}

// Функция рандомного создания метки на карте
function createPins(offersList) {
  var pins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < offersList.length; i++) {
    var template = pinTemplate.cloneNode(true);
    template.style = 'left: ' + (offersList[i].location.x - 25) + 'px; top: ' + (offersList[i].location.y - 70) + 'px';
    template.querySelector('img').src = offersList[i].author.avatar;
    template.querySelector('img').setAttribute('id', i);
    template.addEventListener('click', function () {
      createMapCard(event);
    }, false);
    pinFragment.appendChild(template);
  }
  pins.appendChild(pinFragment);
}


function removeChildren(list) {
  while (list.querySelector('li')) {
    var li = list.querySelector('li');
    list.removeChild(li);
  }
  return list;
}

function createMapCard(evt) {
  if (checkIfCardIsOpen()) {
    buttonClickHandler();
  }
  var singleOffer = offers[evt.target.id];
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('#card-template').content.querySelector('.map__card');

  var newMapCard = mapCardTemplate.cloneNode(true);
  newMapCard.querySelector('.popup__avatar').src = singleOffer.author.avatar;
  newMapCard.querySelector('.popup__title').textContent = singleOffer.offer.title;
  newMapCard.querySelector('.popup__text--address').textContent = singleOffer.offer.address;
  newMapCard.querySelector('.popup__text--price').textContent = singleOffer.offer.price + ' Р/ночь';
  newMapCard.querySelector('.popup__type').textContent = typesDictionary[singleOffer.offer.type];
  newMapCard.querySelector('.popup__text--capacity').textContent = singleOffer.offer.rooms + ' комната для ' + singleOffer.offer.guests + ' гостей';
  newMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + singleOffer.offer.checkin + ' ,' + ' выезд до ' + singleOffer.offer.checkout;
  newMapCard.querySelector('.popup__description').textContent = singleOffer.offer.description;

  // добавляем features
  var list = removeChildren(newMapCard.querySelector('.popup__features'));
  for (var i = 0; i < singleOffer.offer.features.length; i++) {
    var element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add('popup__feature--' + singleOffer.offer.features[i]);
    element.textContent = singleOffer.offer.features[i];
    list.appendChild(element);
  }

  // добавляем фото
  var photos = newMapCard.querySelector('.popup__photos');
  var photoTemplate = photos.querySelector('.popup__photo');
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < singleOffer.offer.photos.length; j++) {
    var photo = photoTemplate.cloneNode(true);
    photo.src = singleOffer.offer.photos[j];
    fragment.appendChild(photo);
  }
  newMapCard.querySelector('.popup__close').addEventListener('click', buttonClickHandler);
  photos.removeChild(photoTemplate);
  photos.appendChild(fragment);
  window.addEventListener('keydown', windowEscKeyDownHandler);
  map.insertBefore(newMapCard, mapFiltersContainer);
}

// Фукнция закрытия карточки
function buttonClickHandler() {
  window.removeEventListener('keydown', windowEscKeyDownHandler);
  var map = document.querySelector('.map');
  var popup = document.querySelector('.popup');
  map.removeChild(popup);
}

var mainPin = document.querySelector('.map__pin--main');
var offsetLeft = mainPin.offsetLeft - 1;
var offsetTop = mainPin.offsetTop;
var PIN_CENTER_X = offsetLeft;
var PIN_CENTER_Y = offsetTop;
var addressFieldset = document.querySelector('#address');
addressFieldset.value = PIN_CENTER_X + ', ' + PIN_CENTER_Y;

var KeyCodes = {
  ENTER: 13,
  ESC: 27
};

function getDisableFieldsets() {
  var formFieldsets = document.querySelectorAll('fieldset');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', true);
  }
}

getDisableFieldsets();

function getActiveFieldsets() {
  var formFieldsets = document.querySelectorAll('fieldset');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
}


mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
window.addEventListener('keydown', windowEnterKeyDownHandler);

// Фнукция активации формы
function mainPinMouseUpHandler() {
  getActiveForm();
  getActiveFieldsets();
  getActiveMap();
  createPins(offers);

  selectRoomNumberChangeHandler();
  // getOptionsRoom();

  mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
  window.removeEventListener('keydown', windowEnterKeyDownHandler);
}

function windowEnterKeyDownHandler(evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    mainPinMouseUpHandler();
  }
}

function windowEscKeyDownHandler(evt) {
  evt.preventDefault();
  if (evt.keyCode === KeyCodes.ESC) {
    buttonClickHandler();
  }
}

function checkIfCardIsOpen() {
  var popup = document.querySelector('.popup');
  return popup ? true : false;
}

var adForm = document.querySelector('.ad-form');


var selectRoomNumber = adForm.elements.namedItem('rooms');
selectRoomNumber.addEventListener('change', selectRoomNumberChangeHandler);

// var selectGuestNumber = adForm.elements.namedItem('capacity');
// selectGuestNumber.addEventListener('change', getOptionsRoom);

// Синхронизация полей типа жилья и цены
var selectHouseType = document.querySelector('#type');
var inputHousePrice = document.querySelector('#price');
selectHouseType.addEventListener('change', function (evt) {
  if (evt.currentTarget.value === 'bungalo') {
    inputHousePrice.placeholder = '0';
    inputHousePrice.min = 0;
  } else if (evt.currentTarget.value === 'flat') {
    inputHousePrice.placeholder = '1000';
    inputHousePrice.min = 1000;
  } else if (evt.currentTarget.value === 'house') {
    inputHousePrice.placeholder = 5000;
    inputHousePrice.min = 5000;
  } else if (evt.currentTarget.value === 'palace') {
    inputHousePrice.placeholder = '10000';
    inputHousePrice.min = 10000;
  }
});

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
  for (var j = 0; j < newOptions.length; j++) {
    var optionElement = document.createElement('option');
    optionElement.setAttribute('value', newOptions[j].value);
    optionElement.textContent = newOptions[j].text;
    capacity.appendChild(optionElement);
  }
}

// function getOptionsRoom() {
//   var roomNumber = document.querySelector('#room_number');
//   var capacity = document.querySelector('#capacity');
//   var options = roomNumber.querySelectorAll('option');
//   for (var i = 0; i < options.length; i++) {
//     roomNumber.removeChild(options[i]);
//   }
//   var newOptions = [];
//   switch (capacity.value) {
//     case '1':
//       newOptions.push({value: '1', text: '1 комната'});
//       break;
//     case '2':
//       newOptions.push({value: '1', text: '1 комната'});
//       newOptions.push({value: '2', text: '2 комнаты'});
//       break;
//     case '3':
//       newOptions.push({value: '1', text: '1 комната'});
//       newOptions.push({value: '2', text: '2 комнаты'});
//       newOptions.push({value: '3', text: '3 комнаты'});
//       break;
//     case '0':
//       newOptions.push({value: '100', text: '100 комнат'});
//       break;
//   }
//   for (var j = 0; j < newOptions.length; j++) {
//     var optionElement = document.createElement('option');
//     optionElement.setAttribute('value', newOptions[j].value);
//     optionElement.textContent = newOptions[j].text;
//     roomNumber.appendChild(optionElement);
//   }
// }

// Синхронизация времени заезда и времени выезда
var selectTimeIn = document.querySelector('#timein');
var selectTimeOut = document.querySelector('#timeout');
selectTimeIn.addEventListener('change', function (evt) {
  selectTimeOut.value = evt.currentTarget.value;
});
selectTimeOut.addEventListener('change', function (evt) {
  selectTimeIn.value = evt.currentTarget.value;
});
