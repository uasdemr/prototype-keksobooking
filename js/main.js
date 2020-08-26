'use strict';
(function () {
  var App = window.App || {};
  var load = new App.Load();
  var card = new App.Card();
  var upload = new App.Upload();

  // В будущем, в map прилетит конструктор filter, в котором уже будут
  // данные из getJson
  // var map = new App.Map(new DataStore(), card);
  var map = new App.Map(load, card);
  var mainPin = new App.MainPin();
  var addForm = new App.AddForm(upload, map);
  var filtersForm = new App.FiltersForm();

  var appStarter = function () {
    addForm.activate();
    filtersForm.activate();
    map.activate();
  };

  var DOMContentLoadedHandler = function () {
    addForm.deactivate();
    mainPin.initMainPin(appStarter);
  };

  document.addEventListener('DOMContentLoaded', DOMContentLoadedHandler);

})(window);
