function swirl(x, y, version) {
  push();
  noStroke();
  fill(255);
  if (version === 0) {
    rect(x - 35, y - 5, 5, 25);
    rect(x - 30, y - 20, 5, 15);
    rect(x - 25, y - 25, 5);
    rect(x - 25, y, 5, 15);
    rect(x - 20, y - 30, 35, 5);
    rect(x - 20, y - 15, 5, 15);
    rect(x - 20, y + 15, 5);
    rect(x - 15, y - 20, 15, 5);
    rect(x - 15, y + 20, 10, 5);
    rect(x - 10, y + 5, 5, 10);
    rect(x - 5, y, 5);
    rect(x - 5, y + 10, 5);
    rect(x - 5, y + 25, 25, 5);
    rect(x, y - 15, 10, 5);
    rect(x, y + 15, 10, 5);
    rect(x + 10, y - 10, 5);
    rect(x + 10, y + 10, 5);
    rect(x + 15, y - 25, 10, 5);
    rect(x + 15, y - 5, 5, 15);
    rect(x + 20, y + 20, 5);
    rect(x + 25, y - 20, 5);
    rect(x + 25, y + 10, 5, 10);
    rect(x + 30, y - 15, 5, 25);
  } else if (version === 1) {
    rect(x - 25, y - 5, 5);
    rect(x - 20, y - 10, 15, 5);
    rect(x - 5, y - 5, 10, 5);
    rect(x + 5, y, 15, 5);
    rect(x + 20, y - 5, 5);
  }
  pop();
}

function star(x, y, version, fill) {
  push();
  noStroke();
  fill(255);
  if (version === 0) {
    rect(x - 20, y - 5, 35, 5);
    rect(x - 5, y - 20, 5, 35);
    rect(x - 10, y - 10, 15);
    rect(x - 15, y - 15, 5);
    rect(x - 15, y + 5, 5);
    rect(x + 5, y - 15, 5);
    rect(x + 5, y + 5, 5);
  } else if (version === 1) {
    if (fill === true) {
      push();
      fill(255, 255, 255, 190);
      rect(x - 30, y - 20, 60, 50);
      rect(x - 30, y + 30, 20, 5);
      rect(x + 10, y + 30, 20, 5);
      rect(x - 40, y - 15, 10);
      rect(x - 35, y - 5, 5);
      rect(x + 30, y - 15, 10);
      rect(x + 30, y - 5, 5);
      rect(x - 15, y - 25, 30, 5);
      rect(x - 10, y - 35, 20, 10);
      rect(x - 5, y - 40, 10, 5);
      pop();
    }
    rect(x - 45, y - 15, 5, 10);
    rect(x - 40, y - 20, 25, 5);
    rect(x - 40, y - 5, 5);
    rect(x - 35, y, 5);
    rect(x - 35, y + 15, 5, 20);
    rect(x - 30, y + 5, 5, 10);
    rect(x - 30, y + 35, 20, 5);
    rect(x - 20, y - 25, 5);
    rect(x - 15, y - 35, 5, 10);
    rect(x - 10, y - 40, 5);
    rect(x - 10, y + 30, 5);
    rect(x - 5, y - 45, 10, 5);
    rect(x - 5, y + 25, 10, 5);
    rect(x + 5, y - 40, 5);
    rect(x + 5, y + 30, 5);
    rect(x + 10, y - 35, 5, 10);
    rect(x + 10, y + 35, 20, 5);
    rect(x + 15, y - 25, 5);
    rect(x + 15, y - 20, 25, 5);
    rect(x + 25, y + 5, 5, 10);
    rect(x + 30, y, 5);
    rect(x + 30, y + 15, 5, 20);
    rect(x + 35, y - 5, 5);
    rect(x + 40, y - 15, 5, 10);
  } else if (version === 2) {
    if (fill === true) {
      push();
      fill(255, 255, 255, 190);
      rect(x - 20, y - 5, 5);
      rect(x + 10, y - 5, 5);
      rect(x - 5, y - 35, 5, 65);
      rect(x - 15, y - 20, 10, 35);
      rect(x, y - 20, 10, 35);
      pop();
    }
    rect(x - 30, y - 5, 10, 5);
    rect(x - 20, y - 10, 5);
    rect(x - 20, y, 5);
    rect(x - 15, y - 20, 5, 10);
    rect(x - 15, y + 5, 5, 10);
    rect(x - 10, y - 35, 5, 15);
    rect(x - 10, y + 15, 5, 15);
    rect(x - 5, y - 45, 5, 10);
    rect(x - 5, y + 30, 5, 10);
    rect(x, y - 35, 5, 15);
    rect(x, y + 15, 5, 15);
    rect(x + 5, y - 20, 5, 10);
    rect(x + 5, y + 5, 5, 10);
    rect(x + 10, y - 10, 5);
    rect(x + 10, y, 5);
    rect(x + 15, y - 5, 10, 5);
  } else if (version === 3) {
    rect(x - 10, y - 5, 15, 5);
    rect(x - 5, y - 10, 5, 15);
  }
  pop();
}

