let canvasWidth = 0;
let canvasHeight = 0;
let barL = {};
let barR = {};
let ball = {};
let speed = 5;

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;

    createCanvas(canvasWidth, canvasHeight);
    background(0);
    rectMode(CENTER);

    barL = {
        pos_x: canvasWidth * 0.1,
        pos_y: canvasHeight / 2,
        size_x: 20,
        size_y: 100
    };
    barR = {
        pos_x: canvasWidth * 0.9,
        pos_y: canvasHeight / 2,
        size_x: 20,
        size_y: 100
    };
    ball = {
        pos_x: canvasWidth / 2,
        pos_y: canvasHeight / 2,
        size: 20,
        vector_x: 1,
        vector_y: 1
    };
}

function draw() {
    background(0);
    moveBall();
    drawBall();
    moveBar();
    drawBar();
}

function moveBall() {
    ball_limit = ball.size / 2;
    if (ball.pos_x + ball_limit > barR.pos_x - barR.size_x / 2) ball.vector_x = -1;
    if (ball.pos_x - ball_limit < barL.pos_x + barL.size_x / 2) ball.vector_x = 1;
    if (ball.pos_y + ball_limit > canvasHeight) ball.vector_y = -1;
    if (ball.pos_y - ball_limit < 0) ball.vector_y = 1;

    ball.pos_x = ball.pos_x + speed * ball.vector_x;
    ball.pos_y = ball.pos_y + speed * ball.vector_y;
}

function drawBall() {
    noStroke();
    fill(255);
    ellipse(ball.pos_x, ball.pos_y, ball.size, ball.size);
}

function moveBar() {
    let targetBar = {};
    if (ball.vector_x === 1) targetBar = barR;
    if (ball.vector_x === -1) targetBar = barL;

    barY_limit = targetBar.size_y / 2;
    if (targetBar.pos_y < ball.pos_y && targetBar.pos_y + barY_limit < canvasHeight) {
        targetBar.pos_y = targetBar.pos_y + speed;
    }
    if (targetBar.pos_y > ball.pos_y && targetBar.pos_y - barY_limit > 0) {
        targetBar.pos_y = targetBar.pos_y - speed;
    }
}

function drawBar() {
    noStroke();
    fill(255);
    rect(barR.pos_x, barR.pos_y, barR.size_x, barR.size_y);
    rect(barL.pos_x, barL.pos_y, barL.size_x, barL.size_y);
}