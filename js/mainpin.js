'use strict';
(function () {
  var App = window.App || {};

  function MainPin(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.mainPin = document.querySelector(selector);

    if (!this.mainPin) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  var FULL_MAIN_PIN = 65;
  var BOTTOM_POINT_MAIN_PIN = 22;
  var HALF_MAIN_PIN = 32;
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var HALF_MAP_PIN_MAIN_WIDTH = 32;
  var HALF_MAP_MAIN_HEIGHT = 32;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var startCoords = {};
  var newLoc = {};
  var shift = {};
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapWidth = parseInt(map.offsetWidth, 10);
  var adFormAddress = document.querySelector('#address');

  var coordinates = function () {
    var str = '';
    if (!map.classList.contains('map--faded')) {
      str = (mainPin.offsetLeft + HALF_MAIN_PIN) + ', ' + (mainPin.offsetTop - FULL_MAIN_PIN - BOTTOM_POINT_MAIN_PIN);
      adFormAddress.placeholder = str;
      adFormAddress.value = str;
    } else {
      str = (mainPin.offsetLeft + HALF_MAIN_PIN) + ', ' + (mainPin.offsetTop - HALF_MAIN_PIN);
      adFormAddress.placeholder = str;
      adFormAddress.value = str;
    }
    adFormAddress.disabled = true;
    return str;
  };

  MainPin.prototype.getCoordinates = function () {
    return coordinates();
  };

  /**
  * Обработчик нажатия на кнопку мыши, выподняет колбэк при условии нажатия
  * левой кнопки мыши
  * @param {Object} cb
  */
  MainPin.prototype.addClickHandler = function (cb) {
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

    this.mainPin.addEventListener('keydown', function (evt) {
      var mapFadded = document.querySelector('.map--faded');
      if (evt.code === 'Enter' && mapFadded) {
        cb();
      }
    }, {'once': true});
  };

  var mainPinMousedownHandler = function (evt) {
    if (evt.button === 0) {

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      document.body.addEventListener('mousemove', mainPinMousemoveHandler);
      document.body.addEventListener('mouseup', mainPinMouseupHandler);
    }
  };

  var mainPinMousemoveHandler = function (evt) {
    shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    newLoc.x = mainPin.offsetLeft - shift.x;
    newLoc.y = mainPin.offsetTop - shift.y;

    if (newLoc.x >= -HALF_MAP_PIN_MAIN_WIDTH && newLoc.x <= mapWidth - HALF_MAP_PIN_MAIN_WIDTH) {
      mainPin.style.left = newLoc.x + 'px';
    }

    if (newLoc.y >= TOP_LIMIT - HALF_MAP_MAIN_HEIGHT && newLoc.y + MAP_PIN_MAIN_HEIGHT <= BOTTOM_LIMIT + MAP_PIN_MAIN_HEIGHT) {
      mainPin.style.top = newLoc.y + 'px';
    }
  };

  var mainPinMouseupHandler = function () {
    coordinates();
    mainPinRemoveHandler();
  };

  var mainPinRemoveHandler = function () {
    document.body.removeEventListener('mousemove', mainPinMousemoveHandler);
    document.body.removeEventListener('mouseup', mainPinMouseupHandler);
  };

  MainPin.prototype.addMousedownHandler = function () {
    this.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  };

  App.MainPin = MainPin;
  window.App = App;
})(window);
