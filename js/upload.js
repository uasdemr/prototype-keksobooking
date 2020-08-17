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

  Upload.prototype.sendData = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === this.StatusCode.OK) {
        onSuccess(xhr.response);
      } else if (xhr.status === this.StatusCode.BAD_REQUEST) {
        // onErrorMsg();
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }.bind(this));
    xhr.open('POST', this.URL_TO_DOWNLOAD_DATA);
    xhr.send(data);
  };

  var onError = function (message) {
    throw new Error(message);
  };

  App.Upload = Upload;
  window.App = App;
})(window);
