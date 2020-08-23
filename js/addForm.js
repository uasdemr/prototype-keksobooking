'use strict';

(function () {
  var App = window.App || {};

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = document.querySelector('#address');
  var fldset = adForm.querySelectorAll('fieldset');
  var adFormType = document.querySelector('#type');
  var adFormPrice = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  var priceForTypeObj = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };


  var adFormTypeChangeHandler = function (evt) {
    adFormPrice.placeholder = priceForTypeObj[evt.target.value];
    adFormPrice.min = priceForTypeObj[evt.target.value];
  };
  adFormType.addEventListener('change', adFormTypeChangeHandler);
  var myEventType = new Event('change');
  adFormType.dispatchEvent(myEventType);

  var adFormResetHandler = function () {
    adFormPrice.placeholder = '1000';
    adFormPrice.min = '1000';
  };
  adForm.addEventListener('reset', adFormResetHandler);

  var timeinTimeoutSynchronizer = function (elem) {
    if (elem.id === 'timein') {
      timeout.value = elem.value;
    } else if (elem.id === 'timeout') {
      timein.value = elem.value;
    }
  };
  var timeinChangeHandler = function () {
    timeinTimeoutSynchronizer(timein);
  };
  var timeoutChangeHandler = function () {
    timeinTimeoutSynchronizer(timeout);
  };

  timein.addEventListener('change', timeinChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);

  /**
   * Функция активирует форму
   */
  var adFormEnabler = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  /**
   * Функция активирует все элементы формы с классом .ad-form
   */
  var adFormElementsEnabler = function () {
    fldset.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  /**
 * Функция деактивирует все элементы формы с классом .ad-form
 */
  var adFormElementsDisabler = function () {
    fldset.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
  };


  var addressEnablerHandler = function () {
    adFormAddress.removeAttribute('disabled');
  };

  adForm.addEventListener('submit', addressEnablerHandler);

  var roomNumber = document.querySelector('#room_number');

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
  roomNumber.addEventListener('click', roomNumberToCapacitySyncHandler);
  var myEvent = new Event('click');
  roomNumber.dispatchEvent(myEvent);

  function AddForm() { }

  AddForm.prototype.activate = function () {
    adFormEnabler();
    adFormElementsEnabler();
  };

  AddForm.prototype.deactivate = function () {
    adFormElementsDisabler();
  };

  App.AddForm = AddForm;
  window.App = App;
})(window);
