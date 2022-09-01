
import {enableForm, disableForm} from './form.js';
import {createHtmlAd} from  './ads.js';                //вставленные в шаблон данные  housingType
import {resetAdForm} from  './form-edit.js';

const adForm = document.querySelector('.ad-form');                  //форма с объявлением
export const mapFilters = document.querySelector('.map__filters');  //фильтры
const addressInputElement = document.querySelector('#address');    //поле с адресом
const resetButton = document.querySelector('.ad-form__reset');

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const PRECISE_NUMBER = 5;                                           //количество знаков после запятой в позиции маркера
const ZOOM = 12;
//координаты Токио
const DEFAULT_LAT_LNG = {
  lat: 35.65952,
  lng: 139.78179,
};

//иконка для маркера
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const PinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// карта при загрузке
const onDefaultMap = () => {
  addressInputElement.value = `${DEFAULT_LAT_LNG.lat} ${DEFAULT_LAT_LNG.lng}`;
  disableForm(adForm);
  disableForm(mapFilters);
  setTimeout (() => {
    enableForm(adForm);
    enableForm(mapFilters);
  }, 2000);
};


// Создание карты
const map = L.map('map-canvas')
  .on('load', onDefaultMap)
  .setView(DEFAULT_LAT_LNG, ZOOM);

//добавляем слой самой карты
L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

//создаем слой для отрисовки маркеров и добавляем на карту
const markerGroup = L.layerGroup().addTo(map);

//функция для отрисовки одного маркера и балуна с данными объявления
const createMarker = (adData) => {
  const marker = L.marker({
    lat: adData.location.lat,
    lng: adData.location.lng,
  },
  {
    PinIcon,
  },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createHtmlAd(adData));
};

//функция для создания всех маркеров на основе данных полученных с сервера (или своих сгенерированных)
const createAdvertsMarkers  = (data) => {
  markerGroup.clearLayers();
  data.forEach((dataElement) => {
    createMarker(dataElement);
  });
};


//-------------управляемый маркер---------------------
//создаем маркер для выбора адреса в объявлении
const mainPinMarker = L.marker(
  {
    lat:DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

//добавляем маркер на карту
mainPinMarker.addTo(map);

//обработчик для отслеживания координат маркера и записи их в значение поля с адресом
mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInputElement.value = `${lat.toFixed(PRECISE_NUMBER)}, ${lng.toFixed(PRECISE_NUMBER)}`;
  map.setView(evt.target.getLatLng(), ZOOM);
});

const createMarkers = (data) => {
  createAdvertsMarkers(data);    //создаем маркеры
};

//сброс всех элементов к начальному состоянию
const resetAllElementsMap = () => {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
  });
  map.setView(DEFAULT_LAT_LNG, ZOOM);
  map.closePopup();
  mapFilters.reset();
  onDefaultMap();
};

//обработчик для кнопки сброс
resetButton.addEventListener('click', () => {
  resetAdForm();
  resetAllElementsMap();
});

export {createMarkers, resetAllElementsMap};
