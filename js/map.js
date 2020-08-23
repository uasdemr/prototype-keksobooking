'use strict';

(function () {
  var App = window.App || {};

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.cloneNode(true);
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  /**
 * Функция создания нового пина
 * @param {Object} obj
 * @return {Object} mapPin
 */
  var pinCreator = function (obj) {
    var mapPin = pin.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.style.left = obj.location.x;
    mapPin.style.top = obj.location.y;
    mapPinImg.src = obj.author.avatar;
    mapPinImg.alt = obj.offer.title;
    return mapPin;
  };

  var mapPinsRender = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      fragment.append(pinCreator(item));
    });
    mapPins.append(fragment);
  };

  /**
 * Функция активирует карту
 */
  var mapEnabler = function () {
    map.classList.remove('map--faded');
  };

  var cardRemover = function () {
    var mapCard = map.querySelector('.map__card.popup');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var mapPinsClickHandler = function (evt) {
    Map.cardRender(evt);
  };

  var mapPinsKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      Map.cardRender(evt);
    }
  };

  var documentKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      cardRemover();
    }
  };

  // в будущем сюда придет модуль load со всеми методами?
  function Map(db, card) {
    // this.db = db;
    // this.data = db.getAll();
    Map.data = db.getAll();
    Map.card = card;
  }

  Map.getData = function (addressX, addressY) {
    var res;
    for (var i = 0; i < Map.data.length; i++) {
      if ((parseInt(Map.data[i].location.x, 10) === addressX && parseInt(Map.data[i].location.y, 10) === addressY)) {
        res = Map.data[i];
      }
    }
    return res;
  };

  /**
* Функция отрисовки карточки предложения
* @param {Object} evt
*/
  Map.cardRender = function (evt) {
    cardRemover();
    var btn = (evt.target.nodeName === 'IMG') ? evt.target.parentNode : evt.target;
    if (btn.tagName === 'BUTTON' && !btn.classList.contains('map__pin--main')) {
      var addressX = parseInt(btn.style.left, 10);
      var addressY = parseInt(btn.style.top, 10);
      var obj = (Map.getData(addressX, addressY));
      mapFiltersContainer.before(Map.card.makeCard(obj));

      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', cardRemover);

    }
  };

  Map.prototype.activate = function () {
    mapEnabler();
    // var data = this.db.getAll();
    mapPinsRender(Map.data);
    mapPins.addEventListener('click', mapPinsClickHandler);
    mapPins.addEventListener('keydown', mapPinsKeydownHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  App.Map = Map;
  window.App = App;
})(window);
