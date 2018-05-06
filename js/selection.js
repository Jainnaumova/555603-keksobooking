'use strict';


(function () {

  var MIN_HIGH_PRICE = 50000;
  var MAX_MIN_PRICE = 10000;
  var OPTION_ANY = 'any';
  function checkPrice(price, priceType) {
    switch (priceType) {
      case 'low':
        if (price < MAX_MIN_PRICE) {
          return true;
        }
        break;
      case 'middle':
        if (price >= MAX_MIN_PRICE && price < MIN_HIGH_PRICE) {
          return true;
        }
        break;
      case 'high':
        if (price >= MIN_HIGH_PRICE) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  function filterSingleOffer(singleOffer) {
    if (window.utilFunc.checkIfCardIsOpen()) {
      window.utilKeyCode.buttonClickHandler();
    }
    var filterSelectors = document.querySelector('.map__filters');
    return (
      (filterSelectors[0].value === OPTION_ANY ? singleOffer : singleOffer.offer.type === filterSelectors[0].value) &&
      (filterSelectors[1].value === OPTION_ANY ? singleOffer : checkPrice(singleOffer.offer.price, filterSelectors[1].value)) &&
      (filterSelectors[2].value === OPTION_ANY ? singleOffer : singleOffer.offer.rooms === +filterSelectors[2].value) &&
      (filterSelectors[3].value === OPTION_ANY ? singleOffer : singleOffer.offer.guests === +filterSelectors[3].value) &&
      filterCheckboxes(singleOffer)
    );
  }

  function filterCheckboxes(singleOffer) {
    var featureCheckBoxes = document.querySelector('.map__filters').querySelectorAll('input[type=checkbox]:checked');
    var filtered = true;
    if (featureCheckBoxes.length) {
      featureCheckBoxes.forEach(function (chBox) {
        if (!singleOffer.offer.features.includes(chBox.value)) {
          filtered = false;
        }
      });
    }
    return filtered;
  }

  function filterOffers() {
    var filteredOffers = window.offers.filter(filterSingleOffer);
    window.form.deletePins();
    window.form.createPins(filteredOffers);
  }

  window.selection = {
    filterOffers: filterOffers
  };

})();
