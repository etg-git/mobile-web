var hit = document.getElementById("hit_button");
var elem = document.getElementById("myBar");
var canvas = window.document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");
var width = canvas.width;
var heigth = canvas.height;

function ball(x, y, color) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.color = color;
}

var red1 = new ball(80, 80, "#e51515");
var red2 = new ball(500, 160, "#e51515");
var yellow = new ball(465, 335, "#feca28");
var white = new ball(500, 500, "#f8f6ea");

var now_ball;
var que;

// que = {
//     x: 200,
//     y: 200,
//     degree: 0,
//     mouse: false,
//     drag: false
// }


function motion1() {
    now_ball = yellow;
    que = new function () {
        this.x = now_ball.x;
        this.y = now_ball.y;
        this.degree = 0;
        this.mouse = false;
        this.drag = false;
    }

    ctx.clearRect(0, 0, width, heigth);
    draw_map();

    draw_ball(red1);
    draw_ball(red2);
    draw_ball(white);
    draw_ball(now_ball);

    canvas.addEventListener('mousemove', updateCanvas, false);    //움직일때
    canvas.addEventListener('mousedown', startDrag, false); // 버튼을 누를때
    canvas.addEventListener('mouseup', stopDrag, false);  // 버튼을 놓을때


    hit.addEventListener('mousedown', startGauge, false);
    hit.addEventListener('mouseup', stopGauge, false);
    draw_que();

}


window.onload = function game() {
    motion1();
}
