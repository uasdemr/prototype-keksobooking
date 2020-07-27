'use strict';
var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var pin = document.querySelector('#pin').content.cloneNode(true);
var HALF_PIN = 25;
var FULL_PIN = 70;

var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var timeArr = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/**
 * Функция возвращает целое число от min до max
 * @param {Integet} min
 * @param {Integer} max
 * @return {Integer}
 */
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Вспомогательная функция для генератора моковых данных.
 * Генерирует опции типа вайфай, душ, парковка и т.д., доступные при аренде жилища
 * @return {Array}
 */
var featuresGenerator = function () {
  var resArr = [];
  for (var i = 0; i < getRandomInRange(1, featuresArr.length - 1); i++) {
    resArr.push(featuresArr[i]);
  }
  return resArr;
};

/**
 * Вспомогательная функция для генератора моковых данных.
 * Генерирует фотографии
 * @return {Array}
 */
var photosGenerator = function () {
  var strArr = [];
  for (var i = 1; i < getRandomInRange(1, 10); i++) {
    strArr.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return strArr;
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
      'type': typeArr[getRandomInRange(0, typeArr.length - 1)],
      'rooms': getRandomInRange(1, 5),
      'guests': getRandomInRange(1, 10),
      'checkin': timeArr[getRandomInRange(0, timeArr.length - 1)],
      'checkout': timeArr[getRandomInRange(0, timeArr.length - 1)],
      'features': featuresGenerator(),
      'description': 'Строка с описанием',
      'photos': photosGenerator()
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

/**
 * Функция заполняет карту пинами созданными из моковых данных
 */
var mapPinsFill = function () {
  var data = dataCreator();
  data.forEach(function (item) {
    mapPins.append(pinCreator(item));
  });
};

mapPinsFill();
