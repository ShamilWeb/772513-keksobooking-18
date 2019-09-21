
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png',];
var titles = ['Дом', 'Квартира', 'Замок', 'Теремок', 'Шалаш', 'Пещера', 'Хата', 'Дворец'];
var addresses = ['Бабушкина', 'Маздокская', 'Кадырова', 'Нурадилова', 'Трощева', 'Эналова', 'Лермонтава', 'Путина'];
var prices = [2000, 2500, 1500, 4000, 500, 250, 1200, 10000];
var types = ['palace', 'bungalo', 'flat', 'house', 'palace', 'flat', 'bungalo', 'house'];
var roomses = [3, 4, 10, 2, 1, 1, 3, 14];
var guestses = [2, 5, 15, 2, 1, 0, 3, 20];
var checkins = ['12:00', '14:00', '13:00', '12:00', '13:00', '14:00', '12:00', '13:00']
var checkouts = ['13:00', '12:00', '14:00', '14:00', '14:00', '13:00', '13:00', '12:00'];
var featureses = [["wifi", "dishwasher", "parking", "washer"], ["parking", "washer", "elevator", "conditioner"], ["wifi", "dishwasher"], ["washer"], ["elevator", "conditioner"], ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"], ["wifi", "dishwasher", "parking"]];
var descriptions = ['aaaaaaaaaaaaaaaaa', 'sssssssssssssssss', 'ddddddddddddddddddd', 'fffffffffffffffff', 'ggggggggggggggg', 'hhhhhhhhhhhhhh', 'eeeeeeeeeeeeee', 'qqqqqqqqqqqqqqq'];
var photoses = [["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"], ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg"], ["http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"], ["http://o0.github.io/assets/images/tokyo/hotel1.jpg"], ["http://o0.github.io/assets/images/tokyo/hotel2.jpg"], ["http://o0.github.io/assets/images/tokyo/hotel3.jpg"], ["http://o0.github.io/assets/images/tokyo/hotel2.jpg"], ["http://o0.github.io/assets/images/tokyo/hotel3.jpg"]];
var coordinatesX = [100, 140, 250, 360, 180, 430, 330, 290];
var coordinatesY =[140, 300, 460, 550, 240, 600, 490, 280];

var generationArryAdObjects = function () {
var arrySimilarAds = [];
for (var i = 0; i < avatars.length; i++) {
  var similarAd = {
      author: {},
      offer: {},
      location: {}
    };
    similarAd.author.avatar = avatars[i];
    similarAd.offer.title = titles[i];
    similarAd.offer.address = addresses[i];
    similarAd.offer.price = prices[i];
    similarAd.offer.type = types[i];
    similarAd.offer.rooms = roomses[i];
    similarAd.offer.guests = guestses[i];
    similarAd.offer.checkin = checkins[i];
    similarAd.offer.checkout = checkouts[i];
    similarAd.offer.features = featureses[i];
    similarAd.offer.description = descriptions[i];
    similarAd.offer.photos = photoses[i];
    similarAd.location.x = coordinatesX[i];
    similarAd.location.y = coordinatesY[i];

    arrySimilarAds.push(similarAd);
  };
  return arrySimilarAds;
}
  console.log(generationArryAdObjects());
