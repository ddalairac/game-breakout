// Escenario
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/* 
? Para detectar la colisión verificamos si la bola está tocando la pared.
? Si es así, cambiaremos la dirección de su movimiento en consecuencia.
*/

// para detectar los bordes y no el centro
var ballRadius = 10;
// posicion inicial
var x = canvas.width / 2;
var y = canvas.height - 30;
// velocidad
var dx = 3;
var dy = -3;
var color = "#0095DD";
function drawBall(color) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
// Random hexa color generator
function getRandomColor() {
  var chars = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ? si la direccion llega a los bordes, invierte la direccion
  // if (x + dx > canvas.width || x + dx < 0) {
  //   dx = -dx;
  // }
  // if (y + dy > canvas.height || y + dy < 0) {
  //   dy = -dy;
  // }

  // ? idem, pero teniendo en cuenta el tamaño de la bola
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    color = getRandomColor();
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
    color = getRandomColor();
  }

  x += dx;
  y += dy;

  drawBall(color);
}

setInterval(draw, 10);
