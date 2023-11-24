// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {

  constructor(x, y, velX, velY, color, size, exists = true) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = exists;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(Math.abs(this.velX));
    }

    if ((this.x - this.size) <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(Math.abs(this.velY));
    }

    if ((this.y - this.size) <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y, velX = 20, velY = 20, color = 'white', size = 10) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;


    window.addEventListener('keydown', (e) => {
      // switch (e.key) {
      //   case "a":
      //     this.x -= this.velX;
      //     break;
      //   case "d":
      //     this.x += this.velX;
      //     break;
      //   case "w":
      //     this.y -= this.velY;
      //     break;
      //   case "s":
      //     this.y += this.velY;
      //     break;
      // }

      // Update position based on pressed keys
      if (e.key == 'a') this.x -= this.velX;
      if (e.key == 'd') this.x += this.velX;
      if (e.key == 'w') this.y -= this.velY;
      if (e.key == 's') this.y += this.velY;
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
      this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
      this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
      this.y += this.size;
    }

    // this.x += this.velX;
    // this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          // ball.color = this.color = randomRGB();
          ball.exists = false;

          // increase player size
          this.size += ball.size / 5;

          // update score
          countBall--;
          score.textContent = `Ball count: ${countBall}`;
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

const player = new EvilCircle(width / 2, height / 2);

//the score counter
const score = document.querySelector('p');
let countBall = balls.length;
score.textContent = `Ball count: ${countBall}`;

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  player.draw();
  player.collisionDetect();
  player.checkBounds();

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  requestAnimationFrame(loop);
}

loop();
