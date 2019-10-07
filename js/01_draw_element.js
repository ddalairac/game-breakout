// Escenario
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ****** Cuadrado *******
ctx.beginPath();
ctx.rect(10, 10, 50, 50); //x,y,width,height
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

// ****** Circulo *******
ctx.beginPath();
// x,y, angulo inicial, angulo final, direccion hacia que se dibujara
ctx.arc(50, 60, 25, 0, Math.PI * 2, false); //x,y,angle,angle,direction
ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "green";
ctx.stroke();
ctx.closePath();

// Colores relleno
//   ctx.fillStyle = "#FF0000";
//   ctx.fillStyle = "green";
//   ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
//   ctx.fill(); asigna el color
//
// Color borde
//    ctx.strokeStyle = "green"; // mismas opciones
//    ctx.stroke();
