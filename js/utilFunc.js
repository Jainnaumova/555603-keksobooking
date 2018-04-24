'use strict';

(function () {
  var formFieldsets = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');

  window.utilFunc = {
    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getShuffle: function (array) {
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
    },
    checkIfCardIsOpen: function () {
      var popup = document.querySelector('.popup');
      return popup ? true : false;
    },
    getActiveForm: function () {
      var activeForm = document.querySelector('.ad-form--disabled');
      activeForm.classList.remove('ad-form--disabled');
    },
    getActiveFieldsets: function () {
      for (var i = 0; i < formFieldsets.length; i++) {
        formFieldsets[i].removeAttribute('disabled');
      }
    },
    setInActiveFieldsets: function () {
      for (var i = formFieldsets.length; i--;) {
        formFieldsets[i].setAttribute('disabled', true);
      }
    },
    getActiveMap: function () {
      map.classList.remove('map--faded');
    }
  };
})();
