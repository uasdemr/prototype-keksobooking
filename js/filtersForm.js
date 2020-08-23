'use strict';
(function () {
  var App = window.App || {};

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormElements = filtersForm.elements;
  filtersFormElements = Array.from(filtersFormElements);
  /**
 * Функция деактивирует все элементы формы с классом .map__filters
 */
  var filtersFormElementsDisabler = function () {
    filtersFormElements.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
  };

  function FiltersForm() { }

  /**
 * Функция активирует все элементы формы с классом .map__filters
 */
  var filtersFormElementsEnabler = function () {
    filtersFormElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  FiltersForm.prototype.activate = function () {
    filtersFormElementsEnabler();
  };

  FiltersForm.prototype.deactivate = function () {
    filtersFormElementsDisabler();
  };

  App.FiltersForm = FiltersForm;
  window.App = App;
})(window);
