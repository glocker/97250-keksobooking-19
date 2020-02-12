// CONSTS FOR mocksData

var OBJECTS_NUMBER = 8;
var MIN = 1;
var MAX = 10;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKS = ['12:00', '13:00', '14:00'];
var MAP_MIN_WIDTH = 1;
var MAP_MAX_WIDTH = 1200;
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


// FUNCTIONS TO GET RANDOM VALUES
var random = function (min, max) {
  var numbers = min + Math.random() * (max + 1 - min);

  return Math.floor(numbers);
}
var getRandomElementInArray = function (array) {
  return array[random(0, array.length - 1)];
}

var mocks = createMocks();

var map = document.querySelector('.map');


// MAP FADED TOGGLE: ACTIVE / INACTIVE
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content;
var mapPins = document.querySelector('.map__pins');

var getNewAd = function () {
  var pin = pinTemplate.cloneNode(true);

  mocks.forEach(function (item, i) {
    pin.querySelector('img').src = item.avatar;
    pin.querySelector('img').alt = item.title;
    pin.querySelector('button').style.left = item.location.x + (-PIN_SIZE * 0.5) + 'px';
    pin.querySelector('button').style.top = item.location.y + (-PIN_SIZE * 0.5) + 'px';
  });
  return pin;
}

var fragment = document.createDocumentFragment();
fragment.appendChild(getNewAd());


mapPins.appendChild(fragment);





