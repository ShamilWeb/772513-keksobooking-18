'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var typeHouseMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var indexFeaturesMap = {
    'wifi': 0,
    'dishwasher': 1,
    'parking': 2,
    'washer': 3,
    'elevator': 4,
    'conditioner': 5
  };

  var fillFeatures = function (card, cardElement) {
    var popupFeatures = cardElement.querySelector('.popup__features');
    for (var i = 0; i < card.offer.features.length; i++) {
      popupFeatures.children[indexFeaturesMap[card.offer.features[i]]].textContent = 'true';
    }
    for (i = 0; i < popupFeatures.children.length; i++) {
      if (!popupFeatures.children[i].textContent) {
        popupFeatures.children[i].classList.add('hidden');
      }
    }
  };

  var fillImage = function (card, cardElement) {
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var imagePhoto = popupPhotos.querySelector('img');
    var image = imagePhoto;
    imagePhoto.remove();

    for (var i = 0; i < card.offer.photos.length; i++) {
      var imageClone = image.cloneNode();
      imageClone.src = card.offer.photos[i];
      popupPhotos.appendChild(imageClone);
    }
  };

  var fillInTheRest = function (card, cardElement) {
    var popupTitle = cardElement.querySelector('.popup__title');
    var popupTextAddress = cardElement.querySelector('.popup__text--address');
    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTextTime = cardElement.querySelector('.popup__text--time');
    var popupDescription = cardElement.querySelector('.popup__description');
    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupTitle.textContent = card.offer.title;
    popupTextAddress.textContent = card.offer.address;
    popupTextPrice.textContent = card.offer.price + '₽/ночь';
    popupType.textContent = typeHouseMap[card.offer.type];
    popupTextCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    popupTextTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    popupDescription.textContent = card.offer.description;
    popupAvatar.src = card.author.avatar;
  };

  var getCardElement = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);

    fillFeatures(card, cardElement);

    fillImage(card, cardElement);

    fillInTheRest(card, cardElement);

    return cardElement;
  };

  window.card.renderCards = function (data) {
    var card = data;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getCardElement(card));
    map.appendChild(fragment);
  };

})();
