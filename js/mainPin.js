'use strict';
(function () {
  var App = window.App || {};

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var HALF_MAIN_PIN = 32;
  var FULL_MAIN_PIN = 65;
  var BOTTOM_POINT_MAIN_PIN = 22;
  var adFormAddress = document.querySelector('#address');

  /**
 * Обработчик нажатия на кнопку мыши
 * @param {Object} evt
 */
  var mainPinMousedownHandler = function (evt) {
    if (evt.which === 1) {
      // mapEnabler();
      // adFormEnabler();
      // adFormElementsEnabler();
      // filtersFormElementsEnabler();
      // mapPinsFill();
      // mainPinCoords();
      // mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    }
  };

  /**
   * Обработчик нажатия Enter на кливиатуре
   * @param {Object} evt
   */
  var mainPinKeydownHandler = function (evt) {
    if (evt.code === 'Enter') {
      // mapEnabler();
      // adFormEnabler();
      // adFormElementsEnabler();
      // filtersFormElementsEnabler();
      // mapPinsFill();
      // mainPinCoords();
      // mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    } else {
      // mainPin.addEventListener('keydown', mainPinKeydownHandler, { once: true });
    }
  };
  mainPin.addEventListener('mousedown', mainPinMousedownHandler, { once: true });
  mainPin.addEventListener('keydown', mainPinKeydownHandler, { once: true });

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
  mainPinCoords();

  function MainPin() { }

  MainPin.prototype.getCoords = function () {
    mainPinCoords();
  };

  /**
* Обработчик нажатия на кнопку мыши, выподняет колбэк при условии нажатия
* левой кнопки мыши
* @param {Object} cb
*/
  MainPin.prototype.addClickHandler = function (cb) {
    mainPin.addEventListener('click', function (evt) {
      var mapFadded = document.querySelector('.map--faded');
      if (evt.which === 1 && mapFadded) {
        cb();
      }
    }, { 'once': true });
  };

  /**
  * Обработчик нажатия Enter на кливиатуре, выподняет колбэк
  * @param {Object} cb
  */
  MainPin.prototype.addKeydownHandler = function (cb) {

    mainPin.addEventListener('keydown', function (evt) {
      var mapFadded = document.querySelector('.map--faded');
      if (evt.code === 'Enter' && mapFadded) {
        cb();
      }
    }, { 'once': true });
  };

  App.MainPin = MainPin;
  window.App = App;
})(window);
