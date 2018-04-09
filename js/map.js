'use strict';

// Массив данных для предложения
var titleOffer = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeOffer = ['Дворец', 'Квартира', 'Дом', 'Лачуга'];
var checkinOffer = ['12:00', '13:00', '14:00'];
var checkoutOffer = ['12:00', '13:00', '14:00'];
var featureOffer = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosOffer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция для получения рандомного числа из двух крайних
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для получения рандомного элемента массива
function getRandomElementArray(ArrayName) {
  var randomNumber = Math.floor(Math.random() * ArrayName.length);
  return ArrayName[randomNumber];
}

// Функция для перемешивания элементов массива
function sortRandomElementArray(ArrayName) {
  function mixElementArray() {
    return Math.random - 0.5;
  }
  return ArrayName.sort(mixElementArray)
};

// Функция для создания фото к предложению
function createNewPhoto(tag, classTag, text) {
  var newPhoto = document.createElement(tag);
  newPhoto.classList.add(classTag);
  if (text) {
    newPhoto.textContent = text;
  }
  return newPhoto;
}

// Массив предложения
var dataOffer = {
  author: {
    avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png'
  },

  offer: {
    title: getRandomElementArray(titleOffer),
    address: function() {
      return dataOffer.location.x + ', ' + dataOffer.location.y;
    },
    price: getRandomInteger(1000, 1000000),
    type: getRandomElementArray(typeOffer),
    rooms: getRandomInteger(1, 5),
    // не понятно какое максимальное количество гостей можно разместить?
    guests: getRandomInteger(1, 10),
    checkin: getRandomElementArray(checkinOffer),
    checkout: getRandomElementArray(checkoutOffer),
    // как это сделать такой массив?
    features: 'массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"',
    description: '',
    photos: sortRandomElementArray(photosOffer)
  },

  location: {
    x: getRandomInteger(300, 900),
    y: getRandomInteger(150, 500)
  }
};

// Удаляем класс map__faded
var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');

// Функция рандомного создания метки на карте

function createPin(entryArray) {
  var pinTemplate = document.querySelector('#card-template').content.querySelector('.map__pin');
  var pinImg = pinTemplate.querySelector('img');
  var pinCoordinate = "'left: ' + entryArray.location.x + 'px' + 'top: ' + entryArray.location.y + 'px'";
  pinTemplate.style = pinCoordinate;
  pinImg.scr = entryArray.author.avatar;
  pinImg.alt = entryArray.offer.title;
  return pinTemplate;
}
activeMap.querySelector('.map__pins').appendChild(createPin(dataOffer));

// Функция рандомного заполнения блока DOM-элементами
function createMapCard(entryArray) {
  var mapCardTemplate = document.querySelector('#card-template').content.querySelector('.map__card');
  mapCardTemplate.querySelector('.popup__title').textContent = entryArray.offer.title;
  mapCardTemplate.querySelector('.popup__text--address').textContent = entryArray.offer.address();
  mapCardTemplate.querySelector('.popup__text--price').textContent = entryArray.offer.price + ' Р/ночь';
  mapCardTemplate.querySelector('.popup__type').textContent = entryArray.offer.type;
  mapCardTemplate.querySelector('.popup__text--capacity').textContent = entryArray.offer.rooms + ' комната для ' + entryArray.offer.guests + ' гостей';
  mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + entryArray.offer.checkin + ' ,' + ' выезд до ' + entryArray.offer.checkout;
  mapCardTemplate.querySelector('.popup__features').classList.add('popup__feature--wifi');
  mapCardTemplate.querySelector('.popup__description').textContent = entryArray.offer.description;
// Добавляю фото к предложению
  for (var i = 0; i < entryArray.offer.photos.length; i++) {
    var imagesOffer = mapCardTemplate.querySelector('.popup__photos');
    var imgOffer = createNewPhoto('img', 'popup__photo');
    imgOffer.width = 45;
    imgOffer.height = 40;
    imgOffer.src = entryArray.offer.photos[i];
    imagesOffer.appendChild(imgOffer);
  }



  return mapCardTemplate;
};
// Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.???

activeMap.appendChild(createMapCard(dataOffer));
