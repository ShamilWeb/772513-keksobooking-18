'use strict';

(function () {
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

  var MAX_NUMBER_ROOMS = 100;

  window.getCoordinatesPin();

  // ---------- Определяет какое количество комнат выбрал пользователь---------------------
  var defineNumberRooms = function () {
    for (var i = 0; i < roomsNumber.options.length; i++) {
      if (roomsNumber.options[i].selected) {
        var numberRooms = roomsNumber.options[i].value;
      }
    }
    return numberRooms;
  };
  // ///////////////////////////////////////////////////////////////////

  // ----------Удаляет атрибут disabled у всех options в склекте гости--------------------------
  var removesDisabledCapacitys = function () {
    for (var i = 0; i < capacitys.options.length; i++) {
      capacitys.options[i].disabled = false;
    }
  };
  // ///////////////////////////////////////////////////////////////////////////////

  // -----------Добавляет атрибут disabled к определенным options в склекте гости--------------
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
  // ///////////////////////////////////////////////////////////////////////////////////

  // ------Если выбранное количество гостей, после переключения количество комнат, стало недоступным, то данная функция переключает на доступное количество гостей---------------------------
  var switchСapacitys = function () {
    for (var i = 0; i < capacitys.options.length; i++) {
      if (capacitys.options[i].selected) { // Определяем какой option выбран
        if (capacitys.options[i].disabled) { // Проверяем у него значение disabled, если tru то выполняем следующи код
          for (var j = 0; j < capacitys.options.length; j++) {
            if (!capacitys.options[j].disabled) { // Здесь находим первый элемент который активен и переходи к нему
              capacitys.options[j].selected = true;
              break;
            }
          }
        }
      }
    }
  };
  // ///////////////////////////////////////////////////////////////////////////////////////////

  // -----Переводит селек к тому значеению у которого value равняется входному параметру-----------
  var goValueOption = function (goValue, select) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === goValue) {
        select.options[i].selected = true;
        break;
      }
    }
  };
  // ////////////////////////////////////////////////////////////////////////////////////////

  // -----Принимает два селекта. Узнает value активного значения первого селекта и выбирает значение с тем же value у второго селекта-----------
  var synchronizeSelect = function (select1, select2) {
    var valueOption = window.getValueOption(select1);
    goValueOption(valueOption, select2);
  };
  // ////////////////////////////////////////////////////////////////////////////////////////

  // -----Получает на вход value выбранного option селека тип жилья и меняет минимальную цену и плейсхолдер-----------
  var changeValueMin = function (valueInputPrice) {
    inputPrice.setAttribute('min', priceMap[valueInputPrice]);
    inputPrice.setAttribute('placeholder', priceMap[valueInputPrice]);
  };
  // ////////////////////////////////////////////////////////////////////////////////////////

  // -------не дает пользователю выбрать количество гостей больше количества комнат
  roomsNumber.addEventListener('change', function () {
    removesDisabledCapacitys();
    addDisabledCapacitys(defineNumberRooms());
    switchСapacitys();
  });
  // /////////////////////////////////////////////////////////////////////////////////

  // -------Определяет минимальную цену в зависимости от выбранного типа жилья каждый раз, когда значение в селекте type меняется -----------
  type.addEventListener('change', function () {
    changeValueMin(window.getValueOption(type));
  });
  // /////////////////////////////////////////////////////////////////////////////////

  // -------Удаляет у текстового инпута пробелы-----------
  var removeSpace = function (textInput) {

  };
  // /////////////////////////////////////////////////////////////////////////////////


  var onSaveForm = function () {
    window.activation.activationPage(null, false);
    main.appendChild(successTemplate);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.util.getInactivePage(successTemplate);
      }
    });
    successTemplate.addEventListener('click', function () {
      window.util.getInactivePage(successTemplate);
    });
    successMessage.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  window.addMyEventListener('#timein', 'change', synchronizeSelect.bind(null, timein, timeout));
  window.addMyEventListener('#timeout', 'change', synchronizeSelect.bind(null, timeout, timein));

  window.util.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.util.form), onSaveForm, window.util.outputErrors);console.log('сервер');
  });

  adFormSubmit.addEventListener('click', function () {
    inputTitle.value = inputTitle.value.trim();
    inputTitle.setCustomValidity('');
    if (inputTitle.value.length < 30) {
      inputTitle.setCustomValidity('Длина текста не должна быть меньше 30 символов');
    }
  });

  formReset.addEventListener('click', function () {
    window.activation.activationPage();
  });

})();
