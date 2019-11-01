'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMG_WIDTH = 70;
  var IMG_HEIGHT = 70;
  var fileChooser = document.querySelector('.ad-form__field').querySelector('input');
  window.preview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var fileUpload = document.querySelector('.ad-form__upload').querySelector('input');
  var formPhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  var insertImg = function (attributeSrc, parent) {
    var elementImg = document.createElement('img');
    elementImg.src = attributeSrc;
    elementImg.width = IMG_WIDTH;
    elementImg.height = IMG_HEIGHT;
    var formPhotoCopy = formPhoto.cloneNode(true);
    formPhotoCopy.appendChild(elementImg);
    parent.insertBefore(formPhotoCopy, document.querySelector('.ad-form__photo'));
  };

  var doesСheckImg = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    return matches;
  };

  var downloadImg = function (inputFile, cb) {
    inputFile.addEventListener('change', function () {
      var file = inputFile.files[0];

      if (doesСheckImg(file)) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          cb(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  downloadImg(fileChooser, function (result) {
    window.preview.src = result;
  });

  downloadImg(fileUpload, function (result) {
    insertImg(result, photoContainer);
  });

})();
