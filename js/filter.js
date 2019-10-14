'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapCheckbox = document.querySelectorAll('.map__checkbox');
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
  var getValueOption = function (select) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].selected) {
        var returnValue = select.options[i].value;
      }
    }

    return returnValue;
  };
  // ////////////////////////////////////////////////////////////////

  mapFilters.addEventListener('change', function () {
    window.removeDomElement('.map__card');
    window.selectedTypeHous = getValueOption(housingType);
    window.selectedRooms = getValueOption(housingRooms);
    window.selectedGuests = getValueOption(housingGuests);
    window.valueCheckedInputs = getValueCheckedInputs(mapCheckbox);
    changeValue(getValueOption(housingPrice));
    window.debounce(window.pin.renderPins.bind(null, window.serverData));
  });

})();
