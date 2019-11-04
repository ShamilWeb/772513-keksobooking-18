'use strict';

(function () {
  window.element = {
    main: document.querySelector('main'),
    errorTemplate: document.querySelector('#error').content.querySelector('.error'),
    mapPin: document.querySelector('.map__pin'),
    mapFilters: document.querySelector('.map__filters'),
    form: document.querySelector('.ad-form'),
    map: document.querySelector('.map'),
    address: document.querySelector('#address'),
    filterFieldsets: document.querySelectorAll('.map__filters fieldset'),
    filterSelects: document.querySelectorAll('.map__filters select'),
    mapOverlay: document.querySelector('.map__overlay'),
  };
})();
