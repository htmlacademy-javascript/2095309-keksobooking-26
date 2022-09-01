import {getRandomPositiveFloat} from  './util.js';

const ELEMENTS_COUNT = 10;  // количество объявлений
const MAX_ROOM = 10;        // максимальное кол-во комнат
const MAX_GUEST = 10;       // максимальное кол-во гостей
const MAX_PRICE = 1000000;  // максимальная стоимость

//заголовки объявлений
const TITLES = [
  'Заголовок1',
  'Заголовок2',
  'Заголовок3',
  'Заголовок4',
  'Заголовок5',
  'Заголовок6',
  'Заголовок7',
  'Заголовок8',
  'Заголовок9',
  'Заголовок10'
];

//типы жилья
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

//проверка
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

//проверка
const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

//особенности
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

//описание помещения
const DESCRIPTIONS = [
  'Описание1',
  'Описание2',
  'Описание3',
  'Описание4',
  'Описание5',
  'Описание6',
  'Описание7',
  'Описание8',
  'Описание9',
  'Описание10'
];

//фотографии помещения
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

//Случайный элемент из массива
const getRandomArrayElement = function (elements) {
  return elements[getRandomPositiveFloat(0, elements.length - 1, 0)];
};

//Функция создает массив случайной длинны из заданного массива. double = false - элементы не должны повторяться
const getRandomLength = (array, double = true) => {
  const max = getRandomPositiveFloat(1, array.length, 0);   // максимальное кол-во элементов
  const results = [];
  for (let i = 0; i < max; i++) {
    let elementArray = getRandomArrayElement(array);
    if (double === false) {
      while  (results.includes(elementArray)) {
        elementArray = getRandomArrayElement(array);
      }
    }
    results.push(elementArray);
  }
  return results;
};

//получить случайный адрес аватарки
const createAvatar = () => {
  const pictureNumber = getRandomPositiveFloat(1, 10, 0);
  const twoDigit = pictureNumber.toString().length < 2 ? `0${pictureNumber}` : `${pictureNumber}`;
  return `img/avatars/user${twoDigit}.png`;
};

//объект местоположение
const createLocation = () => ({
  lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
  lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
});

//объект объявление
const createOffer = (author) => {
  const location = createLocation();
  return {
    author: author,
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveFloat(1, MAX_PRICE, 0),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveFloat(1, MAX_ROOM, 0),
      guests: getRandomPositiveFloat(1, MAX_GUEST, 0),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomLength(FEATURES, false),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomLength(PHOTOS),
    },
    location: location,
  };
};

//функция для создания массива объявлений
const createAds = function () {
  const ads = [];                       //массив объявлений
  const avatars = [];
  let randomAdress = createAvatar();
  for (let i = 1; i <= ELEMENTS_COUNT; i++) {
    //---чтобы автарки не повторялись
    while  (avatars.includes(randomAdress)) {
      randomAdress = createAvatar();
    }
    avatars.push(randomAdress);
    const av = {avatar: randomAdress};    //создали объект автор
    //---------------------------------
    ads.push(createOffer(av));
  }
  return ads;
};

export {createAvatar, createOffer, createAds};
