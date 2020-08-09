'use strict';
(function (window) {
  var App = window.App || {};

  var mapPins = document.querySelector('.map__pins');
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
    return parseInt(Math.random() * (max - min + 1) + min, 10);
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

  var getData = function () {
    var data = [];
    for (var i = 0; i < 8; i++) {
      data.push(mockGenerator(i));
    }
    return data;
  };

  function DataStore() {
    console.log('running the DataStore function');
    this.data = getData();
  }

  DataStore.prototype.getAll = function () {
    return this.data;
  };

  DataStore.prototype.getOne = function (addressX, addressY) {
    var res;
    for (var i = 0; i < this.data.length; i++) {
      if ((parseInt(this.data[i].location.x, 10) === addressX && parseInt(this.data[i].location.y, 10) === addressY)) {
        res = this.data[i];
      }
    }
    return res;
  };

  App.DataStore = DataStore;
  window.App = App;

})(window);
