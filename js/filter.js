'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapCheckboxs = document.querySelectorAll('.map__checkbox');
  window.filter = {
    low: false,
    middle: false,
    high: false,
    selectedTypeHous: 'any',
    selectedRooms: 'any',
    selectedGuests: 'any',
    selectedPrice: 'any',
    valueCheckedInputs: [],
    getValueOption: function (select) {
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].selected) {
          var result = select.options[i].value;
          break;
        }
      }

      return result;
    },
    getValueFilter: function () {
      window.filter.selectedTypeHous = window.filter.getValueOption(housingType);
      window.filter.selectedRooms = window.filter.getValueOption(housingRooms);
      window.filter.selectedGuests = window.filter.getValueOption(housingGuests);
      window.filter.selectedPrice = window.filter.getValueOption(housingPrice);
      window.filter.valueCheckedInputs = getValueCheckedInputs(mapCheckboxs);
    }
  };

  var changeValue = function (valueOption) {
    window.filter.low = false;
    window.filter.middle = false;
    window.filter.high = false;
    switch (valueOption) {
      case 'low':
        window.filter.low = true;
        break;
      case 'middle':
        window.filter.middle = true;
        break;
      case 'high':
        window.filter.high = true;
    }
  };

  var getValueCheckedInputs = function (arrayInputs) {
    var arrayCheckedInputs = [];
    arrayInputs.forEach(function (element) {
      if (element.checked) {
        arrayCheckedInputs.push(element.value);
      }
    });

    return arrayCheckedInputs;
  };

  window.element.mapFilters.addEventListener('change', function () {
    window.util.removeDomElement('.map__card');
    window.filter.getValueFilter();
    changeValue(window.filter.getValueOption(housingPrice));
    window.debounce(window.pin.renderPins.bind(null, window.backend.serverData));
  });

})();
