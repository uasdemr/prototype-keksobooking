'use strict';

(function () {
  var App = window.App || {};

  function MapFiltersForm(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.formElement = document.querySelector(selector);
    if (!this.formElement) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    this.filtersFormElements = Array.from(this.formElement.elements);
  }

  /**
  * Функция деактивирует все элементы формы с классом .map__filters
  */
  MapFiltersForm.prototype.elementsDisabler = function () {
    this.filtersFormElements.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
  };

  /**
  * Функция активирует все элементы формы с классом .map__filters
  */
  MapFiltersForm.prototype.elementsEnabler = function () {
    this.filtersFormElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
  App.MapFiltersForm = MapFiltersForm;
  window.App = App;
})(window);
