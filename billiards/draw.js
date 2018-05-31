var degreeToRadian = Math.PI / 180;
var i = 0;
var TimerID;
var TimerID2;
var tempX;
var tempY;
var tempX2;
var tempY2;


function draw_map() {
    ctx.setLineDash([]);
    ctx.fillStyle = "#6a5746";
    ctx.fillRect(0, 0, width, heigth);
    ctx.fillStyle = "#3456af";
    ctx.fillRect(45, 45, width - 90, heigth - 90);
    ctx.fillStyle = "#4370d7";
    ctx.fillRect(60, 60, width - 120, heigth - 120);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(60, 60);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(width - 60, 60);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, heigth);
    ctx.lineTo(60, heigth - 60);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, heigth);
    ctx.lineTo(width - 60, heigth - 60);
    ctx.stroke();

    ctx.fillStyle = "#b0b0b0";

    for (var i = 1; i <= 7; i++) {
        ctx.beginPath();
//arc(중심점x, 중심점y, 반지름, 시작각도, 끝각도, 방향)
//true : 반시계 방향 , false : 시계 방향
        ctx.arc(60 + (width - 120) / 8 * i, 30, 5, 0, Math.PI * 2, true);
        ctx.strokeStyle = "#0";
        ctx.fill();


        ctx.beginPath();
        ctx.arc(60 + (width - 120) / 8 * i, heigth - 30, 5, 0, Math.PI * 2, true);
        ctx.strokeStyle = "#0";
        ctx.fill();
    }

    for (var i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(30, 60 + (heigth - 120) / 4 * i, 5, 0, Math.PI * 2, true);
        ctx.strokeStyle = "#0";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(width - 30, 60 + (heigth - 120) / 4 * i, 5, 0, Math.PI * 2, true);
        ctx.strokeStyle = "#0";
        ctx.fill();
    }
}


function draw_ball(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 20, 0, Math.PI * 2, true);
    ctx.strokeStyle = "#0";
    ctx.fill();
}

var b_draw_que = true;

function redraw() {
    ctx.clearRect(0, 0, width, heigth);

    draw_map();
    draw_ball(red1);
    draw_ball(red2);
    draw_ball(white);
    draw_ball(now_ball);

}

function draw_que() {

    if (b_draw_que) {

        redraw();
        var degree = que.degree * degreeToRadian;


        var x1_start = que.x + 40 * Math.cos(degree + degreeToRadian * 5);
        var x2_start = que.x + 40 * Math.cos(degree - degreeToRadian * 5);
        var x3_start = que.x + 50 * Math.cos(degree + degreeToRadian * 5);
        var x4_start = que.x + 50 * Math.cos(degree - degreeToRadian * 5);
        var y1_start = que.y + 40 * Math.sin(degree + degreeToRadian * 5);
        var y2_start = que.y + 40 * Math.sin(degree - degreeToRadian * 5);
        var y3_start = que.y + 50 * Math.sin(degree + degreeToRadian * 5);
        var y4_start = que.y + 50 * Math.sin(degree - degreeToRadian * 5);


        ctx.beginPath();
        ctx.moveTo(x1_start, y1_start);
        ctx.lineTo(x2_start, y2_start);
        ctx.lineTo(x4_start, y4_start);
        ctx.lineTo(x3_start, y3_start);
        ctx.fillStyle = "#f8f6ea";
        ctx.fill();

        var x1_end = que.x + 700 * Math.cos(degree + degreeToRadian * 0.6);
        var x2_end = que.x + 700 * Math.cos(degree - degreeToRadian * 0.6);
        var y1_end = que.y + 700 * Math.sin(degree + degreeToRadian * 0.6);
        var y2_end = que.y + 700 * Math.sin(degree - degreeToRadian * 0.6);


        ctx.fillStyle = "#f6dfbd";
        ctx.beginPath();
        ctx.moveTo(x1_start, y1_start);
        ctx.lineTo(x2_start, y2_start);
        ctx.lineTo(x2_end, y2_end);
        ctx.lineTo(x1_end, y1_end);
        ctx.isPointInPath(mouseX, mouseY) ? que.mouse = true : que.mouse = false;  //현재 경로에 포함되있는지 확인
        ctx.fill();

        var x1_middle = que.x + 520 * Math.cos(degree + degreeToRadian * 0.6);
        var x2_middle = que.x + 520 * Math.cos(degree - degreeToRadian * 0.6);
        var x3_middle = que.x + 450 * Math.cos(degree);
        var x4_middle = que.x + 680 * Math.cos(degree + degreeToRadian * 0.6);
        var x5_middle = que.x + 680 * Math.cos(degree - degreeToRadian * 0.6);

        var y1_middle = que.y + 520 * Math.sin(degree + degreeToRadian * 0.6);
        var y2_middle = que.y + 520 * Math.sin(degree - degreeToRadian * 0.6);
        var y3_middle = que.y + 450 * Math.sin(degree);
        var y4_middle = que.y + 680 * Math.sin(degree + degreeToRadian * 0.6);
        var y5_middle = que.y + 680 * Math.sin(degree - degreeToRadian * 0.6);

        ctx.fillStyle = "#1a1a18";

        ctx.beginPath();
        ctx.moveTo(x1_middle, y1_middle);
        ctx.lineTo(x3_middle, y3_middle);
        ctx.lineTo(x2_middle, y2_middle);
        ctx.lineTo(x5_middle, y5_middle);
        ctx.lineTo(x4_middle, y4_middle);
        ctx.fill();

        draw_guide_1();
        draw_guide_2();

    }

}

