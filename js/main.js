'use strict';
(function () {
  var App = window.App || {};
  var Upload = new App.Upload();
  var Load = new App.Load();
  var Pin = new App.Pin();
  var Card = new App.Card();
  var Map = new App.Map(Pin, Load.getOne, Card);
  Load.getJson(Map.dataSetter.bind(Map));
  var MainPin = new App.MainPin('.map__pin--main');
  var AdForm = new App.AdformHandler('.ad-form', Map, MainPin);
  var FiltersForm = new App.MapFiltersForm('.map__filters');

  AdForm.elementsDisabler();
  FiltersForm.elementsDisabler();
  AdForm.addressSetter(MainPin.getCoordinates());
  AdForm.addSubmitHandler(Upload.sendData.bind(Upload));
  AdForm.addResetHandler();

  var appStarter = function () {
    Map.mapEnabler();
    AdForm.adFormEnabler();
    AdForm.adFormElementsEnabler();
    AdForm.addAdFormTypeChangeHandler();
    AdForm.addRoomNumberChangeHandler();
    AdForm.addressSetter(MainPin.getCoordinates());
    FiltersForm.elementsEnabler();
    AdForm.addTimeinTimeoutHandler();
    Map.mapPinsFill();
    Map.addMapHandler();
    Map.addDocumentKeyDownHandler();
    MainPin.addMousedownHandler();
    AdForm.formElement.reset();
  };
  MainPin.addClickHandler(appStarter);
  MainPin.addKeydownHandler(appStarter);

})(window);
