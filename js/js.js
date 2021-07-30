const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

let x1,y1,x2,y2;
let clicks = 1;
let points = [];
let clicksOnCancelButton = 0;
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
    // Пока не придумал как переписать на for Each красиво, поэтому для избежания багов остался for
    for (let i = 0; i < (points.length - (2 * clicksOnCancelButton) + 2); i++) {
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.fillRect(points[i].x, points[i].y, 3, 3);
        i++;
        if (i === points.length) {
            return;
        }

        context.lineTo(points[i].x, points[i].y);
        context.fillRect(points[i].x, points[i].y ,3, 3);
        context.stroke();
    }
    clicksOnCancelButton--;
    if (clicksOnCancelButton === 0) {
        returnButton.setAttribute('disabled', 'disabled');       
    }

    cancelButtonIsUsed = false;
});

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', function () {
    cancelButtonIsUsed = true;
    clicksOnCancelButton++;

    if (points.length % 2 !== 0 && points.length <= 1) {
        points.splice(-1, 1);
        clicks = 1;
        clicksOnCancelButton++;
    }

    if (points.length % 2 !== 0) {
        points.splice(-1, 1);
        clicks = 1;
    }

    if (clicksOnCancelButton * 2 === points.length) {
        cancelButton.setAttribute('disabled', 'disabled');    
    }

    if (clicksOnCancelButton !== 0) {
        returnButton.removeAttribute('disabled');    
    } 

    context.clearRect(0, 0, canvas.width,canvas.height);
    // Пока не придумал как переписать на for Each красиво, поэтому для избежания багов остался for
    for (let i = 0; i < points.length - (2 * clicksOnCancelButton); i++) {
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.fillRect(points[i].x, points[i].y, 3, 3);
        i++;
        context.lineTo(points[i].x, points[i].y);
        context.fillRect(points[i].x, points[i].y, 3, 3);
        context.stroke();
    }

    if (points.length === 0) {
        returnButton.setAttribute('disabled', 'disabled');
        cancelButton.setAttribute('disabled', 'disabled');
        clicksOnCancelButton--;
    }
});

const deleteButton = document.getElementById('delete-button')
deleteButton.addEventListener('click', function () {
    cancelButton.setAttribute('disabled', 'disabled');
    returnButton.setAttribute('disabled', 'disabled');
    deleteButton.setAttribute('disabled', 'disabled');
    context.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    clicks = 1;
    clicksOnCancelButton = 0;
    cancelButtonIsUsed = false;
});

canvas.onmousedown = function (event) {
    event = event || window.event;
    if (points.length >= 0) {
        cancelButton.removeAttribute('disabled');
        deleteButton.removeAttribute('disabled');
    }
    
    if (clicks === 1) {
        if (clicksOnCancelButton >= 1 && cancelButtonIsUsed === true) {
            returnButton.setAttribute('disabled', 'disabled');
            points.splice(-clicksOnCancelButton * 2, clicksOnCancelButton * 2);
            clicksOnCancelButton -= clicksOnCancelButton;
            cancelButtonIsUsed = false
        }

        if (cancelButtonIsUsed === true) {
            points.splice(-2, 2);
            clicksOnCancelButton--;
        }

        x1 = event.clientX;
        y1 = event.clientY;
        context.fillRect(x1 ,y1-150, 3, 3);
        points.push({
            x: x1,
            y: y1-150,
        });
        clicks = 2;
        cancelButtonIsUsed = false;

        if (clicksOnCancelButton === 0) {
            returnButton.setAttribute('disabled','disabled');
        }
    } else {
        x2 = event.clientX;
        y2 = event.clientY;
        context.fillRect(x2, y2-150, 3, 3);
        points.push({
            x: x2,
            y: y2-150,
        });
        clicks = 1;
        draw(x1, x2 ,y1, y2);
    }
};

function draw(x1, x2, y1, y2) {
    context.beginPath();
    context.moveTo(x1, y1-150);
    context.lineTo(x2, y2-150);
    context.stroke();
};