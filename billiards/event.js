var audio = new Audio('hit.mp3');
var mouseX = 9999, mouseY = 9999, distX, distY;
var nowdegree = 0;
var cursor_grab = "url(DATA URI), move";
var cursor_drag = "url(DATA URI), move";


function findOffset(obj) {
    var curX = curY = 0;
    if (obj.offsetParent) {
        do {
            curX += obj.offsetLeft;
            curY += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {x: curX, y: curY};
    }
}

function updateCanvas(e) {
    var pos = findOffset(canvas);

    mouseX = e.pageX - pos.x;   // 마우스의 현재 좌표
    mouseY = e.pageY - pos.y;

    nowdegree = 180 * Math.atan2(mouseX - que.x, mouseY - que.y) / Math.PI;

    if (que.mouse && !que.drag) {
        canvas.style.cursor = cursor_grab;
    } else if (que.drag) {
        canvas.style.cursor = cursor_drag;
    } else {
        canvas.style.cursor = 'auto';
    }
    if (que.drag) {
        que.degree = -(nowdegree - 90);
    }

    draw_que();
}

function startDrag() {
    if (que.mouse == true) {
        que.drag = true;
        distX = mouseX - que.x;
        distY = mouseY - que.y;
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "rgba(0,0,0,.3)";
        ctx.shadowBlur = 5;
        draw_que();
    }
}

function stopDrag() {
    if (que.drag == true) {
        que.drag = false;
        ctx.restore();
        draw_que();
    }
}

var gauge = 0;
var one = 1;
var id;
var power=0;

function frame() {
    gauge += one;
    if(gauge >= 100){
        one = -1;
    }

    if(gauge <= 0) {
        one = 1;
    }
    elem.style.width = gauge + '%';
    document.getElementById("label").innerHTML = gauge + '%';
}
function startGauge() {
    id = setInterval(frame, 10);

}
function stopGauge() {
    clearInterval(id);
    power = gauge;
    gauge = 0;
    elem.style.width = gauge + '%';
    document.getElementById("label").innerHTML = gauge + '%';
    que_execute();
}

var c_power = 0;
var d_power;

function ball_motion() {

    var degree = que.degree * degreeToRadian;

    console.log(d_power);
    c_power++;

    console.log(c_power);
    now_ball.x = now_ball.x - c_power * Math.cos(degree + degreeToRadian);
    now_ball.y = now_ball.y - c_power * Math.sin(degree + degreeToRadian);

    redraw();
    if(c_power > d_power){
        console.log("power is 0");
        clearInterval(TimerID2);
        b_draw_que = true;
        que.x = now_ball.x;
        que.y = now_ball.y;
        draw_que();
        j = 0;

        redraw();

        tempX2 = now_ball.x;
        tempY2 = now_ball.y;
        c_power = 0;
    }

    if (now_ball.x <= 80 || now_ball.x >= 1120 || now_ball.y <= 80 || now_ball.y >= 590) {
        console.log("들어옴");
        clearInterval(TimerID2);
        b_draw_que = true;
        que.x = now_ball.x;
        que.y = now_ball.y;
        draw_que();
        j = 0;

        redraw();

        tempX2 = now_ball.x;
        tempY2 = now_ball.y;
    }

    now_ball.x = tempX2;
    now_ball.y = tempY2;
}

function ball_execute() {
    d_power = power*10;
    TimerID2 = setInterval(ball_motion, 20);

    tempX2 = now_ball.x;
    tempY2 = now_ball.y;
}

function que_motion() {

    i++;
    que.x = que.x + i * Math.cos(degreeToRadian * que.degree);
    que.y = que.y + i * Math.sin(degreeToRadian * que.degree);
    draw_que();
    if (i >= 100) {
        clearInterval(TimerID);
        que.x = tempX - 20 * Math.cos(degreeToRadian * que.degree);
        que.y = tempY - 20 * Math.sin(degreeToRadian * que.degree);
        draw_que();
        audio.play();

        b_draw_que = false;
        ball_execute();

        i = 0;

    }

    que.x = tempX;
    que.y = tempY;

}

function que_execute() {
    tempX = que.x;
    tempY = que.y;


    TimerID = setInterval(que_motion, 10);
}
