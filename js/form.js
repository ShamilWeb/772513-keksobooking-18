'use strict';

(function () {
  var MAX_NUMBER_ROOMS = 100;
  var MIN_TEXT = 30;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var roomsNumber = document.querySelector('#room_number');
  var capacitys = document.querySelectorAll('#capacity option');
  var inputPrice = document.querySelector('#price');
  var type = document.querySelector('#type');
  var formReset = document.querySelector('.ad-form__reset');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var main = document.querySelector('main');
  var inputTitle = document.querySelector('#title');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.querySelector('.success__message');
  var priceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  window.util.getCoordinatesPin();

  var defineNumberRooms = function () {
    for (var i = 0; i < roomsNumber.options.length; i++) {
      if (roomsNumber.options[i].selected) {
        var numberRooms = roomsNumber.options[i].value;
        break;
      }
    }
    return numberRooms;
  };

  var removeDisabledCapacitys = function () {
    capacitys.forEach(function (element) {
      if (element.disabled) {
        element.disabled = false;
      }
    });
  };

  var addDisabledCapacitys = function (numberRooms) {
    capacitys.forEach(function (element) {
      if (Number(element.value) > Number(numberRooms) || Number(element.value) === 0 || MAX_NUMBER_ROOMS === Number(numberRooms)) {
        element.disabled = true;
      }

      if (MAX_NUMBER_ROOMS === Number(numberRooms)) {
        capacitys[capacitys.length - 1].disabled = false
      }
    });
  };

  var switchСapacitys = function () {
    for (var i = 0; i < capacitys.length; i++) {
      if (capacitys[i].selected) {
        if (capacitys[i].disabled) {
          for (var j = 0; j < capacitys.length; j++) {
            if (!capacitys[j].disabled) {
              capacitys[j].selected = true;
              break;
            }
          }
        }
      }
    }
  };

  var goValueOption = function (value, select) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === value) {
        select.options[i].selected = true;
        break;
      }
    }
  };

  var changeSelect = function (select1, select2) {
    var valueOption = window.filter.getValueOption(select1);
    goValueOption(valueOption, select2);
  };

  var changeValueMin = function (valueInputPrice) {
    inputPrice.setAttribute('min', priceMap[valueInputPrice]);
    inputPrice.setAttribute('placeholder', priceMap[valueInputPrice]);
  };

  var getMinPrice = function (valueInputPrice){
    return priceMap[valueInputPrice]
  };

  roomsNumber.addEventListener('change', function () {
    removeDisabledCapacitys();
    addDisabledCapacitys(defineNumberRooms());
    switchСapacitys();
  });

  type.addEventListener('change', function () {
    changeValueMin(window.filter.getValueOption(type));
    MIN_PRICE = getMinPrice(window.filter.getValueOption(type));
  });

  var onDeactivatePage = function (evt) {
    if (evt.keyCode === window.Сonstants.ESC_KEYCODE) {
      window.util.getInactivePage(successTemplate);
      document.removeEventListener('keydown', onDeactivatePage);
    }
  };

  var onSaveForm = function () {
    window.activation.activatePage(null, false);
    main.appendChild(successTemplate);
    document.addEventListener('keydown', onDeactivatePage);
    successTemplate.addEventListener('click', function () {
      window.util.getInactivePage(successTemplate);
    });
    successMessage.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  var addClassInputNotValid = function (input) {
    if (!input.checkValidity()) {
      input.classList.add('input--not-valid');
    }
     else {
        if (input.classList.contains('input--not-valid')) {
          input.classList.remove('input--not-valid');
        }
      }
  };

  window.util.addEventListenerKeydown('#timein', 'change', changeSelect.bind(null, timein, timeout));
  window.util.addEventListenerKeydown('#timeout', 'change', changeSelect.bind(null, timeout, timein));

  window.element.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.element.form), onSaveForm, window.util.outputErrors);
  });

  inputTitle.addEventListener('keydown', function () {
    inputTitle.setCustomValidity('');
  });

  adFormSubmit.addEventListener('click', function () {
    inputTitle.value = inputTitle.value.trim();

    if (inputTitle.value.length < MIN_TEXT){
      inputTitle.setCustomValidity('Длина текста не должна быть меньше 30 символов');
    } else {
      inputTitle.setCustomValidity('');
    }

    addClassInputNotValid(inputTitle);
    addClassInputNotValid(inputPrice);

  });

  formReset.addEventListener('click', function () {
    window.activation.activatePage(false);
  });

})();
