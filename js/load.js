'use strict';

(function () {
  var App = window.App || {};

  function Load() {
    this.URL_TO_UPLOAD_DATA = 'https://javascript.pages.academy/keksobooking/data';
    this.UPLOAD_TIMEOUT = 10000;
    this.StatusCode = {
      OK: 200
    };
    // this.data = [];
  }

  Load.prototype.getJson = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === this.StatusCode.OK) {
        // this.data = xhr.response;
        // onSuccess(this.data);
        onSuccess(xhr.response);
        // window.filter.defaultFilterObjectSetter();
        // onSuccess(window.filter.filterObject);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }.bind(this));

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = this.UPLOAD_TIMEOUT;

    xhr.open('GET', this.URL_TO_UPLOAD_DATA);
    xhr.send();
  };

  var onError = function (message) {
    throw new Error(message);
  };


  App.Load = Load;
  window.App = App;
})(window);
