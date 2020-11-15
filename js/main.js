'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const resultArray = (array) => array.slice(getRandomInt(1, array.length));

const getRandomLengthFrom = (array) => {
  const randomIndex = getRandomInt(0, array.length);
  const randomLength = array[randomIndex];
  return randomLength;
};

const createObjects = () => {

  const avatarsIndexes = [1, 2, 3, 4, 5, 6, 7, 8];

  const createObject = (avatarIndex) => {

    const avatar = `img/avatars/user0${avatarIndex}.png`;

    const title = `Lorem Ipsum`;

    const cost = getRandomInt(1000, 20000);

    const TYPES = [`palace`, `flat`, `house`, `bungalow`];

    const type = getRandomLengthFrom(TYPES);

    const quantityRooms = getRandomInt(0, 400);

    const quantityGuests = getRandomInt(0, quantityRooms);

    const TIMES = [`12:00`, `13:00`, `14:00`];

    const checkin = getRandomLengthFrom(TIMES);

    const checkout = getRandomLengthFrom(TIMES);

    const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
    const featuresValues = resultArray(FEATURES);

    const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
    const photosValues = resultArray(PHOTOS);

    const locationX = getRandomInt(0, document.querySelector(`.map`).offsetWidth);

    const locationY = getRandomInt(130, 630);

    const object = {
      author: {
        avatar: avatar,
      },
      offer: {
        title: title,
        address: `${locationX}, ${locationY}`,
        price: cost,
        type: type,
        rooms: quantityRooms,
        guests: quantityGuests,
        checkin: checkin,
        checkout: checkout,
        features: featuresValues,
        description: description,
        photos: photosValues,
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
    return object;
  };

  const objects = avatarsIndexes.map(createObject);

  return objects;
};

const objects = createObjects();

const deleteClass = (block, deleteBlockClass) => {
  block.classList.remove(deleteBlockClass);
};

deleteClass(document.querySelector(`.map`), `map--faded`);

const createMapPin = (entities) => {
  const fragment = document.createDocumentFragment();
  const containerMapPins = document.querySelector(`.map__pins`);
  const templateMapPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  entities.forEach((entity) => {
    const newMapPin = templateMapPin.cloneNode(true);
    const imgMapPin = newMapPin.querySelector(`img`);
    newMapPin.style.left = entity.location.x + newMapPin.offsetWidth / 2 + `px`;
    newMapPin.style.top = entity.location.y + newMapPin.offsetHeight + `px`;
    imgMapPin.src = entity.author.avatar;
    imgMapPin.alt = entity.offer.title;

    fragment.appendChild(newMapPin);
  });
  containerMapPins.appendChild(fragment);
};

createMapPin(objects);
