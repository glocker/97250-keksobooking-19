// CONSTS FOR mocksData

var OBJECTS_NUMBER = 8;
var MIN = 1;
var MAX = 10;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKS = ['12:00', '13:00', '14:00'];
var MAP_MIN_WIDTH = 1;
var MAP_MAX_WIDTH = 3500;
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_SIZE = 40;

var createMocks = function () {
  var mocksData = [];

  for (var i = 0; i <= OBJECTS_NUMBER; i++) {
    mocksData.push(
      {
        'author': {
          'avatar': '../img/avatars/user' + 0 + i + '.png'
        },

        'offer': {
          'title': 'title',
          'address': 'location.x, location.y',
          'price': random(MIN, MAX),
          'type': getRandomElementInArray(TYPES),
          'rooms': random(MIN, MAX),
          'guests': random(MIN, MAX),
          'checkin': getRandomElementInArray(CHECKS),
          'checkout': getRandomElementInArray(CHECKS),
          'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
          'description': 'desc',
          'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
        },

        'location': {
          'x': random(MAP_MIN_WIDTH, MAP_MAX_WIDTH),
          'y': random(Y_MIN, Y_MAX)
        }
      }
    );
  }
  return  mocksData;
}

var mocks = createMocks();

// FUNCTIONS TO GET RANDOM VALUES
var random = function (min, max) {
  var numbers = min + Math.random() * (max + 1 - min);

  return Math.floor(numbers);
}
var getRandomElementInArray = function (array) {
  return array[random(0, array.length - 1)];
}



var map = document.querySelector('.map');


// MAP FADED TOGGLE: ACTIVE / INACTIVE
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin');
var mapPins = document.querySelector('.map__pins');

var getNewAd = function () {
  var pin = pinTemplate.cloneNode(true);

  mocks.forEach(function (i, item) {
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





