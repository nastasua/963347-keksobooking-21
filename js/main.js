'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArray(array) {
  let randomLength = getRandomInt(1, array.length);
  let arrayValues = [];
  for (var j = 0; j < array.length; j++) {
    arrayValues[j] = array[j];
  }
  arrayValues.length = randomLength;
  return arrayValues;
}

function createArrayObjects() {

  function createObject() {
    // avatar без повторений пробовала найти указанным ниже способом, но ничего не получилось
    // let numArrayAvatar = [1, 2, 3, 4, 5, 6, 7, 8];
    // let numAvatar = getRandomInt(1, numArrayAvatar.length);
    // numArrayAvatar.splice(numAvatar, 1);
    let numAvatar = getRandomInt(1, 8);
    let avatar = 'img/avatars/user' + '0' + numAvatar + '.' + 'png';

    let title = 'Lorem Ipsum';

    let cost = getRandomInt(1000, 20000);

    let arrayTypes = ['palace', 'flat', 'house', 'bungalow'];
    let randomType = getRandomInt(0, arrayTypes.length);

    let type = arrayTypes[randomType];

    let quantityRooms = getRandomInt(0, 400);

    let quantityGuests = getRandomInt(0, quantityRooms);

    let arrayTimes = ['12:00', '13:00', '14:00'];

    let randomCheckin = getRandomInt(0, arrayTimes.length);
    let checkin = arrayTimes[randomCheckin];

    let randomCheckout = getRandomInt(0, arrayTimes.length);
    let checkout = arrayTimes[randomCheckout];

    let arrayFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    let arrayFeaturesValues = getRandomArray(arrayFeatures);

    let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    let arrayPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
    let arrayPhotosValues = getRandomArray(arrayPhotos);

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

let myArrayObjects = createArrayObjects();

function delClass(block, delBlockClass) {
  block.classList.remove(delBlockClass);
}

delClass(document.querySelector('.map'), 'map--faded');

function createMapPin(myArray) {
  let containerMapPins = document.querySelector('.map__pins');
  let templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  let imgMapPin = templateMapPin.querySelector('img');

  for (var k = 0; k < 8; k++) {
    let newMapPin = templateMapPin.cloneNode(true);
    newMapPin.style.left = myArray[k].location.x + newMapPin.offsetWidth / 2 + 'px';
    newMapPin.style.top = myArray[k].location.y + newMapPin.offsetHeight + 'px';
    imgMapPin.src = myArray[k].author.avatar;
    imgMapPin.alt = myArray[k].offer.title;

    containerMapPins.appendChild(newMapPin);
  }
}

createMapPin(myArrayObjects);


