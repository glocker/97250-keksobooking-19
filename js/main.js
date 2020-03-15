'use strict';
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

  for (var i = 1; i <= OBJECTS_NUMBER; i++) {
    mocksData.push(
        {
          'author': {
            'avatar': 'img/avatars/user' + 0 + i + '.png'
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
  return mocksData;
};


// FUNCTIONS TO GET RANDOM VALUES
var random = function (min, max) {
  var numbers = min + Math.random() * (max + 1 - min);

  return Math.floor(numbers);
};
var getRandomElementInArray = function (array) {
  return array[random(0, array.length - 1)];
};

var mocks = createMocks();

var map = document.querySelector('.map');


// MAP FADED TOGGLE: ACTIVE / INACTIVE
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content;
var pinButton = pinTemplate.querySelector('button');
var mapPins = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card').content;
var mapCard = cardTemplate.querySelector('article');

var getNewAd = function (item) {
  var pin = pinButton.cloneNode(true);
  var card = mapCard.cloneNode(true);

  pin.querySelector('img').src = item.author.avatar;
  pin.querySelector('img').alt = item.author.title;
  pin.style.left = item.location.x + (-PIN_SIZE * 0.5) + 'px';
  pin.style.top = item.location.y + (-PIN_SIZE * 0.5) + 'px';
  card.querySelector('.popup__title').textContent = item.offer.title;
  card.querySelector('.popup__text--address').textContent = item.offer.address;
  card.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = item.offer.type;
  card.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  card.querySelectorAll('.popup__feature').textContent = item.offer.features;
  card.querySelector('.popup__description').textContent = item.offer.description;
  card.querySelector('.popup__photos').src = item.offer.photos;
  card.querySelector('.popup__avatar').src = item.author.avatar;

  return pin;
};

var fragment = document.createDocumentFragment();

mocks.forEach(function (item) {
  fragment.appendChild(getNewAd(item));
});

mapPins.appendChild(fragment);

//____________________MODULE4-TASK2_____________________________

var notice = document.querySelector('.notice');

var ad_form = notice.querySelector('.ad-form');
ad_form.classList.add('disable');

var map_filters_container = document.querySelector('.map__filters-container');
var map_filters = map_filters_container.querySelector('.map__filters');

// TOGGLE WEB PAGE ACTIVE/INACTIVE
var activeHandler = function (){
  map.classList.add('map--faded');
  ad_form.classList.add('ad-form--disabled');
  map_filters.classList.add('map__filters--disabled');
};

var map_pin_main = mapPins.querySelector('.map__pin--main');
map_pin_main.addEventListener('mousedown', function(e){
  if (typeof e.map_pin_main === 0) {
    activeHandler();
  }
});

map_pin_main.addEventListener('keydown', function(evt){
  if (evt.keyCode === 13) {
    activeHandler();
  }
});

var pinImage = map_pin_main.querySelector(".img");
//var addressInputForm = notice.querySelector('#address');
var addressInputForm = document.querySelector('#address');
//addressInputForm.value = map_pin_main.style.offsetLeft + 32 + "px" + ", " + map_pin_main.style.offsetTop + 82 + "px";
addressInputForm.value = "602, 457";

var capacity = notice.querySelector('#capacity');
var capacityOptions = capacity.getElementsByTagName('option');
var roomNumber = notice.querySelector('#room_number');

var capacityChangeHandler = function (evt) {
  if (capacityOptions.value.selected < roomNumber.value.selected) {
    setCustomValidity();
  }
}

capacity.addEventListener('change', capacityChangeHandler);






