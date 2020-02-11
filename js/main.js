// FUNCTION TO GET RANDOM VALUE
var random = function (min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomElementInArray = function (array) {
  return array[random(0, array.length - 1)];
}

// CONSTS FOR mocksData

var objectsNumber = 8;
var min = 1;
var max = 10;
var types = ['palace', 'flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var mapMinWidth = 1;
var mapMaxWidth = 3500;
var yMin = 130;
var yMax = 630;
var pinSize = 40;

var createMocks = function () {
  var mocksData = [];

  for (var i = 0; i < objectsNumber.length; i++) {
    mocksData.push(
      {
        'author': {
          'avatar': '../img/avatars/user' + i + 1 + '.png'
        },

        'offer': {
          'title': 'title',
          'address': 'location.x, location.y',
          'price': random(),
          'type': getRandomElementInArray(types),
          'rooms': random(min, max),
          'guests': random(min, max),
          'checkin': getRandomElementInArray(checks),
          'checkout': getRandomElementInArray(checks),
          'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
          'description': 'desc',
          'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
        },

        'location': {
          'x': random(mapMinWidth, mapMaxWidth),
          'y': random(yMin, yMax)
        }
      }
    );
  }
  return  mocksData;
}



var map = document.querySelector('.map');


// MAP FADED TOGGLE: ACTIVE / INACTIVE
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin');
var mapPins = document.querySelector('.map__pins');

var getNewAd = function () {
  var pin = pinTemplate.cloneNode(true);

  createMocks.forEach(function (i, item) {
    pin.querySelector('.pin__img').src = item.avatar;
    pin.querySelector('.pin__img').alt = item.title;
    pin.querySelector('.map-pin').style.left = item.location.x + (-pinSize * 0.5);
    pin.querySelector('.map-pin').style.top = item.location.y + (-pinSize * 0.5);
  });
  return pin;
}

var fragment = document.createDocumentFragment();
createMocks().forEach(function (i, item) {
  fragment.appendChild(getNewAd(i, item))
})

mapPins.appendChild(fragment);





