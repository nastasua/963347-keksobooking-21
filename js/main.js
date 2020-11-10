'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomLengthArrayFrom(array) {
  let randomLength = getRandomInt(1, array.length);
  let arrayValues = [];
  for (var j = 0; j < randomLength; j++) {
    arrayValues[j] = array[j];
  }
  return arrayValues;
}

function createObjects() {

  let numArrayAvatars = [1, 2, 3, 4, 5, 6, 7, 8];
  function createRandomAvatars() {
    let numAvatar = numArrayAvatars.splice(0, 1);
    return numAvatar;
  }

  function createObject() {

    let avatar = 'img/avatars/user' + '0' + createRandomAvatars() + '.' + 'png';

    let title = 'Lorem Ipsum';

    let cost = getRandomInt(1000, 20000);

    const ARRAY_TYPES = ['palace', 'flat', 'house', 'bungalow'];
    let randomType = getRandomInt(0, ARRAY_TYPES.length);

    let type = ARRAY_TYPES[randomType];

    let quantityRooms = getRandomInt(0, 400);

    let quantityGuests = getRandomInt(0, quantityRooms);

    const ARRAY_TIMES = ['12:00', '13:00', '14:00'];

    let randomCheckin = getRandomInt(0, ARRAY_TIMES.length);
    let checkin = ARRAY_TIMES[randomCheckin];

    let randomCheckout = getRandomInt(0, ARRAY_TIMES.length);
    let checkout = ARRAY_TIMES[randomCheckout];

    const ARRAY_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    let arrayFeaturesValues = getRandomLengthArrayFrom(ARRAY_FEATURES);

    let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    const ARRAY_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
    let arrayPhotosValues = getRandomLengthArrayFrom(ARRAY_PHOTOS);

    let locationX = getRandomInt(0, document.querySelector('.map').offsetWidth);

    let locationY = getRandomInt(130, 630);

    const object = {
      author: {
        avatar: avatar,
      },
      offer: {
        title: title,
        address: locationX + ',' + locationY,
        price: cost,
        type: type,
        rooms: quantityRooms,
        guests: quantityGuests,
        checkin: checkin,
        checkout: checkout,
        features: arrayFeaturesValues,
        description: description,
        photos: arrayPhotosValues,
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
    return object;
  }

  let objects = [];

  for (var i = 0; i < 8; i++) {
    objects[i] = createObject();
  }
  return objects;
}

let myObjects = createObjects();

function deleteClass(block, deleteBlockClass) {
  block.classList.remove(deleteBlockClass);
}

deleteClass(document.querySelector('.map'), 'map--faded');

function createMapPin(entities) {
  let fragment = document.createDocumentFragment();
  let containerMapPins = document.querySelector('.map__pins');
  let templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  let imgMapPin = templateMapPin.querySelector('img');

  entities.forEach(function(entity) {
    let newMapPin = templateMapPin.cloneNode(true);
    newMapPin.style.left = entity.location.x + newMapPin.offsetWidth / 2 + 'px';
    newMapPin.style.top = entity.location.y + newMapPin.offsetHeight + 'px';
    imgMapPin.src = entity.author.avatar;
    imgMapPin.alt = entity.offer.title;

    fragment.appendChild(newMapPin);
  });
  containerMapPins.appendChild(fragment);
}

createMapPin(myObjects);
