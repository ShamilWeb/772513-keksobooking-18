
'use strict';

(function () {
  var fileChooser = document.querySelector('.ad-form__field').querySelector('input');
  window.preview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var fileUpload = document.querySelector('.ad-form__upload').querySelector('input');
  var formPhoto = document.querySelector('.ad-form__photo');

  var insertImg = function (element, attributeSrc, pasteHere) {
    var elementImg = document.createElement(element);
    elementImg.src = attributeSrc;
    elementImg.width = 70;
    elementImg.height = 70;
    pasteHere.appendChild(elementImg);
  };

  var downloadImg = function (inputFile, cb) {
    inputFile.addEventListener('change', function () {

      var file = inputFile.files[0];
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        cb(reader.result);
      });

      reader.readAsDataURL(file);
    });
  };

  downloadImg(fileChooser, function (result) {
    window.preview.src = result;
  });

  downloadImg(fileUpload, function (result) {
    insertImg('img', result, formPhoto);
  });

})();
