'use strict';

(function () {
  var App = window.App || {};

  var pin = document.querySelector('#pin').content.cloneNode(true);
  function Pin() {}
  /**
  * Функция создания нового пина
  * @param {Object} obj
  * @return {Object} mapPin
  */
  Pin.prototype.pinCreator = function (obj) {
    var mapPin = pin.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.style.left = obj.location.x;
    mapPin.style.top = obj.location.y;
    mapPinImg.src = obj.author.avatar;
    mapPinImg.alt = obj.offer.title;
    return mapPin;
  }

  App.Pin = Pin;
  window.App = App;

})(window);
