document.addEventListener("DOMContentLoaded", function() {

	var rectangle = document.getElementById("rectangle");
	var circle = document.getElementById("circle");
	var triangle = document.getElementById("triangle");
	var arrow = document.getElementById("arrow");
	var cor = "";

	cor = rectangle.getContext("2d");
	cor.rect(1, 1, 98, 98);
	cor.stroke();

	cor = circle.getContext("2d");
	cor.beginPath();
	cor.arc(51, 51, 48, 0, 2 * Math.PI);
	cor.stroke();

	cor = triangle.getContext("2d");
	cor.beginPath();
    cor.moveTo(48, 0);
    cor.lineTo(98, 98);
    cor.lineTo(0, 98);
    cor.closePath();
    cor.stroke();

    cor = arrow.getContext("2d");
	cor.beginPath();
    cor.moveTo(1, 35);
    cor.lineTo(50, 35);
    cor.lineTo(50, 20);
    cor.lineTo(98, 49);
    cor.lineTo(50, 80);
    cor.lineTo(50, 65);
    cor.lineTo(1, 65);
    cor.closePath();
    cor.stroke();

});

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    var target = document.getElementById('target');
    var canvas = target.getBoundingClientRect();
    var x = e.clientX - canvas.left;
    var y = e.clientY - canvas.top;

	var cor = target.getContext('2d');

	if(data == "rectangle")
		addRect(cor, x, y);
	else if(data == "circle")
		addCircle(cor, x, y);
	else if(data == "triangle")
		addTriangle(cor, x, y);
	else if(data == "arrow")
		addArrow(cor, x, y);
}

function ignore(e) {
    e.preventDefault();
}

var rectCount = 0;
var circleCount = 0;
var triangleCount = 0;
var arrowCount = 0;

function addRect(cor, x, y) {
	rectCount++;
	cor.beginPath();
	cor.rect(x-50, y-50, 98, 98);
	cor.closePath();
	cor.font = "14px Arial";
	cor.fillText("Rectangle "+rectCount, x-40, y+5);
	cor.stroke();
}

function addCircle(cor, x, y) {
	circleCount++;
	cor.beginPath();
	cor.arc(x, y, 48, 0, 2 * Math.PI);
	cor.font = "14px Arial";
	cor.fillText("Circle "+circleCount, x-25, y+7);
	cor.stroke();
}

function addTriangle(cor, x, y) {
	triangleCount++;
	cor.beginPath();
    cor.moveTo(x, y-48);
    cor.lineTo(x+48, y+48);
    cor.lineTo(x-48, y+48);
    cor.closePath();
	cor.font = "14px Arial";
	cor.fillText("Triangle "+triangleCount, x-35, y+35);
	cor.stroke();
}

function addArrow(cor, x, y) {
	arrowCount++;
	cor.beginPath();
    cor.moveTo(x-50, y-15);
    cor.lineTo(x, y-15);
    cor.lineTo(x, y-30);
    cor.lineTo(x+50, y);
    cor.lineTo(x, y+30);
    cor.lineTo(x, y+15);
    cor.lineTo(x-50, y+15);
    cor.closePath();
    cor.font = "14px Arial";
	cor.fillText("Arrow "+arrowCount, x-32, y+5);
    cor.stroke();
}