function sprite(x, y) {
  push();
  noStroke();
  fill(255);
  //BODY
  rect(x - 35, y - 15, 5);
  rect(x - 35, y - 5, 5);
  rect(x - 35, y + 5, 5);
  rect(x - 30, y - 25, 5);
  rect(x - 30, y - 15, 5, 25);
  rect(x - 30, y + 15, 5);
  rect(x - 25, y - 30, 5);
  rect(x - 25, y - 20, 5);
  rect(x - 25, y + 10, 5);
  rect(x - 25, y + 20, 5);
  rect(x - 20, y - 35, 5);
  rect(x - 20, y - 25, 5);
  rect(x - 20, y + 15, 5);
  rect(x - 15, y - 30, 30, 5);
  rect(x - 15, y + 20, 30, 5);
  rect(x - 15, y + 25, 5);
  rect(x - 10, y - 35, 5);
  rect(x - 5, y + 25, 5);
  rect(x, y - 35, 5);
  rect(x + 5, y + 25, 5);
  rect(x + 10, y - 35, 5);
  rect(x + 15, y - 25, 5);
  rect(x + 15, y + 15, 5);
  rect(x + 15, y + 25, 5);
  rect(x + 20, y - 30, 5);
  rect(x + 20, y - 20, 5);
  rect(x + 20, y + 10, 5);
  rect(x + 20, y + 20, 5);
  rect(x + 25, y - 25, 5);
  rect(x + 25, y - 15, 5, 25);
  rect(x + 25, y + 15, 5);
  rect(x + 30, y - 15, 5);
  rect(x + 30, y - 5, 5);
  rect(x + 30, y + 5, 5);
  //EYES
  rect(x - 20, y - 10, 10, 15);
  rect(x - 10, y - 10, 5, 15);
  push();
  fill(0);
  rect(x - 10, y - 5, 5);
  pop();
  rect(x + 5, y - 10, 5, 15);
  rect(x + 10, y - 10, 10, 15);
  push();
  fill(0);
  rect(x + 5, y - 5, 5);
  pop();
  pop();
}

function jellyfish(x, y, fill) {
  push();
  noStroke();
  fill(255);
  if (fill === true) {
    push();
    fill(255, 255, 255, 190);
    rect(x + 10, y + 10, 5);
    rect(x - 40, y - 10, 75, 20);
    rect(x - 25, y - 15, 45, 5);
    rect(x - 10, y - 20, 15, 5);
    pop();
  }
  //HEAD
  rect(x - 45, y - 5, 5, 10);
  rect(x - 40, y - 10, 10, 5);
  rect(x - 40, y + 5, 5);
  rect(x - 35, y + 10, 15, 5);
  rect(x - 30, y - 15, 5);
  rect(x - 25, y - 20, 15, 5);
  rect(x - 20, y + 5, 10, 5);
  rect(x - 10, y - 25, 15, 5);
  rect(x - 10, y + 10, 20, 5);
  rect(x + 5, y - 20, 15, 5);
  rect(x + 10, y + 15, 5);
  rect(x + 15, y + 10, 15, 5);
  rect(x + 20, y - 15, 5);
  rect(x + 25, y - 10, 10, 5);
  rect(x + 30, y + 5, 5);
  rect(x + 35, y - 5, 5, 10);
  //TRANSLUCENT ARMS FROM LEFT TO RIGHT
  push();
  //ONE
  fill(255, 255, 255, 50);
  rect(x - 40, y + 10, 5, 10);
  rect(x - 45, y + 20, 20, 10);
  rect(x - 50, y + 30, 20, 15);
  rect(x - 40, y + 45, 5);
  rect(x - 35, y + 50, 5);
  //TWO
  rect(x + 30, y + 10, 5);
  rect(x + 15, y + 15, 20, 5);
  rect(x + 10, y + 20, 20, 5);
  rect(x + 5, y + 25, 25, 5);
  rect(x, y + 30, 25, 10);
  rect(x - 5, y + 40, 25, 15);
  rect(x - 5, y + 55, 20, 5);
  rect(x, y + 60, 15, 10);
  rect(x + 5, y + 70, 15, 10);
  rect(x + 10, y + 80, 15, 5);
  rect(x + 15, y + 85, 10);
  rect(x + 15, y + 95, 5, 10);
  rect(x + 10, y + 105, 5);
  //THREE
  rect(x - 30, y + 15, 5);
  rect(x - 30, y + 75, 5, 35);
  rect(x - 25, y + 15, 5, 10);
  rect(x - 25, y + 60, 5, 40);
  rect(x - 25, y + 110, 5, 10);
  rect(x - 20, y + 10, 5, 30);
  rect(x - 20, y + 50, 5, 35);
  rect(x - 15, y + 10, 5, 70);
  rect(x - 10, y + 20, 5, 55);
  rect(x - 5, y + 30, 5, 35);
  rect(x, y + 35, 5, 20);
  //FOUR
  rect(x + 20, y + 60, 5, 10);
  rect(x + 25, y + 15, 5);
  rect(x + 25, y + 35, 5, 15);
  rect(x + 25, y + 55, 5);
  rect(x + 30, y + 10, 5, 45);
  rect(x + 35, y + 5, 5, 45);
  rect(x + 40, y + 15, 5, 30);
  rect(x + 45, y + 20, 5, 15);
  pop();
  //TENTACLES FROM LEFT TO RIGHT:
  //ONE
  rect(x - 45, y + 40, 5, 10);
  rect(x - 45, y + 105, 5);
  rect(x - 40, y + 25, 5, 15);
  rect(x - 40, y + 50, 5, 20);
  rect(x - 40, y + 100, 5);
  rect(x - 35, y + 15, 5, 10);
  rect(x - 35, y + 70, 5, 10);
  rect(x - 35, y + 90, 5, 10);
  rect(x - 30, y + 80, 5, 10);
  //TWO
  rect(x - 20, y + 20, 5, 10);
  rect(x - 15, y + 15, 5);
  rect(x - 15, y + 30, 5);
  rect(x - 15, y + 65, 5, 15);
  rect(x - 10, y + 35, 5, 15);
  rect(x - 10, y + 60, 5);
  rect(x - 10, y + 80, 5, 10);
  rect(x - 10, y + 95, 5, 10);
  rect(x - 5, y + 50, 5, 10);
  rect(x - 5, y + 90, 5);
  rect(x - 5, y + 105, 5);
  rect(x - 5, y + 115, 5, 10);
  //THREE
  rect(x, y + 75, 5, 15);
  rect(x, y + 95, 5, 20);
  rect(x + 5, y + 15, 5, 10);
  rect(x + 5, y + 55, 5, 20);
  rect(x + 5, y + 115, 5);
  rect(x + 10, y + 25, 5);
  rect(x + 10, y + 40, 5, 15);
  rect(x + 10, y + 120, 5);
  rect(x + 15, y + 30, 5, 10);
  //FOUR
  rect(x + 20, y + 15, 5);
  rect(x + 25, y + 20, 5, 20);
  rect(x + 25, y + 80, 5, 10);
  rect(x + 30, y + 40, 5, 10);
  rect(x + 30, y + 65, 5, 15);
  rect(x + 30, y + 90, 5, 10);
  rect(x + 35, y + 50, 5, 15);
  rect(x + 35, y + 100, 5, 15);
  rect(x + 40, y + 115, 5);
  pop();
}

