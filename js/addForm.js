'use strict';

(function () {
  var App = window.App || {};

  var addForm = document.querySelector('.ad-form');
  var addFormAddress = document.querySelector('#address');
  var fldset = addForm.querySelectorAll('fieldset');
  var addFormType = document.querySelector('#type');
  var addFormPrice = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var main = document.querySelector('main');

  var priceForTypeObj = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var priceDefaultSetter = function () {
    var price = document.querySelector('#price');
    price.placeholder = '1000';
    price.min = '1000';
    price.max = '1000000';
  };

  var addFormTypeChangeHandler = function (evt) {
    addFormPrice.placeholder = priceForTypeObj[evt.target.value];
    addFormPrice.min = priceForTypeObj[evt.target.value];
    addFormPrice.value = '';
  };
  addFormType.addEventListener('change', addFormTypeChangeHandler);


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
  var addFormEnabler = function () {
    addForm.classList.remove('ad-form--disabled');
  };

  /**
   * Функция активирует все элементы формы с классом .ad-form
   */
  var addFormElementsEnabler = function () {
    fldset.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  /**
 * Функция деактивирует все элементы формы с классом .ad-form
 */
  var addFormElementsDisabler = function () {
    fldset.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
  };

  /**
   * Устанавливает Количество мест к значению по умолчанию
   */
  var capacityDefaultSetter = function () {
    var capacity = document.querySelector('#capacity');
    var select = document.createElement('select');
    select.id = 'capacity';
    select.name = 'capacity';
    var opt = new Option();
    opt.value = 1;
    opt.text = 'для ' + 1 + ' гостей';
    select.add(opt);
    capacity.replaceWith(select);
  };

  var documentKeydownhandler = function (evt) {
    var msg = main.querySelector('.success');
    if (!(evt.code === 'Escape' && msg)) {
      return;
    }
    msg.remove();
    documentRemoveListeners();
  };

  var documentClickhandler = function (evt) {
    var msg = main.querySelector('.success');
    if (!(evt.which === 1 && msg)) {
      return;
    }
    msg.remove();
    documentRemoveListeners();
  };

  /**
   * Показывает сообщение об успешной отправке
   */
  var successShow = function () {
    var successMsgTemmplate = document.querySelector('#success').content.cloneNode(true);
    main = document.querySelector('main');
    var successMsg = successMsgTemmplate.querySelector('.success');
    main.append(successMsg);
    document.querySelector('.map__pin--main').focus();
    document.addEventListener('keydown', documentKeydownhandler);
    document.addEventListener('click', documentClickhandler);
  };

  var documentRemoveListeners = function () {
    document.removeEventListener('keydown', documentKeydownhandler);
    document.removeEventListener('click', documentClickhandler);
  };

  /**
   * Обработчик отправки формы
   * @param {Object} evt
   */
  AddForm.addFormSubmitHandler = function (evt) {
    evt.preventDefault();
    addFormAddress.removeAttribute('disabled');
    var form = new FormData(addForm);
    addFormAddress.setAttribute('disabled', 'true');
    AddForm.upload.sendData(form, function () {
      addFormElementsDisabler();
      AddForm.map.deactivate();
      capacityDefaultSetter();
      successShow();
      addForm.reset();
    });
  };

  /**
   * Обработчик сброса формы
   */
  var addFormResetHandler = function () {
    addFormPrice.placeholder = '1000';
    addFormPrice.min = '1000';
    addFormPrice.value = '';
  };
  addForm.addEventListener('submit', AddForm.addFormSubmitHandler);
  addForm.addEventListener('reset', addFormResetHandler);

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

  function AddForm(upload, map) {
    AddForm.upload = upload;
    AddForm.map = map;
  }

  AddForm.prototype.activate = function () {
    addFormEnabler();
    addFormElementsEnabler();
    priceDefaultSetter();
  };

  AddForm.prototype.deactivate = function () {
    addFormElementsDisabler();
  };

  App.AddForm = AddForm;
  window.App = App;
})(window);
