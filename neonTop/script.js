var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2 
}

window.addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;	
    canvas.height = window.innerHeight;
});

function Light(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function() {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
        c.fillStyle = this.color;
        c.fill();
        c.shadowColor = this.color;
        c.shadowBlur = 20;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.closePath();
    }
}

function getRadiansFromCoordinates(x, y) {
    return Math.atan2(y, x);
};

function Top() {
this.lights = [];
this.particleAmount = 23;
this.x = canvas.width / 2;
this.y = canvas.height / 2;

this.init = function() {
    for (var i = 0; i < this.particleAmount; i++) {
        var radius = 30 / i * 2;

        if (i == 0) {
                radius = 15;
        }

        var hue = (255 / this.particleAmount) * i;
        var color = "hsl(" + hue + ", 100%, 50%)";

        this.lights.push(new Light(i * 5, 0, radius, color));
    }
}

this.init();

this.draw = function(timer) {
    c.save();

    this.x += (mouse.x - this.x) * 0.05;
    this.y += (mouse.y - this.y) * 0.05;
    c.translate(this.x, this.y);
    c.rotate(timer);

    for (var i = 0; i < this.particleAmount; i++) {
        this.lights[i].draw();
    }

    c.restore();

}

}

var timer = 0;
var tops = [];
for (var i = 0; i < 1; i++) {
tops.push(new Top());
}

function animate() {
    window.requestAnimationFrame(animate);

    // console.log(mouse);
    console.log(getRadiansFromCoordinates(mouse.x, mouse.y))
    // console.log(timer);

    timer += 0.1;
    c.fillStyle = "rgba(18, 18, 18, 0.2)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < tops.length; i++) {
        tops[i].draw(timer);
    }

}

window.addEventListener("mousedown", function() {
    for (var i = 0; i < tops.length; i++) {
        tops[i].radius
    }	
});

animate();