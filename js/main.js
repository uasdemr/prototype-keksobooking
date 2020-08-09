'use strict';
(function () {
  var App = window.App || {};
  var Data = new App.DataStore();
  var Pin = new App.Pin();
  var Card = new App.Card();
  var Map = new App.Map(Data.getAll(), Pin, Data.getOne, Card);
  var MainPin = new App.MainPin('.map__pin--main');
  var AdForm = new App.AdformHandler('.ad-form');
  var FiltersForm = new App.MapFiltersForm('.map__filters');

  AdForm.elementsDisabler();
  FiltersForm.elementsDisabler();
  MainPin.coordinates();

  var appStarter = function () {
    Map.mapEnabler();
    AdForm.adFormEnabler();
    AdForm.adFormElementsEnabler();
    AdForm.addAdFormTypeChangeHandler();
    AdForm.addRoomNumberChangeHandler();
    FiltersForm.elementsEnabler();
    Map.mapPinsFill();
    Map.addMapHandler();
    AdForm.addResetHandler();
    AdForm.addTimeinTimeoutHandler();
    Map.addDocumentKeyDownHandler();
  };
  MainPin.addClickHandler(appStarter);
  MainPin.addKeydownHandler(appStarter);

})(window);
