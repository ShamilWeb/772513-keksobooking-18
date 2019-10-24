'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapCheckbox = document.querySelectorAll('.map__checkbox');
  window.selectedTypeHous = 'any';
  window.selectedRooms = 'any';
  window.selectedGuests = 'any';
  window.selectedPrice = 'any';
  window.valueCheckedInputs = [];

  // ------На вход принимает значение value выбранного option селекта Price---------
  var changeValue = function (valueOption) {
    window.low = false;
    window.middle = false;
    window.high = false;
    switch (valueOption) {
      case 'low':
        window.low = true;
        break;
      case 'middle':
        window.middle = true;
        break;
      case 'high':
        window.high = true;
    }
  };
  // //////////////////////////////////////////////////////////////////////////

  // ------На вход принимает массив инпутов и возвращает массив, значения у которого value тех инпутов, которые активны-----------
  var getValueCheckedInputs = function (arryInputs) {
    var arryCheckedInputs = [];
    for (var i = 0; i < arryInputs.length; i++) {
      if (arryInputs[i].checked) {
        arryCheckedInputs.push(arryInputs[i].value);
      }
    }
    return arryCheckedInputs;
  };
  // /////////////////////////////////////////////////////////////////////////////////////

  // ------На вход принимает select и возвращает value выбранного option-----------
  window.getValueOption = function (select) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].selected) {
        var returnValue = select.options[i].value;
      }
    }

    return returnValue;
  };
  // ////////////////////////////////////////////////////////////////

  window.getValueFilter = function () {
    window.selectedTypeHous = window.getValueOption(housingType);
    window.selectedRooms = window.getValueOption(housingRooms);
    window.selectedGuests = window.getValueOption(housingGuests);
    window.selectedPrice = window.getValueOption(housingPrice);
    window.valueCheckedInputs = getValueCheckedInputs(mapCheckbox);
  };

  window.util.mapFilters.addEventListener('change', function () {
    window.removeDomElement('.map__card');
    window.getValueFilter();
    changeValue(window.getValueOption(housingPrice));
    window.debounce(window.pin.renderPins.bind(null, window.serverData));
  });

})();
