'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');

  // ------ Определяет какой тип жилья выбрал пользователь -----------
  window.getSelectedTypeHous = function () {
    for (var i = 0; i < housingType.options.length; i++) {
      if (housingType.options[i].selected) {
        window.selectedTypeHous = housingType.options[i].value;
      }
    }
  };
  // ////////////////////////////////////////////////////////////////

  housingType.addEventListener('change', function () {
    window.getSelectedTypeHous();
    var mapPins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    window.pin.renderPins(window.serverData);
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
  });

})();
