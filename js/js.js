const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

let x1,y1,x2,y2;
let clicks = 1;
let points = [];
let cancelButtonIsUsed = false;

const canvas = document.getElementById('drawing-place');
canvas.height = windowHeight;
canvas.width = windowWidth;
canvasBackgroundColor = 'lightgray';
canvas.style.backgroundColor = canvasBackgroundColor;
context = canvas.getContext('2d');
    
const returnButton = document.getElementById('return-button');
returnButton.addEventListener('click', function () {
    if (points.length > 0) {
        cancelButton.removeAttribute('disabled');
        deleteButton.removeAttribute('disabled');
    }

    context.clearRect(0,0,canvas.width,canvas.height);
    cancelButtonIsUsed = false;
    for (let i = 0; i < points.length; i++) {
        context.beginPath();
        context.moveTo(points[i].x,points[i].y);
        context.fillRect(points[i].x,points[i].y,3,3);
        i++;
        
        if (i === points.length) {
            return;
        }

        context.lineTo(points[i].x,points[i].y);
        context.fillRect(points[i].x,points[i].y,3,3);
        context.stroke();
    }
});

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', function () {
    if (points.length <= 3) {
        cancelButton.setAttribute('disabled','disabled');
        deleteButton.setAttribute('disabled','disabled');
    }

    cancelButtonIsUsed = true;
    context.clearRect(0, 0, canvas.width,canvas.height);
    if (!(points.length % 2 == 0)) {
        points.splice(-1,1);
        clicks = 1;
    }

    for (let i = 0; i < points.length - 2; i++) {
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

const deleteButton = document.getElementById('delete-button')
deleteButton.addEventListener('click', function () {
    cancelButton.setAttribute('disabled','disabled');
    returnButton.setAttribute('disabled','disabled');
    deleteButton.setAttribute('disabled','disabled');
    context.clearRect(0, 0, canvas.width,canvas.height);
    points = [];
    clicks = 1;
});

canvas.onmousedown = function (event) {
    event = event || window.event;
    if (points.length >= 0) {
        cancelButton.removeAttribute('disabled');
        returnButton.removeAttribute('disabled');
        deleteButton.removeAttribute('disabled');
    }
    
    if (clicks === 1) {
        if (cancelButtonIsUsed === true) {
            points.splice(-2,2);
            cancelButtonIsUsed = false;
        }

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
};