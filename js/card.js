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

  var transferFeaturesMap = {
    'wifi': 'wifi',
    'dishwasher': 'посудомоечная машина',
    'parking': 'стоянка',
    'washer': 'стиральная машина',
    'elevator': 'лифт',
    'conditioner': 'кондиционер'
  };

  var getCardElement = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    var popupTitle = cardElement.querySelector('.popup__title');
    var popupTextAddress = cardElement.querySelector('.popup__text--address');
    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTextTime = cardElement.querySelector('.popup__text--time');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupDescription = cardElement.querySelector('.popup__description');
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var imagePhoto = popupPhotos.querySelector('img');
    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupTitle.textContent = card.offer.title;
    popupTextAddress.textContent = card.offer.address;
    popupTextPrice.textContent = card.offer.price + '₽/ночь';
    popupType.textContent = typeHouseMap[card.offer.type];
    popupTextCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    popupTextTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    for (var i = 0; i < card.offer.features.length; i++) {
      popupFeatures.children[indexFeaturesMap[card.offer.features[i]]].textContent = transferFeaturesMap[card.offer.features[i]];
    }
    for (i = 0; i < popupFeatures.children.length; i++) {
      if (!popupFeatures.children[i].textContent) {
        popupFeatures.children[i].classList.add('hidden');
      }
    }

    popupDescription.textContent = card.offer.description;

    var image = imagePhoto.cloneNode();
    imagePhoto.remove();
    for (i = 0; i < card.offer.photos.length; i++) {
      var imageClone = image.cloneNode();
      popupPhotos.appendChild(imageClone);
    }

    for (i = 0; i < card.offer.photos.length; i++) {
      popupPhotos.children[i].src = card.offer.photos[i];
    }

    popupAvatar.src = card.author.avatar;

    return cardElement;
  };

  window.card.renderCards = function (data) {
    var card = data;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getCardElement(card));
    map.appendChild(fragment);
  };

})();
