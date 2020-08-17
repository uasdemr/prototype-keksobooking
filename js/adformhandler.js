'use strict';
(function () {
  var App = window.App || {};

  function AdformHandler(selector, map) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.map = map;

    this.formElement = document.querySelector(selector);
    if (!this.formElement) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    this.fldset = this.formElement.querySelectorAll('fieldset');
    this.adFormType = this.formElement.querySelector('#type');
    this.priceForTypeObj = {
      'bungalo': '0',
      'flat': '1000',
      'house': '5000',
      'palace': '10000'
    };
    this.timein = document.querySelector('#timein');
    this.timeout = document.querySelector('#timeout');
    this.address = this.formElement.querySelector('#address');
  }
  var roomNumber = document.querySelector('#room_number');
  var adFormPrice = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  // Написать функцию для сброса формы к начальным значениям
  AdformHandler.prototype.formDisabler = function () {
    this.elementsDisabler();
    this.map.mapInit();
  };

  AdformHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      this.address.removeAttribute('disabled');
      var form = new FormData(this.formElement);
      this.address.disabled = 'true';
      // Дописать функционал, который выполнится после отправки формы вместо
      // console.log или после fn - подумать
      fn(form, console.log);
      this.formDisabler();
    }.bind(this));
  };

  AdformHandler.prototype.addResetHandler = function () {
    console.log('Setting reset handler for form');
    this.formElement.addEventListener('reset', function (evt) {
      // evt.preventDefault();
      adFormPriceDefaultSetter();
      roomsNumberDefaultSetter();
    });
  };

  /**
  * Функция деактивирует все элементы формы с классом .ad-form
  */
  AdformHandler.prototype.elementsDisabler = function () {
    this.fldset.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
  };

  /**
  * Функция активирует форму
  */
  AdformHandler.prototype.adFormEnabler = function () {
    this.formElement.classList.remove('ad-form--disabled');
  };

  /**
 * Функция активирует все элементы формы с классом .ad-form
 */
  AdformHandler.prototype.adFormElementsEnabler = function () {
    this.fldset.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  AdformHandler.prototype.addressEnabler = function () {
    this.formElement.querySelector('#address').parentNode.removeAttribute('disabled');
  };

  AdformHandler.prototype.addressSetter = function (str) {
    this.address.placeholder = str;
    this.address.value = str;
  };

  // var roomNumber = document.querySelector('#room_number');
  // подпишемся на событие при инициализации приложения.
  // При заходе на страницу например
  var roomNumberToCapacitySyncHandler = function (evt) {
    var capacity = document.querySelector('#capacity');
    var select = document.createElement('select');
    var num = parseInt(evt.target.value, 10);
    select.id = 'capacity';
    select.name = 'capacity';
    var opt;
    if (num === 100) {
      opt = new Option();
      opt.value = 0;
      opt.text = 'не для гостей';
      select.add(opt);
      capacity.replaceWith(select);
    }
    if (num <= 3 && num >= 1) {
      for (var i = num; i >= 1; i--) {
        opt = new Option();
        opt.value = i;
        opt.text = 'для ' + i + ' гостей';
        if (i === 1) {
          opt.text = 'для ' + i + ' гостя';
        }
        select.add(opt);
        capacity.replaceWith(select);
      }
    }
  };

  var roomsNumberDefaultSetter = function () {
    var capacity = document.querySelector('#capacity');
    var select = document.createElement('select');
    select.id = 'capacity';
    select.name = 'capacity';

    var opt = new Option();
    opt.value = 1;
    opt.text = 'для 1 гостя';
    select.append(opt);
    capacity.replaceWith(select);
  };

  var adFormPriceDefaultSetter = function () {
    adFormPrice.placeholder = '1000';
    adFormPrice.min = '1000';
  };

  AdformHandler.prototype.addRoomNumberChangeHandler = function () {
    roomNumber.addEventListener('click', roomNumberToCapacitySyncHandler);
    var myEvent = new Event('click');
    roomNumber.dispatchEvent(myEvent);
  };

  var priceForTypeObj = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var adFormTypeChangeHandler = function (evt) {
    adFormPrice.placeholder = priceForTypeObj[evt.target.value];
    adFormPrice.min = priceForTypeObj[evt.target.value];
    adFormPrice.value = '';
  };

  AdformHandler.prototype.addAdFormTypeChangeHandler = function () {
    this.adFormType.addEventListener('change', adFormTypeChangeHandler);
    var myEvent = new Event('change');
    this.adFormType.dispatchEvent(myEvent);
  };
  var timeinTimeoutSynchronizer = function (evt) {
    if (evt.target.id === 'timein') {
      timeout.value = evt.target.value;
    } else if (evt.target.id === 'timeout') {
      timein.value = evt.target.value;
    }
  };

  AdformHandler.prototype.addTimeinTimeoutHandler = function () {
    timein.addEventListener('change', timeinTimeoutSynchronizer);
    timeout.addEventListener('change', timeinTimeoutSynchronizer);
  };

  App.AdformHandler = AdformHandler;
  window.App = App;
})(window);
