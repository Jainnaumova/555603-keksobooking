'use strict';


(function () {

  var MIN_HIGH_PRICE = 50000;
  var MAX_MIN_PRICE = 10000;
  var Price = {
    OPTION_ANY: 'any',
    LOW_PRICE: 'low',
    MIDDLE_PRICE: 'middle',
    HIGH_PRICE: 'high'
  };
  var IndexNumber = {
    INDEX_0: 0,
    INDEX_1: 1,
    INDEX_2: 2,
    INDEX_3: 3
  };

  function checkPrice(price, priceType) {
    switch (priceType) {
      case Price.LOW_PRICE:
        if (price < MAX_MIN_PRICE) {
          return true;
        }
        break;
      case Price.MIDDLE_PRICE:
        if (price >= MAX_MIN_PRICE && price < MIN_HIGH_PRICE) {
          return true;
        }
        break;
      case Price.HIGH_PRICE:
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
      (filterSelectors[IndexNumber.INDEX_0].value === Price.OPTION_ANY ? singleOffer : singleOffer.offer.type === filterSelectors[IndexNumber.INDEX_0].value) &&
      (filterSelectors[IndexNumber.INDEX_1].value === Price.OPTION_ANY ? singleOffer : checkPrice(singleOffer.offer.price, filterSelectors[IndexNumber.INDEX_1].value)) &&
      (filterSelectors[IndexNumber.INDEX_2].value === Price.OPTION_ANY ? singleOffer : singleOffer.offer.rooms === +filterSelectors[IndexNumber.INDEX_2].value) &&
      (filterSelectors[IndexNumber.INDEX_3].value === Price.OPTION_ANY ? singleOffer : singleOffer.offer.guests === +filterSelectors[IndexNumber.INDEX_3].value) &&
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
