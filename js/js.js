const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const heightOfTop = 204;

let x1,y1,x2,y2;
let isFirstPointExist = true;
let points = [];
let lastRemovedPointIndex = 0;
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

    context.clearRect(0, 0, canvas.width, canvas.height);
    // Пока не придумал как переписать на for Each красиво, поэтому для избежания багов остался for
    for (let i = 0; i < (points.length - (2 * lastRemovedPointIndex) + 2); i++) {
        drawFirstPartOfLine(points[i].x, points[i].y, colorOfLine, widthOfLine);
        i++;
        if (i === points.length) {
            return;
        }
        
        drawLastPartOfLine(points[i].x, points[i].y, colorOfLine, widthOfLine);

    }
    lastRemovedPointIndex--;
    if (lastRemovedPointIndex === 0) {
        returnButton.setAttribute('disabled', 'disabled');       
    }

    cancelButtonIsUsed = false;
});

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', function () {
    cancelButtonIsUsed = true;
    lastRemovedPointIndex++;

    if (points.length % 2 !== 0 && points.length <= 1) {
        points.splice(-1, 1);
        isFirstPointExist = true;
        lastRemovedPointIndex++;
    }

    if (points.length % 2 !== 0) {
        points.splice(-1, 1);
        isFirstPointExist = true;
    }

    if (lastRemovedPointIndex * 2 === points.length) {
        cancelButton.setAttribute('disabled', 'disabled');    
    }

    if (lastRemovedPointIndex !== 0) {
        returnButton.removeAttribute('disabled');    
    } 

    context.clearRect(0, 0, canvas.width,canvas.height);
    // Пока не придумал как переписать на for Each красиво, поэтому для избежания багов остался for
    for (let i = 0; i < points.length - (2 * lastRemovedPointIndex); i++) {
        drawFirstPartOfLine(points[i].x, points[i].y, colorOfLine, widthOfLine);
        i++;
        drawLastPartOfLine(points[i].x, points[i].y, colorOfLine, widthOfLine);
    }

    if (points.length === 0) {
        returnButton.setAttribute('disabled', 'disabled');
        cancelButton.setAttribute('disabled', 'disabled');
        lastRemovedPointIndex--;
    }
});

const deleteButton = document.getElementById('delete-button')
deleteButton.addEventListener('click', function () {
    cancelButton.setAttribute('disabled', 'disabled');
    returnButton.setAttribute('disabled', 'disabled');
    deleteButton.setAttribute('disabled', 'disabled');
    context.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    isFirstPointExist = true;
    lastRemovedPointIndex = 0;
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
    
    if (isFirstPointExist === true) {
        if (lastRemovedPointIndex >= 1 && cancelButtonIsUsed === true) {
            returnButton.setAttribute('disabled', 'disabled');
            points.splice(-lastRemovedPointIndex * 2, lastRemovedPointIndex * 2);
            lastRemovedPointIndex -= lastRemovedPointIndex;
            cancelButtonIsUsed = false;
        }

        if (cancelButtonIsUsed === true) {
            points.splice(-2, 2);
            lastRemovedPointIndex--;
        }

        x1 = event.clientX;
        y1 = event.clientY;
        context.fillRect(x1, y1 - heightOfTop, 3, 3);
        points.push({
            x: x1,
            y: y1 - heightOfTop,
            color : colorOfLine,
            lineWidth : widthOfLine,
        });
        isFirstPointExist = false;
        cancelButtonIsUsed = false;

        if (lastRemovedPointIndex === 0) {
            returnButton.setAttribute('disabled','disabled');
        }
    } else {
        x2 = event.clientX;
        y2 = event.clientY;
        context.fillRect(x2, y2 - heightOfTop, 3, 3);
        points.push({
            x: x2,
            y: y2 - heightOfTop,
            color : colorOfLine,
            lineWidth : widthOfLine,
        });
        isFirstPointExist = true;
        context.clearRect(x1, y1 - heightOfTop, 3, 3);
        context.clearRect(x2, y2 - heightOfTop, 3, 3);
        drawLine(x1, x2 ,y1, y2);
    }
};

function drawLine (x1, x2, y1, y2) {
    context.beginPath();
    context.moveTo(x1, y1 - heightOfTop);
    context.lineTo(x2, y2 - heightOfTop);
    context.stroke();
};
function drawFirstPartOfLine (x , y, color, width) {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(x, y);
}
function drawLastPartOfLine (x , y, color, width) {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.lineTo(x, y);
    context.stroke();
}
const brushPanel = document.getElementById('brush');
const dropDawn = document.getElementById('dropdown-content');

dropDawn.onclick = function (e) {
    widthOfLine = e.target.id;
}

brushPanel.addEventListener('click', function (event) {
    dropDawn.style.display = 'block';
})

document.onclick = function (e) {
    if (e.target.className !== 'brush') {
        dropDawn.style.display = 'none';
    }
}

const parent = document.querySelector('#palette');
    let picker = new Picker({
        parent: parent,
        popup: 'left',
        color: 'violet',
        editorFormat: 'rgb',
        onDone: function(color) {
            colorOfLine = color.rgbaString;
        },
    });