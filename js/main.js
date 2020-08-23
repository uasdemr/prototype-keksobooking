'use strict';
(function () {
  var App = window.App || {};
  var DataStore = App.DataStore;
  var card = new App.Card();
  // В будущем, в map прилетит конструктор filter, в котором уже будут
  // данные из getJson
  var map = new App.Map(new DataStore(), card);
  var mainPin = new App.MainPin();
  var addForm = new App.AddForm();
  var filtersForm = new App.FiltersForm();
  addForm.deactivate();

  var appStarter = function () {
    addForm.activate();
    filtersForm.activate();
    map.activate();
  };

  mainPin.addClickHandler(appStarter);
  mainPin.addKeydownHandler(appStarter);
})(window);
