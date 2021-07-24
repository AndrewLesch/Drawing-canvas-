let x1,y1,x2,y2;
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let clicks = 1;
let points = [];
let canvas = document.getElementById('drawing-place');
canvas.height = windowHeight;
canvas.width = windowWidth;
canvasBackgroundColor = 'lightgray';
canvas.style.backgroundColor = canvasBackgroundColor;
context = canvas.getContext('2d');
    
const returnButton = document.getElementById("return-button");
returnButton.addEventListener("click", function () {
    context.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i < points.length; i++){
        console.log(i);
        context.beginPath();
        context.moveTo(points[i].x,points[i].y);
        context.fillRect(points[i].x,points[i].y,3,3);
        i++;
        context.lineTo(points[i].x,points[i].y);
        context.fillRect(points[i].x,points[i].y,3,3);
        context.stroke();
        console.log(i);
    }
});

const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", function () {
    context.clearRect(0,0,canvas.width,canvas.height);
    if (!(points.length % 2 == 0)) {
        points.splice(-1,1);
        clicks = 1;
    }

    for(var i=0;i < points.length - 2; i++){
        context.beginPath();
        context.moveTo(points[i].x,points[i].y);
        context.fillRect(points[i].x,points[i].y,3,3);
        i++;
        context.lineTo(points[i].x,points[i].y);
        context.fillRect(points[i].x,points[i].y,3,3);
        context.stroke();
        console.log(points);
    }
});

const deleteButton = document.getElementById("delete-button")
deleteButton.addEventListener("click", function () {
    context.clearRect(0,0,canvas.width,canvas.height);
    points = [];
    clicks = 1;
})

canvas.onmousedown = function (event) {
    event = event || window.event;

    if (clicks === 1) {
        x1 = event.clientX;
        y1 = event.clientY;
        context.fillRect(x1,y1-150,3,3);
        points.push({
            x: x1,
            y: y1-150,
        });
        clicks = 2;
    } else {
        x2 = event.clientX;
        y2 = event.clientY;
        context.fillRect(x2,y2-150,3,3);
        points.push({
            x: x2,
            y: y2-150,
        });
        clicks = 1;
        draw(x1,x2,y1,y2);
    }
};

function draw(x1,x2,y1,y2) {
    context.beginPath();
    context.moveTo(x1, y1-150);
    context.lineTo(x2, y2-150);
    context.stroke();
}