class Critter {
  constructor(x, y, shape, maxSpeed, maxForce) {
    this.shape = shape;
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = 1440;
    } else if (this.position.x > 1440) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = 825;
    } else if (this.position.y > 825) {
      this.position.y = 0;
    }
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(255);
    if (this.shape === "swirl0") {
      swirl(0, 0, 0);
    } else if (this.shape === "swirl1") {
      swirl(0, 0, 1);
    } else if (this.shape === "star0") {
      star(0, 0, 0);
    } else if (this.shape === "star1") {
      if (Math.random() < 0.5) {
        star(0, 0, 1);
      } else {
        star(0, 0, 1, true);
      }
    } else if (this.shape === "star2") {
      if (Math.random() < 0.5) {
        star(0, 0, 2);
      } else {
        star(0, 0, 2, true);
      }
    } else if (this.shape === "star3") {
      star(0, 0, 3);
    } else if (this.shape === "sprite") {
      sprite(0, 0);
    } else if (this.shape === "jellyfish") {
      if (Math.random() < 0.5) {
        jellyfish(0, 0);
      } else {
        jellyfish(0, 0, true);
      }
    }
    pop();
  }
}

const fieldSize = 50;
const fieldSizeHalf = fieldSize / 2;
const maxCols = Math.ceil(1440 / fieldSize);
const maxRows = Math.ceil(825 / fieldSize);
let shapes = [
  "swirl0",
  "swirl1",
  "star0",
  "star1",
  "star2",
  "star3",
  "sprite",
  "jellyfish",
];
let field;
let critters = [];

function setup() {
  field = generateField();
  generateCritters();
}

function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / 10, y / 10) * Math.PI * 2;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}

function generatecritters() {
  for (let i = 0; i < 200; i++) {
    let critter = new Critter(
      Math.random() * 1440,
      Math.random() * 825,
      random(shapes),
      4,
      0.1
    );
    critters.push(critter);
  }
}

function drawCritters() {
  for (let x = 0; x < maxCols; x++) {
    for (let y = 0; y < maxRows; y++) {
      const value = field[x][y];
      push();
      translate(x * fieldSize + fieldSizeHalf, y * fieldSize + fieldSizeHalf);
      rotate(value.heading());
      pop();
    }
  }

  for (let critter of critters) {
    const x = Math.floor(critter.position.x / fieldSize);
    const y = Math.floor(critter.position.y / fieldSize);
    const desiredDirection = field[x][y];
    critter.follow(desiredDirection);
    critter.update();
    critter.checkBorders();
    critter.draw();
  }
}
