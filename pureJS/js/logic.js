// Escenario
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth < 1200 ? window.innerWidth : 1200;
canvas.height =
    window.innerWidth < window.innerHeight
        ? window.innerWidth / 2
        : window.innerHeight * 0.9;

// Random hexa color generator
function getRandomColor() {
    var chars = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Pelota
var ballRadius = canvas.width / 60; //10
var x = canvas.width / 2;
var y = canvas.height * 0.8;
var dx = canvas.width / 400; // 1
var dy = -(canvas.width / 400); // 1
var color = getRandomColor();
var colFrames = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
// Paleta
var paddleHeight = ballRadius * 1.5; //10;
var paddleWidth = ballRadius * 8; //75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillstyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

// Ladrillos
var brickRowCount = 4;
var brickColumnCount = 7;
var brickWidth = (canvas.width / brickColumnCount) * 0.8; //75;
var brickHeight = paddleHeight; //20;
var brickPadding = (canvas.width / brickColumnCount) * 0.1; //10;
var brickOffsetTop = brickHeight * 2; //30;
var brickOffsetLeft =
    (canvas.width - (brickWidth + brickPadding) * brickColumnCount) / 2; //30;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r] = { x: brickX, y: brickY, status: 1, color: "#fff" };
    }
}

function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = bricks[c][r].x;
                var brickY = bricks[c][r].y;
                var brickColor = bricks[c][r].color;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//  Permitir que el usuario controle la paleta
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
function paddleMovement() {
    // limites de movimiento de la paleta
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += canvas.width / 300; // 2;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= canvas.width / 300; //2;
    }
}

function collisionDetection() {
    // Colision ladrillo
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    color = getRandomColor();
                    colFrames = 30;
                    b.status = 0;
                }
            }
        }
    }

    // Colision paleta
    if (
        y > canvas.height - ballRadius - paddleHeight &&
        x + dx > paddleX &&
        x + dx < paddleX + paddleWidth
    ) {
        dy = dy > 0 ? -dy : dy;
        color = getRandomColor();
        colFrames = 30;
    } else {
        color = colFrames > 0 ? getRandomColor() : "#fff";
        colFrames--;
    }
    // Colision bordes
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        // lateral
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        // top
        dy = -dy;
    }
}

// Fin del Juego
function evalEndGame() {
    // Pierde
    if (y > canvas.height) {
        // dy = -dy;
        clearInterval(interval);
        alert("GAME OVER");
        document.location.reload();
    } else {
        // Gana
        let winGame = 0;
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                winGame += bricks[c][r].status;
            }
        }
        if (winGame == 0 && interval) {
            clearInterval(interval);
            alert("Ganaste");
            document.location.reload();
        }
    }
}

// Dibujar frame
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
    paddleMovement();
    collisionDetection();
    evalEndGame();

    // posicion pelota
    x = x + dx;
    y = y + dy;
}

var interval = setInterval(draw, 5);
