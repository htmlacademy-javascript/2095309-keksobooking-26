import {showMessage} from  './util.js';          //окно-сообщение
const API_LINK = 'https://26.javascript.pages.academy/keksobooking';

//получить данные
const getData = async function (onSuccess, onFail)  {
  try {
    const response = await fetch(`${API_LINK}/data`);
    //console.log(response);
    if (!response.ok) {
      throw new Error ('Не удалось загрузить объявления');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

//отправить данные
const sendData = async function (onSuccess, onFail, body) {
  try {
    const response = await fetch(
      API_LINK,
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error ('Не удалось отправить форму. Попробуйте еще');
    }
    onSuccess();
    showMessage('success');
  } catch (error) {
    onFail();
    showMessage('error');
  }
};

export {getData, sendData};
