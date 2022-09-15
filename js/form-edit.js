//модуль редактирования формы юзером
import {MIN_PRICE_OF_HOUSING, ROOM_CAPACITY} from  './constant.js';
import {sendData} from  './api.js';
import {priceSlider} from  './form.js';
import {resetAllElementsMap} from  './map.js';
import {initChoosePhoto, avatarPreview} from  './upload-photo.js';

const uploadForm = document.querySelector('.ad-form');             //форма редактирования объявления
const submitButton = uploadForm.querySelector('#upload-submit');   //кнопка Опубликовать
const priceInput = uploadForm.querySelector('#price');
const housingTypeInput = uploadForm.querySelector('#type');       //тип жилья
const capacityInput = uploadForm.querySelector('#capacity');      //количество мест
const roomNumberInput = uploadForm.querySelector('#room_number'); //количество комнат
const checkInInput = uploadForm.querySelector('#timein');         //время заезда
const checkOutInput = uploadForm.querySelector('#timeout');       //время выезда
const housePicPreview = document.querySelector('.ad-form__photo');

const pristine = new Pristine(uploadForm, {
  // класс родительского элемента, к которому добавляется класс ошибки/успеха
  classTo: 'form-group',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // класс родительского элемента, к которому добавляется текстовый элемент ошибки
  errorTextParent: 'form-group',
  // тип элемента, который необходимо создать для текста ошибки
  errorTextTag: 'div',
  // класс текстового элемента ошибки
  errorTextClass: 'text-help',
});


//блокировка - разблокировка кнопки отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//аватарку к начальному состоянию
const resetPhotos = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  avatarPreview.style.width = '40px';
  avatarPreview.style.height = '44px';
  housePicPreview.textContent = '';
};

//функция для очистки формы и возвращения к первоначальным значениям
const resetAdForm = () => {
  priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  capacityInput.selectedIndex = 3;
  pristine.reset();
  uploadForm.reset();
  priceSlider.noUiSlider.set(MIN_PRICE_OF_HOUSING[housingTypeInput.value]);
  resetPhotos();
  unblockSubmitButton();
};


const editForm = ()  => {

  //функции для валидации поля с ценой в зависимости от выбранного типа жилья и генерации сообщения об ошибке
  const validatePriceInput = () => priceInput.value>= MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  const getPriceErrorMessage = () => {
    if (priceInput.value <= MIN_PRICE_OF_HOUSING[housingTypeInput.value]) {
      return `минимальная цена ${MIN_PRICE_OF_HOUSING[housingTypeInput.value]}`;
    }
  };

  //функции для валидации полей с количеством комнат и количеством гостей и генерация сообщения об ошибке
  const validateRoomNumberInput = () => ROOM_CAPACITY[roomNumberInput.value].includes(capacityInput.value);
  const getCapacityErrorMessage = () => `Размещение в ${roomNumberInput.value} ${roomNumberInput.value === '1' ? 'комнате' : 'комнатах'} для ${capacityInput.value} ${capacityInput.value === '1' ? 'гостя' : 'гостей'} невозможно`;

  //обработчик изменения поля с выбором жилья
  const onHousingTypeInputChange = () => {
    priceInput.min = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
    priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  };

  //обработчики для полей время въезда и выезда при изменении значения одного из полей
  const onCheckInInputChange = () => {
    checkOutInput.value = checkInInput.value;
  };

  const onCheckOutInputChange = () => {
    checkInInput.value = checkOutInput.value;
  };


  //обработчик на отправку формы
  const onUploadFormSubmit = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid)  {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(() => {
        resetAdForm();
        resetAllElementsMap();
      },unblockSubmitButton,formData);
    }
  };

  //подключаем все обработчики
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  pristine.addValidator(priceInput, validatePriceInput, getPriceErrorMessage);
  pristine.addValidator(capacityInput, validateRoomNumberInput, getCapacityErrorMessage);
  pristine.addValidator(roomNumberInput, validateRoomNumberInput, getCapacityErrorMessage);
  housingTypeInput.addEventListener('change', onHousingTypeInputChange);
  checkInInput.addEventListener('change', onCheckInInputChange);
  checkOutInput.addEventListener('change', onCheckOutInputChange);

  initChoosePhoto();              //создаем обработчик для загрузки аватарки
};

export {editForm, resetAdForm};
