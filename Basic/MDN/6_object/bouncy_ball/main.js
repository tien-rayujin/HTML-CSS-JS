// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


// Ball object template
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX; // velocity
    this.velY = velY;
    this.color = color;
    this.size = size; // radius
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // x, y is center of the ball
    // by adding size we can have offset from center to ball boundary (perimeter) to check collision between its and canvas boundary
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
      this.color = randomRGB();
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
      this.color = randomRGB();
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
      this.color = randomRGB();
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
      this.color = randomRGB();
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}


// initialize ball object
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-6, 6),
    random(-6, 6),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

// detect collision
Ball.prototype.collisisonDetect = function () {
  for (const ball of balls) {
    if (this != ball) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        // ball.color = this.color = randomRGB();

        ball.velX = -ball.velX;
        ball.vely = -ball.velY;

        this.velX = -this.velX;
        this.vely = -this.velY;
      }
    }
  }
};

// animation frame
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisisonDetect();
  }

  // request next animation frame, creating a recursive
  requestAnimationFrame(loop);
}

loop();