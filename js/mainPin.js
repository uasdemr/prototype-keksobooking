'use strict';
(function () {
  var App = window.App || {};

  var FULL_MAIN_PIN = 65;
  var BOTTOM_POINT_MAIN_PIN = 22;
  var HALF_MAIN_PIN = 32;
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var HALF_MAP_PIN_MAIN_WIDTH = 32;
  var HALF_MAP_MAIN_HEIGHT = 32;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var adForm = document.querySelector('.ad-form');
  var startCoords = {};
  var newLoc = {};
  var shift = {};
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapWidth = parseInt(map.offsetWidth, 10);
  var adFormAddress = document.querySelector('#address');

  var addressDisablerEnablerHandler = function () {
    adFormAddress.removeAttribute('disabled');
  };
  adForm.addEventListener('submit', addressDisablerEnablerHandler);

  /**
   * Функция определения координат драгПина
   */
  var mainPinCoords = function () {
    var str = '';
    if (!map.classList.contains('map--faded')) {
      str = (mainPin.offsetLeft + HALF_MAIN_PIN) + ', ' + (mainPin.offsetTop + FULL_MAIN_PIN + BOTTOM_POINT_MAIN_PIN);
      adFormAddress.placeholder = str;
      adFormAddress.value = str;
    } else {
      str = (mainPin.offsetLeft + HALF_MAIN_PIN) + ', ' + (mainPin.offsetTop + HALF_MAIN_PIN);
      adFormAddress.placeholder = str;
      adFormAddress.value = str;
    }
    adFormAddress.disabled = true;
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
    mainPinCoords();
    mainPinRemoveHandler();
  };

  var mainPinRemoveHandler = function () {
    document.body.removeEventListener('mousemove', mainPinMousemoveHandler);
    document.body.removeEventListener('mouseup', mainPinMouseupHandler);
  };

  /**
* Обработчик нажатия на кнопку мыши, выподняет колбэк при условии нажатия
* левой кнопки мыши
* @param {Object} cb
*/
  var addClickHandler = function (cb) {
    mainPin.addEventListener('click', function (evt) {
      var mapFadded = document.querySelector('.map--faded');
      if (evt.which === 1 && mapFadded) {
        cb();
      }
    });
  };

  /**
  * Обработчик нажатия Enter на кливиатуре, выподняет колбэк
  * @param {Object} cb
  */
  var addKeydownHandler = function (cb) {

    mainPin.addEventListener('keydown', function (evt) {
      var mapFadded = document.querySelector('.map--faded');
      if (evt.code === 'Enter' && mapFadded) {
        cb();
      }
    });
  };

  var addMousedownHandler = function () {
    mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  };

  function MainPin() { }

  MainPin.prototype.initMainPin = function (cb) {
    mainPinCoords();
    addClickHandler(cb);
    addKeydownHandler(cb);
    addMousedownHandler();
  };

  App.MainPin = MainPin;
  window.App = App;
})(window);
