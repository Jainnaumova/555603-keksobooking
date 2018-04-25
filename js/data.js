'use strict';

(function () {
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

  function getFeatures(array) {
    var randomNumber = window.utilFunc.getRandomInteger(1, array.length);
    return window.utilFunc.getShuffle(array).slice(0, randomNumber);
  }

  window.addEventListener('keydown', window.utilKeyCode.windowEnterKeyDownHandler);

  function getOffers() {
    var offers = [];
    for (var i = 0; i < offerTitles.length; i++) {
      var x = window.utilFunc.getRandomInteger(300, 900);
      var y = window.utilFunc.getRandomInteger(150, 500);
      var obj = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: offerTitles[i],
          address: x + ', ' + y,
          price: window.utilFunc.getRandomInteger(1000, 1000000),
          type: window.utilFunc.getShuffle(offerTypes)[0],
          rooms: window.utilFunc.getRandomInteger(1, 5),
          guests: window.utilFunc.getRandomInteger(1, 10),
          checkin: window.utilFunc.getShuffle(offerCheckInTimes)[0],
          checkout: window.utilFunc.getShuffle(offerCheckOutTimes)[0],
          features: getFeatures(offerFeatures),
          description: '',
          photos: window.utilFunc.getShuffle(offerPhotos)
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

  window.data = {
    getOffers: getOffers
  };

})();
