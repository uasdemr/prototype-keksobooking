'use strict';
(function () {
  var App = window.App || {};

  function Upload() {
    this.URL_TO_DOWNLOAD_DATA = 'https://javascript.pages.academy/keksobooking';
    this.StatusCode = {
      OK: 200,
      BAD_REQUEST: 400
    };
  }

  var onError = function (message) {
    throw new Error(message);
  };

  var bodyRemoveListener = function () {
    document.body.removeEventListener('click', errorButtonClickRemoveHandler);
    document.body.removeEventListener('keydown', bodyErrorButtonKeyDownRemoveHandler);
    document.body.removeEventListener('keydown', bodyErrorButtonClickRemoveHandler);
  };

  var errorButtonClickRemoveHandler = function () {
    var errorMsgElement = document.querySelector('.error');
    if (errorMsgElement) {
      errorMsgElement.remove();
      bodyRemoveListener();
    }
  };

  var bodyErrorButtonKeyDownRemoveHandler = function (evt) {
    var errorMsgElement = document.querySelector('.error');
    if (evt.code === 'Escape') {
      if (errorMsgElement) {
        errorMsgElement.remove();
        bodyRemoveListener();
      }
    }
  };

  var bodyErrorButtonClickRemoveHandler = function (evt) {
    var errorMsgElement = document.querySelector('.error');
    if (evt.button === 0) {
      if (errorMsgElement) {
        errorMsgElement.remove();
        bodyRemoveListener();
      }
    }
  };

  var onErrorMsg = function () {
    var mainPin = document.querySelector('.map__pin--main');
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content;
    var errorMsg = errorTemplate.querySelector('.error').cloneNode(true);
    main.append(errorMsg);
    document.body.addEventListener('click', errorButtonClickRemoveHandler);
    document.body.addEventListener('keydown', bodyErrorButtonKeyDownRemoveHandler);
    document.body.addEventListener('keydown', bodyErrorButtonClickRemoveHandler);
    mainPin.focus();
  };

  Upload.prototype.sendData = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === this.StatusCode.OK) {
        onSuccess(xhr.response);
      } else if (xhr.status === this.StatusCode.BAD_REQUEST) {
        onErrorMsg();
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }.bind(this));
    xhr.open('POST', this.URL_TO_DOWNLOAD_DATA);
    xhr.send(data);
  };

  App.Upload = Upload;
  window.App = App;
})(window);
