const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.ad-form__field input[type=file]');  //поле, по которому выбираем фото
export const avatarPreview = document.querySelector('#avatar_preview');          //куда подставляем фото

const initChoosePhoto = () => {
  //подпиываемся на событие выбора файла
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

export {initChoosePhoto};
