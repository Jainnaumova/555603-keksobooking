'use strict';


(function () {

  var housingType = document.querySelector('#housing-type');
  housingType.addEventListener('change', window.form.filterOffers);

  var housingPrice = document.querySelector('#housing-price');
  housingPrice.addEventListener('change', window.form.filterOffers);

  var housingRooms = document.querySelector('#housing-rooms');
  housingRooms.addEventListener('change', window.form.filterOffers);

  var housingGuests = document.querySelector('#housing-guests');
  housingGuests.addEventListener('change', window.form.filterOffers);

  var filterWifi = document.querySelector('#filter-wifi');
  filterWifi.addEventListener('change', window.form.filterOffers);

  var filterDishwasher = document.querySelector('#filter-dishwasher');
  filterDishwasher.addEventListener('change', window.form.filterOffers);

  var filterParking = document.querySelector('#filter-parking');
  filterParking.addEventListener('change', window.form.filterOffers);

  var filterWasher = document.querySelector('#filter-washer');
  filterWasher.addEventListener('change', window.form.filterOffers);

  var filterElevator = document.querySelector('#filter-elevator');
  filterElevator.addEventListener('change', window.form.filterOffers);

  var filterConditioner = document.querySelector('#filter-conditioner');
  filterConditioner.addEventListener('change', window.form.filterOffers);

})();
