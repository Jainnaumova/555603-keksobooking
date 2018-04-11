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

// Удаляем класс map__faded
var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');

// Функция рандомного создания метки на карте
function createPins(offersList) {
  var pins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < offersList.length; i++) {
    var template = pinTemplate.cloneNode(true);
    template.style = 'left: ' + (offersList[i].location.x - 25) + 'px; top: ' + (offersList[i].location.y - 70) + 'px';
    template.querySelector('img').src = offersList[i].author.avatar;
    pinFragment.appendChild(template);
  }
  pins.appendChild(pinFragment);
}

createPins(offers);

function removeChildren(list) {
  while (list.querySelector('li')) {
    var li = list.querySelector('li');
    list.removeChild(li);
  }
  return list;
}

function createMapCard(offersList) {
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('#card-template').content.querySelector('.map__card');

  for (var i = 0; i < offersList.length; i++) {
    var newMapCard = mapCardTemplate.cloneNode(true);
    newMapCard.querySelector('.popup__avatar').src = offersList[i].author.avatar;
    newMapCard.querySelector('.popup__title').textContent = offersList[i].offer.title;
    newMapCard.querySelector('.popup__text--address').textContent = offersList[i].offer.address;
    newMapCard.querySelector('.popup__text--price').textContent = offersList[i].offer.price + ' Р/ночь';
    newMapCard.querySelector('.popup__type').textContent = typesDictionary[offersList[i].offer.type];
    newMapCard.querySelector('.popup__text--capacity').textContent = offersList[i].offer.rooms + ' комната для ' + offersList[i].offer.guests + ' гостей';
    newMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offersList[i].offer.checkin + ' ,' + ' выезд до ' + offersList[i].offer.checkout;
    newMapCard.querySelector('.popup__description').textContent = offersList[i].offer.description;

    // добавляем features
    var list = removeChildren(newMapCard.querySelector('.popup__features'));
    for (var j = 0; j < offersList[i].offer.features.length; j++) {
      var element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + offersList[i].offer.features[j]);
      element.textContent = offersList[i].offer.features[j];
      list.appendChild(element);
    }

    // добавляем фото
    var photos = newMapCard.querySelector('.popup__photos');
    var photoTemplate = photos.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < offersList[i].offer.photos.length; k++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = offersList[i].offer.photos[k];
      fragment.appendChild(photo);
    }
    photos.removeChild(photoTemplate);
    photos.appendChild(fragment);
    map.insertBefore(newMapCard, mapFiltersContainer);
  }
}

createMapCard(offers);
