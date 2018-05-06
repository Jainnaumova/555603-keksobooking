'use strict';

(function () {
  var LOAD_SUCCESS = 200;
  var LOAD_WRONG_REQUEST = 400;
  var LOAD_NOT_FOUND = 404;
  var LOAD_TIMEOUT = 10000;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  function loadData(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case LOAD_SUCCESS:
          onLoad(xhr.response);
          break;

        case LOAD_WRONG_REQUEST:
          error = 'Неверный запрос';
          break;
        case LOAD_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестная ошибка ' + xhr.status + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
      if (xhr.response !== null) {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = LOAD_TIMEOUT;
    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = loadData(onLoad, onError);
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    send: function (data, onLoad, onError) {
      var xhr = loadData(onLoad, onError);
      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();