var isfirst = true;
var guide_x;
var guide_y;

function draw_guide_1() {
    var degree = que.degree * degreeToRadian;

    //case left wall
    var guide_left_x = 60;
    var guide_left_y = now_ball.y - Math.tan(degreeToRadian * que.degree) * (now_ball.x - 60);

    //case right wall
    var guide_right_x = 1140;
    var guide_right_y = now_ball.y - Math.tan(degreeToRadian * que.degree) * (now_ball.x - 1140);

    //case top wall
    var guide_top_x = now_ball.x - Math.tan(degreeToRadian * (90 - que.degree)) * (now_ball.y - 60);
    var guide_top_y = 60;

    //case bottom wall
    var guide_bottom_x = now_ball.x - Math.tan(degreeToRadian * (90 - que.degree)) * (now_ball.y - 610);
    var guide_bottom_y = 610;

    var x1_start = now_ball.x - 20 * Math.cos(degree);
    var y1_start = now_ball.y - 20 * Math.sin(degree);


    if (isfirst) {
        guide_x = guide_left_x;
        guide_y = guide_left_y;
    }


    //case left to top
    if (guide_y <= 60 && (guide_x >= 60 || guide_x <= 1140)) {
        guide_x = guide_top_x; // 가변값
        guide_y = guide_top_y; // 60
        isfirst = false;
    }

    //case top to right
    if (guide_x >= 1140 && (guide_y > 60 || guide_y <= 610)) {
        guide_x = guide_right_x; // 1140
        guide_y = guide_right_y; // 가변값
    }

    //case right to bottom
    if (guide_y >= 610 && (guide_x < 1140 || guide_x >= 60)) {
        guide_x = guide_bottom_x; //가변값
        guide_y = guide_bottom_y; //610
    }

    //cace bottom to left
    if (guide_x <= 60 && (guide_y < 610 || guide_y >= 60)) {
        guide_x = guide_left_x; //60
        guide_y = guide_left_y; //가변값
    }


    ctx.setLineDash([5, 10]);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(x1_start, y1_start);
    ctx.lineTo(guide_x, guide_y);
    ctx.stroke();

}


var guide_x2;
var guide_y2;
var isfirst2 = true;


function draw_guide_2() {
    var degree = que.degree * degreeToRadian;

    //case right wall
    var guide_right_x = 1140;
    var guide_right_y = now_ball.y - Math.tan(degreeToRadian * que.degree) * (1080);

    //case top wall
    var guide_top_x = 60 - Math.tan(degreeToRadian * (que.degree + 270)) * (guide_y - 60);
    var guide_top_y = 60;

    //case left wall
    var guide_left_x = 60;
    var guide_left_y = 60 + Math.tan(degreeToRadian * que.degree ) * (guide_x -60);

    //case bottom wall
    var guide_bottom_x = now_ball.x -  550 / Math.tan(degreeToRadian * que.degree);
    var guide_bottom_y = 610;


    if (isfirst2) {
        guide_x2 = guide_right_x;
        guide_y2 = guide_right_y;
    }


    //case right to top
    if (guide_y2 <= 60 && (guide_x2 >= 60 || guide_x2 <= 1140)) {
        guide_x2 = guide_top_x; // 가변값
        guide_y2 = guide_top_y; // 60
        isfirst2 = false;
        console.log(guide_x2 + ' ' + guide_y2);
        console.log("top")
        console.log("top");
    }

    //case top to left
    if (guide_x2 <= 60 && (guide_y2 > 60 || guide_y2 <= 610)) {
        guide_x2 = guide_left_x; //가변값
        guide_y2 = guide_left_y; //610
        console.log(guide_x2 + ' ' + guide_y2);
        console.log("left");
    }

    //cace left to bottom
    if (guide_y2 >= 610 && (guide_x2 >= 60 || guide_x2 < 1140)) {
        guide_x2 = guide_bottom_x; //60
        guide_y2 = guide_bottom_y; //가변값
        console.log("bottom");
    }

    //case bottom to right
    if (guide_x2 >= 1140 && (guide_y2 >= 60 || guide_y2 < 610)) {
        guide_x2 = guide_right_x; // 1140
        guide_y2 = guide_right_y; // 가변값
        console.log("right");
    }

    ctx.setLineDash([5, 10]);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(guide_x, guide_y);
    ctx.lineTo(guide_x2, guide_y2);
    ctx.stroke();

}


