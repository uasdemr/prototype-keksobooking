'use strict';

(function () {
  var App = window.App || {};

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  function Map(pin, datastore, card) {
    this.data = [];
    this.pin = pin;
    this.datastore = datastore;
    this.card = card;
  }

  Map.prototype.dataSetter = function (resp) {
    this.data = resp;
    console.log(this.data);
  };

  var cardRemover = function () {
    var mapCard = map.querySelector('.map__card.popup');
    if (mapCard) {
      mapCard.remove();
    }
  };

  Map.prototype.mapPinsFill = function () {
    var fragment = document.createDocumentFragment();
    this.data.forEach(function (item) {
      fragment.append(this.pin.pinCreator(item));
    }.bind(this));
    mapPins.append(fragment);
  };

  Map.prototype.cardRender = function (evt) {
    cardRemover();
    var btn = (evt.target.nodeName === 'IMG') ? evt.target.parentNode : evt.target;
    if (btn.tagName === 'BUTTON' && !btn.classList.contains('map__pin--main')) {
      var addressX = parseInt(btn.style.left, 10);
      var addressY = parseInt(btn.style.top, 10);
      var obj = (this.datastore(addressX, addressY));
      mapFiltersContainer.before(this.card.cadrCreator(obj));

      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', cardRemover);

    }
  };

  Map.prototype.mapPinsClickHandler = function (evt) {
    this.cardRender(evt);
  };
  Map.prototype.mapPinsKeydownHandler = function (evt) {
    if (evt.key === 'Enter') {
      this.cardRender(evt);
    }
  };

  Map.prototype.addMapHandler = function () {
    mapPins.addEventListener('click', this.mapPinsClickHandler.bind(this));
    mapPins.addEventListener('keydown', this.mapPinsKeydownHandler.bind(this));
  };

  Map.prototype.documentKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      cardRemover();
    }
  };
  Map.prototype.addDocumentKeyDownHandler = function () {
    document.addEventListener('keydown', this.documentKeydownHandler);
  };

  /**
 * Функция активирует карту
 */
  Map.prototype.mapEnabler = function () {
    map.classList.remove('map--faded');
  };

  App.Map = Map;
  window.App = App;

})(window);
