'use strict';


(function () {
  var map = document.querySelector('.map');
  var typesDictionary = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Лачуга'
  };

  function createMapCard(evt) {
    if (window.utilFunc.checkIfCardIsOpen()) {
      window.utilKeyCode.buttonClickHandler();
    }
    var singleOffer = window.data.getOffers()[evt.target.id];
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
    function removeChildren(list) {
      while (list.querySelector('li')) {
        var li = list.querySelector('li');
        list.removeChild(li);
      }
      return list;
    }

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
    newMapCard.querySelector('.popup__close').addEventListener('click', window.utilKeyCode.buttonClickHandler);
    photos.removeChild(photoTemplate);
    photos.appendChild(fragment);
    window.addEventListener('keydown', window.utilKeyCode.windowEscKeyDownHandler);
    map.insertBefore(newMapCard, mapFiltersContainer);
  }

  window.card = {
    createMapCard: createMapCard
  };

})();
