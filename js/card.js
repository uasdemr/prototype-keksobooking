'use strict';
(function () {
  var App = window.App || {};

  /**
 * Функция возвращает доступные опции для карточки
 * @param {Object} obj
 * @param {Object} elementFeatures
 * @return {Object}
 */
  var featuresCreator = function (obj, elementFeatures) {
    var fragment = document.createDocumentFragment();
    var featuresArr = obj.offer.features;

    for (var i = 0; i < featuresArr.length; i++) {
      var str = '.popup__feature--';
      str += featuresArr[i];
      fragment.append(elementFeatures.querySelector(str).cloneNode(true));
    }
    var newPopupFeatures = document.createElement('ul');
    newPopupFeatures.classList.add('popup__features');
    newPopupFeatures.append(fragment);
    return newPopupFeatures;
  };

  /**
   * Функция создания заполеннных img
   * @param {Object} obj
   * @param {Object} elementPhotos
   * @return {Object}
   */
  var imgCreator = function (obj, elementPhotos) {
    var fragment = document.createDocumentFragment();
    var imgArr = obj.offer.photos;
    if (imgArr.length === 0) {
      return null;
    }
    imgArr.forEach(function (item) {
      var popupPhotosImg = elementPhotos.querySelector('img').cloneNode(true);
      popupPhotosImg.src = item;
      fragment.append(popupPhotosImg);
    });
    return fragment;
  };

  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  /**
  * Функция создания карточки предложения
  * @param {Object} obj
  * @return {Object}
  */
  var cadrCreator = function (obj) {
    var article = cardTemplate.querySelector('.map__card').cloneNode(true);
    var popupAvatar = article.querySelector('.popup__avatar');
    var popupTitle = article.querySelector('.popup__title');
    var popupTextAddress = article.querySelector('.popup__text--address');
    var popupTextPrice = article.querySelector('.popup__text--price');
    var popupType = article.querySelector('.popup__type');
    var popupTextCapacity = article.querySelector('.popup__text--capacity');
    var popupTextTime = article.querySelector('.popup__text--time');
    var popupFeatures = article.querySelector('.popup__features');
    var popupDescription = article.querySelector('.popup__description');
    var popupPhotos = article.querySelector('.popup__photos');

    popupAvatar.src = obj.author.avatar;
    popupTitle.textContent = obj.offer.title;
    popupTextAddress.textContent = obj.offer.address;
    popupTextPrice.textContent = obj.offer.price + '₽/ночь';
    popupType.textContent = obj.offer.type;
    popupTextCapacity.textContent = '' + obj.offer.rooms + ' комнат для ' + obj.offer.guests + ' гостей';
    popupTextTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    popupFeatures.replaceWith(featuresCreator(obj, popupFeatures));
    popupDescription.textContent = obj.offer.description;
    popupPhotos.replaceWith(imgCreator(obj, popupPhotos));
    return article;
  };

  function Card() {}

  Card.prototype.makeCard = function (obj) {
    return cadrCreator(obj);
  };

  App.Card = Card;
  window.App = App;
})(window);
