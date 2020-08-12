'use strict';
(function () {
  var App = window.App || {};
  var Data = new App.DataStore();
  var Load = new App.Load();
  Load.getJson(console.log);
  var Pin = new App.Pin();
  var Map = new App.Map(Pin, Load.getOne, Card);
  Load.getJson(Map.dataSetter.bind(Map));
  var Card = new App.Card();
  // var Map = new App.Map(Data.getAll(), Pin, Data.getOne, Card);
  var AdForm = new App.AdformHandler('.ad-form');
  var MainPin = new App.MainPin('.map__pin--main');
  var FiltersForm = new App.MapFiltersForm('.map__filters');

  AdForm.elementsDisabler();
  FiltersForm.elementsDisabler();
  AdForm.addressSetter(MainPin.getCoordinates());

  var appStarter = function () {
    Map.mapEnabler();
    AdForm.adFormEnabler();
    AdForm.adFormElementsEnabler();
    AdForm.addAdFormTypeChangeHandler();
    AdForm.addRoomNumberChangeHandler();
    AdForm.addressSetter(MainPin.getCoordinates());
    FiltersForm.elementsEnabler();
    Map.mapPinsFill();
    Map.addMapHandler();
    AdForm.addSubmitHandler();
    AdForm.addResetHandler();
    AdForm.addTimeinTimeoutHandler();
    Map.addDocumentKeyDownHandler();
    MainPin.addMousedownHandler();
  };
  MainPin.addClickHandler(appStarter);
  MainPin.addKeydownHandler(appStarter);

})(window);
