'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;
  var fileChooser = document.querySelector('.ad-form__field').querySelector('input');
  window.preview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var fileUpload = document.querySelector('.ad-form__upload').querySelector('input');
  var formPhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  var insertImage = function (attributeSrc, parent) {
    var elementImage = document.createElement('img');
    elementImage.src = attributeSrc;
    elementImage.width = IMAGE_WIDTH;
    elementImage.height = IMAGE_HEIGHT;
    var formPhotoCopy = formPhoto.cloneNode(true);
    formPhotoCopy.appendChild(elementImage);
    parent.insertBefore(formPhotoCopy, document.querySelector('.ad-form__photo'));
  };

  var verifyImage = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });
    return matches;
  };

  var downloadImage = function (inputFile, cb) {
    inputFile.addEventListener('change', function () {
      var file = inputFile.files[0];

      if (verifyImage(file)) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          cb(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  downloadImage(fileChooser, function (result) {
    window.preview.src = result;
  });

  downloadImage(fileUpload, function (result) {
    insertImage(result, photoContainer);
  });

})();
