class Squish {
  constructor(x, y) {
    this.squish = createVector(x, y);
    const variation = 0.9 + Math.random();
    const direction = Math.random() * Math.PI * 2;
    this.velocity = createVector(
      Math.cos(direction) * variation,
      Math.sin(direction) * variation
    );
    this.time = 30 + Math.random() * 30;
  }
  update() {
    this.time--;
    this.velocity.mult(0.99);
    this.squish.add(this.velocity);
  }
  draw() {
    push();
    translate(this.squish.x, this.squish.y);
    fill(255, 255, 255, 8);
    noStroke();
    rect(0, 0, 10, 10);
    pop();
  }
  evap() {
    return this.time <= 0;
  }
}

export { Squish };
