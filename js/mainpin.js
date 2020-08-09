'use strict';
(function () {
  var App = window.App || {};

  function MainPin(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.HALF_MAIN_PIN = 32;
    this.FULL_MAIN_PIN = 65;
    this.BOTTOM_POINT_MAIN_PIN = 22;
    this.map = document.querySelector('.map');
    this.adFormAddress = document.querySelector('#address');
    this.mainPin = document.querySelector(selector);

    if (!this.mainPin) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  MainPin.prototype.coordinates = function () {
    var str = '';
    if (!this.map.classList.contains('map--faded')) {
      str = (this.mainPin.offsetLeft + this.HALF_MAIN_PIN) + ', ' + (this.mainPin.offsetTop + this.FULL_MAIN_PIN + this.BOTTOM_POINT_MAIN_PIN);
      this.adFormAddress.placeholder = str;
      this.adFormAddress.value = str;
    } else {
      str = (this.mainPin.offsetLeft + this.HALF_MAIN_PIN) + ', ' + (this.mainPin.offsetTop + this.HALF_MAIN_PIN);
      this.adFormAddress.placeholder = str;
      this.adFormAddress.value = str;
    }
    this.adFormAddress.disabled = true;
  };

  /**
  * Обработчик нажатия на кнопку мыши, выподняет колбэк при условии нажатия
  * левой кнопки мыши
  * @param {Object} cb
  */
  MainPin.prototype.addClickHandler = function (cb) {
    console.log('Setting click handler for mainPin');
    this.mainPin.addEventListener('click', function (evt) {
      var mapFadded = document.querySelector('.map--faded');
      if (evt.which === 1 && mapFadded) {
        cb();
      }
    }, {'once': true});
  };

  /**
  * Обработчик нажатия Enter на кливиатуре, выподняет колбэк
  * @param {Object} cb
  */
  MainPin.prototype.addKeydownHandler = function (cb) {
    console.log('Setting keydown handler for mainPin');

    this.mainPin.addEventListener('keydown', function (evt) {
      var mapFadded = document.querySelector('.map--faded');
      if (evt.code === 'Enter' && mapFadded) {
        cb();
      }
    }, {'once': true});
  };

  App.MainPin = MainPin;
  window.App = App;
})(window);
