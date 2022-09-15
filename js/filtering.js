import {SIMILAR_AD_COUNT} from  './constant.js';
import {createMarkers, mapFilters} from  './map.js';
import {debounce} from  './util.js';

const RERENDER_DELAY = 500;

export const housingType = document.querySelector('#housing-type');       //тип жилья
const housingPrice = document.querySelector('#housing-price');            //цена
const housingRooms = document.querySelector('#housing-rooms');            //количество комнат
const housingGuests = document.querySelector('#housing-guests');          //количество гостей
const filterWifi = document.querySelector('#filter-wifi');
const filterDishwasher = document.querySelector('#filter-dishwasher');    //Посудомоечная машина
const filterParking = document.querySelector('#filter-parking');          //паркинг
const filterWasher = document.querySelector('#filter-washer');            //стиральная машина
const filterElevator = document.querySelector('#filter-elevator');        //лифт
const filterConditioner = document.querySelector('#filter-conditioner');  //кондиционер

//функция возвращает True если данное удобство есть в объявлении
const getFeature = (element, ad) => {
  if (element.checked) {
    if (ad.offer.features && ad.offer.features.includes(element.value)) {
      return true;
    }
  } else {
    return true;
  }
  return false;
};


//функция возвращает статус объявления (true - подходит под условия фильтра, false -нет)
const getAdStatus = (ad) => {

  let selectType = false;
  let selectPrice = false;
  let selectRooms = false;
  let selectGuests = false;

  // тип
  if (housingType.value === 'any') {selectType = true;}
  if (ad.offer.type === housingType.value) {
    selectType = true;
  }
  // цена
  if (housingPrice.value === 'any') {selectPrice = true;}
  if (housingPrice.value === 'middle') {
    if (Number(ad.offer.price) > 10000 && Number(ad.offer.price) <= 50000) {selectPrice = true;}
  }
  if (housingPrice.value === 'low') {
    if (Number(ad.offer.price) <= 10000) {selectPrice = true;}
  }
  if (housingPrice.value === 'high') {
    if (Number(ad.offer.price) > 50000) {selectPrice = true;}
  }

  // комнаты
  if (housingRooms.value === 'any') {selectRooms = true;}
  if (Number(housingRooms.value) === Number(ad.offer.rooms)) {selectRooms = true;}

  // гости
  if (housingGuests.value === 'any') {selectGuests = true;}
  if (Number(housingGuests.value) === Number(ad.offer.guests)) {selectGuests = true;}

  // вай=фай
  const selectWifi = getFeature(filterWifi, ad);
  // Посудомоечная машина
  const selectDishwasher = getFeature(filterDishwasher, ad);
  // Паркинг
  const selectParking = getFeature(filterParking, ad);
  // Стиральная
  const selectWasher = getFeature(filterWasher, ad);
  // лифт
  const selectElevator = getFeature(filterElevator, ad);
  // кондиционер
  const selectConditioner = getFeature(filterConditioner, ad);

  return selectType && selectPrice && selectRooms && selectGuests && selectWifi && selectDishwasher && selectParking
          && selectWasher && selectElevator && selectConditioner;
};

//функция возвращает массив при изменении фильтра
const onChangeFilter = (ads) => {
  const similarAds = ads
    .slice()
    .filter((e) => getAdStatus(e))
    .slice(0, SIMILAR_AD_COUNT);
  return similarAds;
};

const selectFilter = (data) => {

  //подписываемся на события изменения значения в полях фильтра
  housingType.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  housingPrice.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  housingRooms.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  housingGuests.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  filterWifi.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  filterDishwasher.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  filterParking.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  filterWasher.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  filterElevator.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
  filterConditioner.addEventListener('change', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));

  mapFilters.addEventListener('reset', debounce(() => createMarkers(onChangeFilter(data)),RERENDER_DELAY));
};

export {selectFilter, onChangeFilter};
