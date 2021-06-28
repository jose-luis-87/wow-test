/* Animación back UI */

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var canvasbg = document.getElementById('canvasbg');
var ctxbg = canvasbg.getContext('2d');
canvasbg.height = window.innerHeight;
canvasbg.width = window.innerWidth;
var aBubbles = [];
var aBgBubbles = [];

function addBubble() {
  aBubbles.push(new Bubble('rgb(110, 80, 226)', 2.5));
}

function addBgBubble() {
  aBgBubbles.push(new Bubble('rgb(134, 110, 234)', 1.5));
}

class Bubble {
  constructor(color, ySpeed) {
    this.radius = (Math.random() * 180) + 10;
    this.life = true;
    this.x = (Math.random() * window.innerWidth);
    this.y = (Math.random() * 40 + (window.innerHeight + this.radius));
    this.vy = ((Math.random() * 0.002) + 0.01) + ySpeed;
    this.vr = 0;
    this.vx = (Math.random() * 3) - 2;
    this.color = color;
  }
  update() {
    this.vy += .000001;
    this.vr += .0025;
    this.y -= this.vy;
    this.x += this.vx;
    if (this.radius > 1)
      this.radius -= this.vr;
    if (this.radius <= 1)
      this.life = false;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function update() {
  for (let i = aBubbles.length - 1; i >= 0; i--) {
    aBubbles[i].update();

    if (!aBubbles[i].life)
      aBubbles.splice(i, 1);
  }

  for (let i = aBgBubbles.length - 1; i >= 0; i--) {
    aBgBubbles[i].update();

    if (!aBgBubbles[i].life)
      aBgBubbles.splice(i, 1);
  }

  if (aBubbles.length < (window.innerWidth / 4))
    addBubble();

  if (aBgBubbles.length < (window.innerWidth / 12))
    addBgBubble();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxbg.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = aBgBubbles.length - 1; i >= 0; i--) {
    aBgBubbles[i].draw(ctxbg);
  }
  for (let i = aBubbles.length - 1; i >= 0; i--) {
    aBubbles[i].draw(ctx);
  }
}

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}

window.addEventListener('load', animate);
window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvasbg.height = window.innerHeight;
  canvasbg.width = window.innerWidth;
  aBubbles = [];
  aBgBubbles = [];
});

$(document).ready(function () {
    $("#games").fadeOut();
    $("#root").load('./shared/views/Idiomas.html');
    //document.documentElement.requestFullscreen();
});
