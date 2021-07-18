// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: innerWidth / 2, 
    y: innerHeight / 2
};

addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener('mousedown', () => {
    particles = [];
});


// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let hue = 140;
let lightness = 25;

if (innerWidth > 1024) {
    lightness = 50;
}

// Objects
function Particle(x, y, v, radius, color) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.radius = radius;
    this.color = 'hsl(' + hue + ', 85%,' + lightness + '%)';

    this.update = function() {
        this.draw();

        this.x += Math.random() > 0.5 ? v : -v;
        this.y += Math.random() > 0.5 ? v : -v;
    };
}

Particle.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
};


// Implementation
let particles = [];

// Animation Loop
let goingUp = true;
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(18,18,18, 0.03)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (hue < 255 && goingUp === true) {
        hue += 0.5;
    } else {
        goingUp = false;
        hue -= 0.5;
    }

    if (hue < 130 && goingUp === false) {
        goingUp = true;
    }

    if (particles.length < 2500) {
        const v = randomIntFromRange(2, 4);
        let x = mouse.x + randomIntFromRange(-35, 35);
        let y = mouse.y + randomIntFromRange(-35, 35);
        particles.push(new Particle(x, y, v, 1, 'blue'));
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

animate();