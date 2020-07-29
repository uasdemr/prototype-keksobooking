'use strict';
//Генерация моковых данных
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.cloneNode(true);
var HALF_PIN = 25;
var FULL_PIN = 70;

var timeArr = ['12:00', '13:00', '14:00'];

/**
 * Функция возвращает целое число от min до max
 * @param {Integet} min
 * @param {Integer} max
 * @return {Integer}
 */
var getRandomInRange = function (min, max) {
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  return parseInt(Math.random() * (max - min) + min, 10);
};

var typeObj = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var featuresObj = {
  'wifi': 'Wi-Fi',
  'dishwasher': 'Посудомоечная машина',
  'parking': 'Парковка',
  'washer': 'Стиральная машина',
  'elevator': 'Лифт',
  'conditioner': 'Кондиционер'
};

var featuresKeys = Object.keys(featuresObj);
/**
 * Вспомогательная функция для генератора моковых данных.
 * Генерирует опции типа вайфай, душ, парковка и т.д., доступные при аренде жилища
 * @return {Array}
 */
var featuresGenerator = function () {
  var resArr = [];
  for (var i = 0; i <= getRandomInRange(1, featuresKeys.length - 1); i++) {
    resArr.push(featuresKeys[i]);
  }
  return resArr;
};

// var featuresGenerator2 = function () {
//   var resArr = [];
//   Object.keys(featuresObj);
//
// };

var typeKeys = Object.keys(typeObj);
/**
 * Вспомогательная функция для генератора моковых данных.
 * Генерирует фотографии
 * @return {Array}
 */
var photosGenerator = function () {
  var strArr = [];
  for (var i = 1; i <= getRandomInRange(1, 10); i++) {
    strArr.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return strArr;
};

/**
 * Вспомогательная функция для генератора моковых данных.
 * Генерирует типы сдаваемого жилья
 * @return {String}
 */
var typeGenerator = function () {
  return typeObj[Object.keys(typeObj)[getRandomInRange(0, typeKeys.length)]];
};

/**
 * Генератор моковых данных
 * @param {Integer} num
 * @return {Object}
 */
var mockGenerator = function (num) {
  var locX = getRandomInRange(HALF_PIN, mapPins.offsetWidth) - HALF_PIN;
  var locY = getRandomInRange(130, 630) - FULL_PIN;
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (num + 1) + '.png'
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': '' + locX + ', ' + locY,
      'price': getRandomInRange(0, 60000),
      'type': typeGenerator(),
      'rooms': getRandomInRange(1, 5),
      'guests': getRandomInRange(1, 10),
      'checkin': timeArr[getRandomInRange(0, timeArr.length - 1)],
      'checkout': timeArr[getRandomInRange(0, timeArr.length - 1)],
      'features': featuresGenerator(),
      'description': 'Строка с описанием',
      'photos': photosGenerator(),
    },
    'location': {
      'x': locX + 'px',
      'y': locY + 'px',
    },
  };
};

/**
 * Создает массив заполненный моковыми данными и возвращает его
 * @return {Array} data
 */
var dataCreator = function () {
  var data = [];
  for (var i = 0; i < 8; i++) {
    data.push(mockGenerator(i));
  }
  //console.log(data);
  console.log(data);
  return data;
};

map.classList.remove('map--faded');

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

var data = dataCreator();
/**
 * Функция заполняет карту пинами созданными из моковых данных
 */
var mapPinsFill = function () {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    fragment.append(pinCreator(item));
  });
  mapPins.append(fragment);
};

mapPinsFill();

/**
 * Функция возвращает строку опций
 */
var featuresToString = function (obj) {
  var featArr = obj.offer.features;
  var res = '';
  for (var i = 0; i < featArr.length; i++) {
    (i < featArr.length - 1) ? res += featuresObj[featArr[i]] + ', ' : res += featuresObj[featArr[i]] + '.';
  }
  return res;
};

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

// Карточка описания
var cardTemplate = document.querySelector('#card').content.cloneNode(true);
/**
* Функция создания карточки предложения
*/
var cadrCreator = function (obj) {
  var article = cardTemplate.querySelector('.map__card').cloneNode(true);
  var popupAvatar = article.querySelector('.popup__avatar');
  var popupClose = article.querySelector('.popup__close');
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
  popupTextTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' +obj.offer.checkout;
  popupFeatures.replaceWith(featuresCreator(obj, popupFeatures));
  popupDescription.textContent = obj.offer.description;
  popupPhotos.replaceWith(imgCreator(obj, popupPhotos));
  return article;
}
var mapFiltersContainer = document.querySelector('.map__filters-container');
for (var i = 0; i < data.length; i++) {
    mapFiltersContainer.before(cadrCreator(data[i]));
  }
