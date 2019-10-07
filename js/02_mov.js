// Escenario
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// posicion inicial
var x = canvas.width / 2;
var y = canvas.height - 30;

// incremento
var dx = 1;
var dy = -2;

/** function draw():
 - Limpia la pantalla,
 - redibula el circulo,
 - y modifica la posicion
*/
function draw() {
  //Limpia la pantalla
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  //cambia posicion x,y
  x += dx;
  y += dy;
  // dibuja circulo azul
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
// Intervalo de tiempo en el que correra la funcion draw
setInterval(draw, 10);
