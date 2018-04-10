'use strict';

// Массив данных для предложения
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckInTimes = ['12:00', '13:00', '14:00'];
var offerCheckOutTimes = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция для получения рандомного числа из двух крайних
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания элементов массива
function getShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

// Функция для создания фото к предложению
function createNewPhoto(tag, classTag) {
  var newPhoto = document.createElement(tag);
  newPhoto.classList.add(classTag);
  return newPhoto;
}

function getFeatures(array) {
  var randomNumber = Math.random(0, array.length);
  return getShuffle(array).slice(0, randomNumber);
}

var array = [];
function createArray() {
  for (var i = 0; i < 8; i++) {
    var x = getRandomInteger(300, 900);
    var y = getRandomInteger(150, 500);
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: offerTitles[i],
        address: x + ", " + y,
        price: getRandomInteger(1000, 1000000),
        type: getShuffle(offerTypes)[0],
        rooms: getRandomInteger(1,5),
        guests: getRandomInteger(1,10),
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
    array.push(obj);
  }
}

// Удаляем класс map__faded
var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');

// Функция рандомного создания метки на карте
function createPins(obj) {
  var pins = document.querySelector('.map__pin');
  var pinTemplate = document.querySelector('#card-template').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment()
  for (var i = 0; i < 8; i++) {
    var template = pinTemplate.cloneNode(true);
    template.style = 'left: ' + (obj.location.x - 25) + 'px; top: ' + (obj.location.y - 70) + 'px';
    template.querySelector('img').src = array[i].author.avatar;
    pinFragment.appendChild(template);
  }
  pins.appendChild(pinFragment);
}
createPins();

function createMapCard() {
  var mapCardTemplate = document.querySelector('#card-template').content.querySelector('.map__card');
  var newMapCard = mapCardTemplate.cloneNode(true);
  var mapCardFragment = document.createDocumentFragment();
  mapCardFragment.appendChild(newMapCard);
}
  for (var i = 0; i < 8; i++) {
    newMapCard.querySelector('.popup__avatar').src = array[i].author.avatar;
    newMapCard.querySelector('.popup__title').textContent = array[i].offer.title;
    newMapCard.querySelector('.popup__text--address').textContent = array[i].offer.address;
    newMapCard.querySelector('.popup__text--price').textContent = array[i].offer.price + ' Р/ночь';
    newMapCard.querySelector('.popup__type').textContent = array[i].offer.type;
    newMapCard.querySelector('.popup__text--capacity').textContent = array[i].offer.rooms + ' комната для ' + obj.offer.guests + ' гостей';
    newMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + array[i].offer.checkin + ' ,' + ' выезд до ' + array[i].offer.checkout;
    newMapCard.querySelector('.popup__features').textContent = '';
    newMapCard.querySelector('.popup__features').textContent = array[i].offer.features;
    newMapCard.querySelector('.popup__description').textContent = array[i].offer.description;
    newMapCard.querySelector('.popup__photos').textContent = '';
    newMapCard.querySelector('.popup__photos').textContent = array[i].offer.photos;
  }
createMapCard();

// ??????????????? Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

// ???????????? Не получилось, чтобы Пинов на карте было 5 штук, как выполнить
