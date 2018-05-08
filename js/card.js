'use strict';

(function () {

  var map = document.querySelector('.map');
  var TypesDictionary = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Лачуга'
  };

  function createPinOffer(evt) {
    if (window.utilFunc.checkIfCardIsOpen()) {
      window.utilKeyCode.buttonClickHandler();
    }

    var singleOffer = window.offers.filter(function (offer) {
      return offer.id === +evt.target.id;
    })[0];
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var mapCardTemplate = document.querySelector('#card-template').content.querySelector('.map__card');

    var newMapCard = mapCardTemplate.cloneNode(true);
    newMapCard.querySelector('.popup__avatar').src = singleOffer.author.avatar;
    newMapCard.querySelector('.popup__title').textContent = singleOffer.offer.title;
    newMapCard.querySelector('.popup__text--address').textContent = singleOffer.offer.address;
    newMapCard.querySelector('.popup__text--price').textContent = singleOffer.offer.price + ' Р/ночь';
    newMapCard.querySelector('.popup__type').textContent = TypesDictionary[singleOffer.offer.type];
    newMapCard.querySelector('.popup__text--capacity').textContent = singleOffer.offer.rooms + ' комната для ' + singleOffer.offer.guests + ' гостей';
    newMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + singleOffer.offer.checkin + ' ,' + ' выезд до ' + singleOffer.offer.checkout;
    newMapCard.querySelector('.popup__description').textContent = singleOffer.offer.description;

    function removeChildren(list) {
      while (list.querySelector('li')) {
        var li = list.querySelector('li');
        list.removeChild(li);
      }
      return list;
    }

    var list = removeChildren(newMapCard.querySelector('.popup__features'));
    var featureFragment = document.createDocumentFragment();
    singleOffer.offer.features.forEach(function (el) {
      var element = document.createElement('li');
      element.className = 'popup__feature';
      element.classList.add('popup__feature--' + el);
      element.textContent = el;
      featureFragment.appendChild(element);
    });
    list.appendChild(featureFragment);

    var photos = newMapCard.querySelector('.popup__photos');
    var photoTemplate = photos.querySelector('.popup__photo');
    var photoFragment = document.createDocumentFragment();
    singleOffer.offer.photos.forEach(function (el) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = el;
      photoFragment.appendChild(photo);
    });
    newMapCard.querySelector('.popup__close').addEventListener('click', window.utilKeyCode.buttonClickHandler);
    photos.removeChild(photoTemplate);
    photos.appendChild(photoFragment);
    window.addEventListener('keydown', window.utilKeyCode.windowEscKeyDownHandler);
    map.insertBefore(newMapCard, mapFiltersContainer);
  }

  window.card = {
    createPinOffer: createPinOffer
  };

})();
