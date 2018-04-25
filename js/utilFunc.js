'use strict';

(function () {
  var formFieldsets = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

  function checkIfCardIsOpen() {
    var popup = document.querySelector('.popup');
    return popup ? true : false;
  }

  function setActiveForm() {
    var activeForm = document.querySelector('.ad-form--disabled');
    if (activeForm) {
      activeForm.classList.remove('ad-form--disabled');
    }
  }

  function setActiveFieldsets() {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
  }

  function setInActiveFieldsets() {
    for (var i = formFieldsets.length; i--;) {
      formFieldsets[i].setAttribute('disabled', true);
    }
  }

  function setActiveMap() {
    map.classList.remove('map--faded');
  }

  window.utilFunc = {
    getRandomInteger: getRandomInteger,
    getShuffle: getShuffle,
    checkIfCardIsOpen: checkIfCardIsOpen,
    setActiveForm: setActiveForm,
    setActiveFieldsets: setActiveFieldsets,
    setInActiveFieldsets: setInActiveFieldsets,
    setActiveMap: setActiveMap
  };

})();
