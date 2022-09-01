//блок, в который будем вставлять объявления
const adsBlock = document.querySelector('#map-canvas');

const typeHousing = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  palace : 'Дворец',
  hotel : 'Отель',
};

// соответствие элемента объявления и класса в разметке
const classElement = {
  title : '.popup__title',
  address : '.popup__text--address',
  price : '.popup__text--price',
  type : '.popup__type',
  rooms : '.popup__text--capacity',
  guests : '.popup__text--capacity',
  checkin : '.popup__text--time',
  checkout : '.popup__text--time',
  features : '.popup__features',
  description : '.popup__description',
  photos : '.popup__photos',
};

//шаблон объявления
const adTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

//фрагмент для создания элементов-объявлений
const adListFragment = document.createDocumentFragment();

//функция создает один элемент ДОМ из массива
const createHtmlAd = (ad) => {
  //на основе шаблона создаем элемент ДОМ
  const adElement = adTemplate.cloneNode(true);

  const popupPhotos = adElement.querySelector('.popup__photos');
  const popupPhoto = adElement.querySelector('.popup__photo');
  const popupFeatureItems = adElement.querySelectorAll('.popup__feature');

  //делаем невидимыми те элементы HTML, которых нет в переданном массиве
  //1.
  Object.entries(classElement).forEach((entry) => {               //все скрываем
    const [, value] = entry;
    adElement.querySelector(`${value}`).classList.add('hidden');
  });
  //2.
  Object.entries(ad.offer).forEach((entry) => {                 // показываем только имеющиеся
    const [key] = entry;
    if (key) {
      adElement.querySelector(`${classElement[key]}`).classList.remove('hidden');
    }
  });


  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = typeHousing[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  if (ad.offer.features) {
    const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);
    popupFeatureItems.forEach((popupFeatureItem) => {
      const modifier = popupFeatureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeatureItem.remove();
      }
    });
  } else {
    adElement.querySelector('.popup__features').remove();
  }

  adElement.querySelector('.popup__description').textContent = ad.offer.description;

  popupPhoto.remove();
  if (ad.offer.photos) {
    for (let i = 0; i < ad.offer.photos.length; i++) {
      const clonePhoto = popupPhoto.cloneNode(true);
      clonePhoto.src = ad.offer.photos[i];
      popupPhotos.appendChild(clonePhoto);
    }
  }

  adElement.querySelector('.popup__avatar').textContent = ad.author.avatar;

  return adElement;
};

// //все данные вставляем в adsBlock (эта функция нужна только для теста) - потом удалить
// const createHtmlAds = (arrayData) => {
//   arrayData.forEach((ad) => {
//     createHtmlAd(ad);
//     adListFragment.appendChild(ad);
//   });

//   adsBlock.appendChild(adListFragment);            //вставляем все в документ
// };

export {createHtmlAd};
