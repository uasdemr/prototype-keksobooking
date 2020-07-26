'use strict';
var mapPins = document.querySelector('.map__pins');

var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var timeArr = ['12:00', '13:00', '14:00'];
var featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

/**
 * Функция возвращает целое число от min до max
 * @param {Integet} min
 * @param {Integer} max
 */
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var featuresGenerator = function () {
  var resArr = [];
  for (var i = 0; i < getRandomInRange(1, featuresArr.length - 1); i++) {
    resArr.push(featuresArr[i]);
  }
  return resArr;
};

var photosGenerator = function () {
  var strArr = [];
  for (var i = 1; i < getRandomInRange(1, 10); i++) {
    strArr.push("http://o0.github.io/assets/images/tokyo/hotel" + i + ".jpg");
  }
  return strArr;
};

var mockGenerator = function (num) {
  return {
    "author": {
      "avatar": "img/avatars/user0" + num + ".png"
    },
    "offer": {
      "title": "Заголовок предложения",
      "address": "" + getRandomInRange(0, mapPins.offsetWidth) + ", " + getRandomInRange(130, 630),
      "price": getRandomInRange(0, 60000),
      "type": typeArr[getRandomInRange(0, typeArr.length - 1)],
      "rooms": getRandomInRange(1, 5),
      "guests": getRandomInRange(1, 10),
      "checkin": timeArr[getRandomInRange(0, timeArr.length - 1)],
      "checkout": timeArr[getRandomInRange(0, timeArr.length - 1)],
      "features": featuresGenerator(),
      "description": "Строка с описанием" ,
      "photos": photosGenerator()
    },
    "location": {
      "x": getRandomInRange(0, mapPins.offsetWidth),
      "y": getRandomInRange(130, 630),
    },
  };
};
//
// var data = [];
// for (var i = 0; i < 8; i++) {
//   data.push(mockGenerator(i));
// }
