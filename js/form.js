//модуль настройки свойств и вида формы
import {MIN_PRICE_OF_HOUSING} from  './constant.js';

const UploadForm = document.querySelector('.ad-form');
const housingTypeInput = UploadForm.querySelector('#type');                 //тип жилья
const priceInput = UploadForm.querySelector('#price');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
export const priceSlider = adForm.querySelector('.ad-form__slider');       //слайдер для поля Цена за ночь


//функция дезактивации формы
const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);                          // Array.from преобразует объект в массив
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

//функция для активации формы
const enableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.removeAttribute('disabled');
  });
};
const initialDisable = () => {
  disableForm(adForm);
  disableForm(mapFilters);
};

const Slider = () => {
  //инициализируем слайдер и настраиваем его
  noUiSlider.create(priceSlider, {
    range: {
      min: 0,
      max: 100000,
    },
    start: MIN_PRICE_OF_HOUSING[housingTypeInput.value],
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  //обработчик для изменения на слйдере
  priceSlider.noUiSlider.on('update', (values, handle) => {
    priceInput.value = values[handle];
  });

  //обработчик на изменение в поле цены
  priceInput.addEventListener('change', function () {
    priceSlider.noUiSlider.set(this.value);
  });

  //обработчик на изменение типа жилья (для изменения настроек слайдера)
  housingTypeInput.addEventListener('change',  () => {
    priceSlider.noUiSlider.set(MIN_PRICE_OF_HOUSING[housingTypeInput.value]);
  });

};

export {initialDisable, enableForm, disableForm, Slider};

