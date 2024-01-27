const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particles = [];
const minDistance = 70;
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
let particleCount = Math.floor((height / 10) * 1.8);
if (window.innerWidth <= 400) {
    particleCount = 30;
}
const cursor = { x: 0, y: 0 };
// const attractionRadius = 50;
// const attractionStrength = 0.1;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.color = "#6bfffa";
        this.velocity = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
        };
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x > canvas.width || this.x < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    connect(particles) {//particales is an array
        const length = particles.length;
        for (let i = 0; i < length; i++) {
            const distance = Math.sqrt(
                Math.pow(this.x - particles[i].x, 2) +
                Math.pow(this.y - particles[i].y, 2)
            );

            if (distance < minDistance) {
                ctx.beginPath();
                ctx.strokeStyle = "#00fff762";
                ctx.lineWidth = 0.4
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particles[i].x, particles[i].y);
                ctx.stroke();
            }
        }
    }

    connectToCursor() {
        const distance = Math.sqrt(
            Math.pow(this.x - cursor.x, 2) + Math.pow(this.y - cursor.y, 2)
        );

        if (distance < 150) {
            ctx.beginPath();
            ctx.lineWidth = 0.8
            ctx.strokeStyle = "rgba(24, 201, 196, 0.9)";
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(cursor.x, cursor.y);
            ctx.stroke();
        }
    }
}

function init() {
    const { width, height } = canvas;
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particles) {
        particle.draw();
        particle.update();
        particle.connect(particles);
        if (window.innerWidth > 400) particle.connectToCursor();
    }
    requestAnimationFrame(animate);
}



function resizeCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

$(window).resize(resizeCanvas);
document.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});
init();
animate();