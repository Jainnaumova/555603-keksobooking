'use strict';


(function () {
  var pins = document.querySelector('.map__pins');
  // var offers = window.data.getOffers();
  window.pins = {
    createPins: function (offersList) {
      var pinTemplate = document.querySelector('.map__pin');
      var pinFragment = document.createDocumentFragment();
      for (var i = 0; i < offersList.length; i++) {
        var template = pinTemplate.cloneNode(true);
        template.style = 'left: ' + (offersList[i].location.x - 25) + 'px; top: ' + (offersList[i].location.y - 70) + 'px';
        template.querySelector('img').src = offersList[i].author.avatar;
        template.querySelector('img').setAttribute('id', i);
        template.addEventListener('click', function () {
          window.card.createMapCard(event);
        }, false);
        pinFragment.appendChild(template);
      }
      pins.appendChild(pinFragment);
    },
    deletePins: function () {
      var buttons = pins.querySelectorAll('button');
      for (var i = 1; i < buttons.length; i++) {
        pins.removeChild(buttons[i]);
      }
    }
  };
})();
