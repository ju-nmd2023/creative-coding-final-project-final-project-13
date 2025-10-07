class Critter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  swirl(version) {
    push();
    noStroke();
    fill(255);
    if (version === 0) {
      rect(this.x - 35, this.y - 5, 5, 25);
      rect(this.x - 30, this.y - 20, 5, 15);
      rect(this.x - 25, this.y - 25, 5);
      rect(this.x - 25, this.y, 5, 15);
      rect(this.x - 20, this.y - 30, 35, 5);
      rect(this.x - 20, this.y - 15, 5, 15);
      rect(this.x - 20, this.y + 15, 5);
      rect(this.x - 15, this.y - 20, 15, 5);
      rect(this.x - 15, this.y + 20, 10, 5);
      rect(this.x - 10, this.y + 5, 5, 10);
      rect(this.x - 5, this.y, 5);
      rect(this.x - 5, this.y + 10, 5);
      rect(this.x - 5, this.y + 25, 25, 5);
      rect(this.x, this.y - 15, 10, 5);
      rect(this.x, this.y + 15, 10, 5);
      rect(this.x + 10, this.y - 10, 5);
      rect(this.x + 10, this.y + 10, 5);
      rect(this.x + 15, this.y - 25, 10, 5);
      rect(this.x + 15, this.y - 5, 5, 15);
      rect(this.x + 20, this.y + 20, 5);
      rect(this.x + 25, this.y - 20, 5);
      rect(this.x + 25, this.y + 10, 5, 10);
      rect(this.x + 30, this.y - 15, 5, 25);
    } else if (version === 1) {
      rect(this.x - 25, this.y - 5, 5);
      rect(this.x - 20, this.y - 10, 15, 5);
      rect(this.x - 5, this.y - 5, 10, 5);
      rect(this.x + 5, this.y, 15, 5);
      rect(this.x + 20, this.y - 5, 5);
    }
    pop();
  }

  star(version) {
    push();
    noStroke();
    fill(255);
    if (version === 0) {
      rect(this.x - 20, this.y - 5, 35, 5);
      rect(this.x - 5, this.y - 20, 5, 35);
      rect(this.x - 10, this.y - 10, 15);
      rect(this.x - 15, this.y - 15, 5);
      rect(this.x - 15, this.y + 5, 5);
      rect(this.x + 5, this.y - 15, 5);
      rect(this.x + 5, this.y + 5, 5);
    } else if (version === 1) {
      rect(this.x - 45, this.y - 15, 5, 10);
      rect(this.x - 40, this.y - 20, 25, 5);
      rect(this.x - 40, this.y - 5, 5);
      rect(this.x - 35, this.y, 5);
      rect(this.x - 35, this.y + 15, 5, 20);
      rect(this.x - 30, this.y + 5, 5, 10);
      rect(this.x - 30, this.y + 35, 20, 5);
      rect(this.x - 20, this.y - 25, 5);
      rect(this.x - 15, this.y - 35, 5, 10);
      rect(this.x - 10, this.y - 40, 5);
      rect(this.x - 10, this.y + 30, 5);
      rect(this.x - 5, this.y - 45, 10, 5);
      rect(this.x - 5, this.y + 25, 10, 5);
      rect(this.x + 5, this.y - 40, 5);
      rect(this.x + 5, this.y + 30, 5);
      rect(this.x + 10, this.y - 35, 5, 10);
      rect(this.x + 10, this.y + 35, 20, 5);
      rect(this.x + 15, this.y - 25, 5);
      rect(this.x + 15, this.y - 20, 25, 5);
      rect(this.x + 25, this.y + 5, 5, 10);
      rect(this.x + 30, this.y, 5);
      rect(this.x + 30, this.y + 15, 5, 20);
      rect(this.x + 35, this.y - 5, 5);
      rect(this.x + 40, this.y - 15, 5, 10);
    } else if (version === 2) {
      rect(this.x - 30, this.y - 5, 10, 5);
      rect(this.x - 20, this.y - 10, 5);
      rect(this.x - 20, this.y, 5);
      rect(this.x - 15, this.y - 20, 5, 10);
      rect(this.x - 15, this.y + 5, 5, 10);
      rect(this.x - 10, this.y - 35, 5, 15);
      rect(this.x - 10, this.y + 15, 5, 15);
      rect(this.x - 5, this.y - 45, 5, 10);
      rect(this.x - 5, this.y + 30, 5, 10);
      rect(this.x, this.y - 35, 5, 15);
      rect(this.x, this.y + 15, 5, 15);
      rect(this.x + 5, this.y - 20, 5, 10);
      rect(this.x + 5, this.y + 5, 5, 10);
      rect(this.x + 10, this.y - 10, 5);
      rect(this.x + 10, this.y, 5);
      rect(this.x + 15, this.y - 5, 10, 5);
    } else if (version === 3) {
      rect(this.x - 10, this.y - 5, 15, 5);
      rect(this.x - 5, this.y - 10, 5, 15);
    }
    pop();
  }

  sprite() {
    push();
    noStroke();
    fill(255);
    //BODY
    rect(this.x - 35, this.y - 15, 5);
    rect(this.x - 35, this.y - 5, 5);
    rect(this.x - 35, this.y + 5, 5);
    rect(this.x - 30, this.y - 25, 5);
    rect(this.x - 30, this.y - 15, 5, 25);
    rect(this.x - 30, this.y + 15, 5);
    rect(this.x - 25, this.y - 30, 5);
    rect(this.x - 25, this.y - 20, 5);
    rect(this.x - 25, this.y + 10, 5);
    rect(this.x - 25, this.y + 20, 5);
    rect(this.x - 20, this.y - 35, 5);
    rect(this.x - 20, this.y - 25, 5);
    rect(this.x - 20, this.y + 15, 5);
    rect(this.x - 15, this.y - 30, 30, 5);
    rect(this.x - 15, this.y + 20, 30, 5);
    rect(this.x - 15, this.y + 25, 5);
    rect(this.x - 10, this.y - 35, 5);
    rect(this.x - 5, this.y + 25, 5);
    rect(this.x, this.y - 35, 5);
    rect(this.x + 5, this.y + 25, 5);
    rect(this.x + 10, this.y - 35, 5);
    rect(this.x + 15, this.y - 25, 5);
    rect(this.x + 15, this.y + 15, 5);
    rect(this.x + 15, this.y + 25, 5);
    rect(this.x + 20, this.y - 30, 5);
    rect(this.x + 20, this.y - 20, 5);
    rect(this.x + 20, this.y + 10, 5);
    rect(this.x + 20, this.y + 20, 5);
    rect(this.x + 25, this.y - 25, 5);
    rect(this.x + 25, this.y - 15, 5, 25);
    rect(this.x + 25, this.y + 15, 5);
    rect(this.x + 30, this.y - 15, 5);
    rect(this.x + 30, this.y - 5, 5);
    rect(this.x + 30, this.y + 5, 5);
    //EYES
    rect(this.x - 20, this.y - 10, 10, 15);
    rect(this.x - 10, this.y - 10, 5, 15);
    push();
    fill(0);
    rect(this.x - 10, this.y - 5, 5);
    pop();
    rect(this.x + 5, this.y - 10, 5, 15);
    rect(this.x + 10, this.y - 10, 10, 15);
    push();
    fill(0);
    rect(this.x + 5, this.y - 5, 5);
    pop();
    pop();
  }

  jellyfish() {
    push();
    noStroke();
    fill(255);
    //HEAD
    rect(this.x - 45, this.y - 5, 5, 10);
    rect(this.x - 40, this.y - 10, 10, 5);
    rect(this.x - 40, this.y + 5, 5);
    rect(this.x - 35, this.y + 10, 15, 5);
    rect(this.x - 30, this.y - 15, 5);
    rect(this.x - 25, this.y - 20, 15, 5);
    rect(this.x - 20, this.y + 5, 10, 5);
    rect(this.x - 10, this.y - 25, 15, 5);
    rect(this.x - 10, this.y + 10, 20, 5);
    rect(this.x + 5, this.y - 20, 15, 5);
    rect(this.x + 10, this.y + 15, 5);
    rect(this.x + 15, this.y + 10, 15, 5);
    rect(this.x + 20, this.y - 15, 5);
    rect(this.x + 25, this.y - 10, 10, 5);
    rect(this.x + 30, this.y + 5, 5);
    rect(this.x + 35, this.y - 5, 5, 10);
    //TRANSLUCENT ARMS FROM LEFT TO RIGHT
    push();
    //ONE
    fill(255, 255, 255, 50);
    rect(this.x - 40, this.y + 10, 5, 10);
    rect(this.x - 45, this.y + 20, 20, 10);
    rect(this.x - 50, this.y + 30, 20, 15);
    rect(this.x - 40, this.y + 45, 5);
    rect(this.x - 35, this.y + 50, 5);
    //TWO
    rect(this.x + 30, this.y + 10, 5);
    rect(this.x + 15, this.y + 15, 20, 5);
    rect(this.x + 10, this.y + 20, 20, 5);
    rect(this.x + 5, this.y + 25, 25, 5);
    rect(this.x, this.y + 30, 25, 10);
    rect(this.x - 5, this.y + 40, 25, 15);
    rect(this.x - 5, this.y + 55, 20, 5);
    rect(this.x, this.y + 60, 15, 10);
    rect(this.x + 5, this.y + 70, 15, 10);
    rect(this.x + 10, this.y + 80, 15, 5);
    rect(this.x + 15, this.y + 85, 10);
    rect(this.x + 15, this.y + 95, 5, 10);
    rect(this.x + 10, this.y + 105, 5);
    //THREE
    rect(this.x - 30, this.y + 15, 5);
    rect(this.x - 30, this.y + 75, 5, 35);
    rect(this.x - 25, this.y + 15, 5, 10);
    rect(this.x - 25, this.y + 60, 5, 40);
    rect(this.x - 25, this.y + 110, 5, 10);
    rect(this.x - 20, this.y + 10, 5, 30);
    rect(this.x - 20, this.y + 50, 5, 35);
    rect(this.x - 15, this.y + 10, 5, 70);
    rect(this.x - 10, this.y + 20, 5, 55);
    rect(this.x - 5, this.y + 30, 5, 35);
    rect(this.x, this.y + 35, 5, 20);
    //FOUR
    rect(this.x + 20, this.y + 60, 5, 10);
    rect(this.x + 25, this.y + 15, 5);
    rect(this.x + 25, this.y + 35, 5, 15);
    rect(this.x + 25, this.y + 55, 5);
    rect(this.x + 30, this.y + 10, 5, 45);
    rect(this.x + 35, this.y + 5, 5, 45);
    rect(this.x + 40, this.y + 15, 5, 30);
    rect(this.x + 45, this.y + 20, 5, 15);
    pop();
    //TENTACLES FROM LEFT TO RIGHT:
    //ONE
    rect(this.x - 45, this.y + 40, 5, 10);
    rect(this.x - 45, this.y + 105, 5);
    rect(this.x - 40, this.y + 25, 5, 15);
    rect(this.x - 40, this.y + 50, 5, 20);
    rect(this.x - 40, this.y + 100, 5);
    rect(this.x - 35, this.y + 15, 5, 10);
    rect(this.x - 35, this.y + 70, 5, 10);
    rect(this.x - 35, this.y + 90, 5, 10);
    rect(this.x - 30, this.y + 80, 5, 10);
    //TWO
    rect(this.x - 20, this.y + 20, 5, 10);
    rect(this.x - 15, this.y + 15, 5);
    rect(this.x - 15, this.y + 30, 5);
    rect(this.x - 15, this.y + 65, 5, 15);
    rect(this.x - 10, this.y + 35, 5, 15);
    rect(this.x - 10, this.y + 60, 5);
    rect(this.x - 10, this.y + 80, 5, 10);
    rect(this.x - 10, this.y + 95, 5, 10);
    rect(this.x - 5, this.y + 50, 5, 10);
    rect(this.x - 5, this.y + 90, 5);
    rect(this.x - 5, this.y + 105, 5);
    rect(this.x - 5, this.y + 115, 5, 10);
    //THREE
    rect(this.x, this.y + 75, 5, 15);
    rect(this.x, this.y + 95, 5, 20);
    rect(this.x + 5, this.y + 15, 5, 10);
    rect(this.x + 5, this.y + 55, 5, 20);
    rect(this.x + 5, this.y + 115, 5);
    rect(this.x + 10, this.y + 25, 5);
    rect(this.x + 10, this.y + 40, 5, 15);
    rect(this.x + 10, this.y + 120, 5);
    rect(this.x + 15, this.y + 30, 5, 10);
    //FOUR
    rect(this.x + 20, this.y + 15, 5);
    rect(this.x + 25, this.y + 20, 5, 20);
    rect(this.x + 25, this.y + 80, 5, 10);
    rect(this.x + 30, this.y + 40, 5, 10);
    rect(this.x + 30, this.y + 65, 5, 15);
    rect(this.x + 30, this.y + 90, 5, 10);
    rect(this.x + 35, this.y + 50, 5, 15);
    rect(this.x + 35, this.y + 100, 5, 15);
    rect(this.x + 40, this.y + 115, 5);
    pop();
  }
}

function setup() {
  createCanvas(1000, 1000);
  background(0);
}

function draw() {
  let swirl0 = new Critter(100, 100).swirl(0);
  let swirl1 = new Critter(200, 100).swirl(1);
  let star0 = new Critter(300, 100).star(0);
  let star1 = new Critter(400, 100).star(1);
  let star2 = new Critter(100, 400).star(2);
  let star3 = new Critter(200, 400).star(3);
  let sprite = new Critter(300, 400).sprite();
  let jellyfish = new Critter(450, 400).jellyfish();
  swirl0;
  swirl1;
  star0;
  star1;
  star2;
  star3;
  sprite;
  jellyfish;
  noLoop();
}
