'use strict';

(function () {
  var MAX_NUMBER_ROOMS = 100;
  var MIN_TEXT = 30;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var roomsNumber = document.querySelector('#room_number');
  var capacitys = document.querySelector('#capacity');
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
      }
    }
    return numberRooms;
  };

  var removesDisabledCapacitys = function () {
    for (var i = 0; i < capacitys.options.length; i++) {
      capacitys.options[i].disabled = false;
    }
  };

  var addDisabledCapacitys = function (numberRooms) {
    for (var i = 0; i < capacitys.options.length; i++) {
      if (Number(capacitys.options[i].value) > Number(numberRooms)) {
        capacitys.options[i].disabled = true;
      }

      if (MAX_NUMBER_ROOMS === Number(numberRooms)) {
        capacitys.options[capacitys.options.length - 1].disabled = false;
        for (var j = 0; j < capacitys.options.length; j++) {
          if (capacitys.options[j].textContent !== 'не для гостей') {
            capacitys.options[j].disabled = true;
          }
        }
      } else {
        capacitys.options[capacitys.options.length - 1].disabled = true;
      }
    }
  };

  var switchСapacitys = function () {
    for (var i = 0; i < capacitys.options.length; i++) {
      if (capacitys.options[i].selected) {
        if (capacitys.options[i].disabled) {
          for (var j = 0; j < capacitys.options.length; j++) {
            if (!capacitys.options[j].disabled) {
              capacitys.options[j].selected = true;
              break;
            }
          }
        }
      }
    }
  };

  var goValueOption = function (goValue, select) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === goValue) {
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
    removesDisabledCapacitys();
    addDisabledCapacitys(defineNumberRooms());
    switchСapacitys();
  });

  type.addEventListener('change', function () {
    changeValueMin(window.filter.getValueOption(type));
    MIN_PRICE = getMinPrice(window.filter.getValueOption(type));
  });

  var onDisabledPage = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      window.util.getInactivePage(successTemplate);
      document.removeEventListener('keydown', onDisabledPage);
    }
  };

  var onSaveForm = function () {
    window.activation.activationPage(null, false);
    main.appendChild(successTemplate);
    document.addEventListener('keydown', onDisabledPage);
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
    window.activation.activationPage();
  });

})();
