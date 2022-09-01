const ALERT_SHOW_TIME = 5000;

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveFloat (a, b, digits = 1) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(digits);
}

//---------------плашка-сообщение с таймером----------------------------
const alertMessage = document.querySelector('.alert-message');

function showAlert (message)  {
  alertMessage.textContent = message;
  alertMessage.classList.remove('hidden');

  setTimeout(() => {
    alertMessage.classList.add('hidden');
  }, ALERT_SHOW_TIME);
}

//----------------------элемент-сообщение -----------------------
function showMessage (element) {

  //шаблон сообщения
  const elementTemplate = document.querySelector(`#${element}`)
    .content
    .querySelector(`.${element}`);

  const messageElement = elementTemplate.cloneNode(true);

  //обработчик события по клику
  const onClick = function () {
    messageElement.remove();
  };

  //обработчик закрытия ESC
  const onShowSuccessKeydown = function (evt) {
    if (evt.key === 'Escape') {
      messageElement.remove();
    }
  };

  if (element === 'error') {
    messageElement.querySelector(`.${element}__button`).addEventListener('click',onClick);   //добавляем событие при закрытии кнопкой
  }
  document.addEventListener('keydown',onShowSuccessKeydown);                               //добавляем событие при закрытии ESC
  document.addEventListener('click',onClick);                                              //добавляем событие при закрытии мышкой по экрану

  document.body.append(messageElement);
}

// ----------Устранение дребезга - Функция взята из интернета и доработана------------
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomPositiveFloat, showAlert, showMessage, debounce};
