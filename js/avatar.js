'use strict';
(function () {
  var FILE_TYPES = [
    'gif', 'jpg', 'jpeg', 'png'
  ];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');

  fileChooser.style.opacity = 0;

  fileChooser.addEventListener('change', updateAvatar);

  function updateAvatar() {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    var fileAvatar = fileChooser.files[0];

    if (fileAvatar.length === 0) {
      var messageAvatar = document.createElement('p');
      messageAvatar.textContent = 'Файл не выбран';
      preview.appendChild(messageAvatar);
    } else {
      var fileName = fileAvatar.name.toLowerCase();
      var matches = FILE_TYPES.some(function (fileType) {
        return fileName.endsWith(fileType);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(fileAvatar);
      }
    }
  }
})();
