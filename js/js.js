const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

let x1,y1,x2,y2;
let clicks = 1;
let points = [];
let clicksOnCancelButton = 0;
let cancelButtonIsUsed = false;
let colorOfLine = "black";
let widthOfLine = 1;

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
        context.strokeStyle = points[i].color;
        context.lineWidth = points[i].lineWidth;
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.fillRect(points[i].x, points[i].y, 3, 3);
        i++;
        context.strokeStyle = points[i].color;
        context.lineWidth = points[i].lineWidth;
        if (i === points.length) {
            return;
        }

        context.lineTo(points[i].x, points[i].y);
        context.fillRect(points[i].x, points[i].y , 3, 3);
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
        context.strokeStyle = points[i].color;
        context.lineWidth = points[i].lineWidth;
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.fillRect(points[i].x, points[i].y, 3, 3);
        i++;
        context.strokeStyle = points[i].color;
        context.lineWidth = points[i].lineWidth;
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
    context.strokeStyle = colorOfLine;
    context.lineWidth = widthOfLine;
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
        context.fillRect(x1 ,y1-204, 3, 3);
        points.push({
            x: x1,
            y: y1-204,
            color : colorOfLine,
            lineWidth : widthOfLine,
        });
        clicks = 2;
        cancelButtonIsUsed = false;

        if (clicksOnCancelButton === 0) {
            returnButton.setAttribute('disabled','disabled');
        }
    } else {
        x2 = event.clientX;
        y2 = event.clientY;
        context.fillRect(x2, y2-204, 3, 3);
        points.push({
            x: x2,
            y: y2-204,
            color : colorOfLine,
            lineWidth : widthOfLine,
        });
        clicks = 1;
        draw(x1, x2 ,y1, y2);
    }
};

function draw(x1, x2, y1, y2) {
    context.beginPath();
    context.moveTo(x1, y1-204);
    context.lineTo(x2, y2-204);
    context.stroke();
};

const brushPanel = document.getElementById('brush');
const dropDawn = document.getElementById('dropdown-content');
dropDawn.onclick = function (event) {
    widthOfLine = event.target.id;
}
brushPanel.addEventListener('click', function (event) {
    dropDawn.style.display = 'block';
})
document.onclick = function (e) {
    if (e.target.className !== 'brush') {
        dropDawn.style.display = 'none';
    }
}

var parent = document.querySelector('#palette');
    var picker = new Picker({
        parent: parent,
        popup: 'left',
        color: 'violet',
        //alpha: false,
        //editor: false,
        editorFormat: 'rgb',
        onDone: function(color) {
            colorOfLine = color.rgbaString;
        },
    });