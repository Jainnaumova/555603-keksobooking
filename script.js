
// функция активации формы
function activateForm () {
  var elements = document.getElementsByClassName('map--faded');
  elements[0].classList.remove('map--faded');
  var form = document.getElementsByClassName('ad-form--disabled');
  form[0].classList.remove('ad-form--disabled');
  }
var element = document.getElementById('drag__pin');
element.addEventListener('click', activateForm , false);
// функция активации формы

// перетаскивание кнопки
var btn = document.getElementById('drag__pin');

var btnPressed = false;

btn.addEventListener('mousedown', function(e) {
  btnPressed = true;
  px = e.clientX;
  py = e.clientY;
});

btn.addEventListener('mouseup', function(e) {
  btnPressed = false;
})

window.addEventListener('mouseup', function(e) {
  btn.style.MozTransform = "";
  btn.style.WebkitTransform = "";
  btn.style.opacity = 1;
})

window.addEventListener('mousemove', function(e) {
  if(btnPressed) {
    dx = e.clientX - px;
    dy = e.clientY - py;
    btn.style.opacity = 0.85;
    btn.style.MozTransform = "translate(" + dx + "px, " + dy + "px)";
    btn.style.WebkitTransform = "translate(" + dx + "px, " + dy + "px)";
  }
})
// перетаскивание кнопки
