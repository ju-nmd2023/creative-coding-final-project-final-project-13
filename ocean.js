import { Critter } from "./critters.js";
//REFERENCES
//https://codepen.io/pixelkind/pen/JjwGQgd - the following code was created with the help of this tutorial
//https://chatgpt.com/share/68e569bc-9108-8003-be50-cb73fb308bed - the following code was created with the help of chatGPT
//https://tonejs.github.io/docs/14.9.17/index.html - this website was used to understand Tone.js
//https://codepen.io/pixelkind/pen/wvRMVwy - the following code was created with the help of this tutorial
//https://ffd8.github.io/p5.glitch/ - this website was used to understand the p5.glitch library

//VARIABLES
//handpose variables
let video;
let handpose;
let predictions = [];
let pointer;
let thumb;

//glitch variables
let glitch;

//sound effect variables
const monoSynth = new Tone.MetalSynth().toDestination();

//time management for water movement and water variation
let waterTime = 0;

//critter variables
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

/*-----------------SOUND SETUP-----------------*/
//background music
window.addEventListener("click", () => {
  Tone.start();
});

window.addEventListener("load", () => {
  const melody = new Tone.Player(
    "Underground-Stream_Looping.mp3"
  ).toDestination();
  melody.autostart = true;
  melody.loop = true;
  melody.volume.value = -10;
  melody.fadeIn = 15;
  melody.fadeOut = 5;
});

function mousePressed(/*change this so if fits with the movement detector later!!*/) {
  monoSynth.triggerAttackRelease("C7", "8n", 0);
  monoSynth.triggerAttackRelease("C6", "8n", 0 + 0.5);
}
window.mousePressed = mousePressed;

/*---------------SETUP FUNCTIONS-----------------*/
/* function preload() {
  handpose = ml5.handPose();
}
window.preload = preload; */

function setup() {
  //basics
  createCanvas(1440, 825);
  //frameRate(3); //CAN WE DELETE THIS?
  //critters & flowfields
  field = generateField();
  generateCritters();

  /*   //video recording & hand detection
  video = createCapture(VIDEO);
  video.hide();
  handpose.detectStart(video, getHandsData); */

  //initiate glitch
  glitch = new Glitch();
}
window.setup = setup;

/*----------------HANDPOSE----------------*/
function getHandsData(results) {
  predictions = results;
}

function squish() {
  //base code for tracking pointer & thumb
  for (let hand of predictions) {
    const keypoints = hand.keypoints;
    for (let keypoint of keypoints) {
      if (keypoint.name === "index_finger_tip") {
        pointer = keypoint;
      } else if (keypoint.name === "thumb_tip") {
        thumb = keypoint;
      }
    }
  }
}

/*---------------OTHER FUNCTIONS----------------*/
//water variation function - TRYING TO MAKE IT WORK WITH THE PERLIN NOISE :(
function drawWaterVariation() {
  push();
  noStroke();
  const waterVariationFields = 200;
  const variationWidth = 1440 / waterVariationFields;
  const variationHeight = 825 / waterVariationFields;
  for (let xVariation = 0; xVariation < waterVariationFields; xVariation++) {
    for (let yVariation = 0; yVariation < waterVariationFields; yVariation++) {
      if (Math.random() < 0.0001) {
        fill(0, 0, 255, 30);
      } else {
        noFill();
      }
      ellipse(xVariation * variationWidth, yVariation * variationHeight, 10);
    }
  }
  pop();
}

//perlin noise - make the water move
function drawWaterMovement() {
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let waterNoise = noise(0.01 * x, 0.01 * y, waterTime);
      noStroke();
      fill(10, 10, 0 + waterNoise * 150);
      rect(x, y, 10, 10);
    }
  }
  waterTime += 0.08;
}

//glitch function
function glitchThis() {
  glitch.resetBytes();
  glitch.loadQuality(0.8);
  glitch.loadImage("background.png");
  glitch.limitBytes(0, 1);
  glitch.randomBytes(5);
  glitch.buildImage();
  image(glitch.image, 0, 0, 1440, 825);
}

/*---------BACKGROUND DRAW FUNCTIONS---------*/
function drawCliff1() {
  //cliff
  push();
  fill(0, 0, 30);
  noStroke();
  rect(0, 0, 40, 825);
  rect(40, 30, 20, 825);
  rect(60, 70, 10, 825);
  rect(70, 100, 20, 825);
  rect(90, 160, 15, 825);
  rect(105, 200, 30, 825);
  rect(135, 260, 40, 825);
  rect(175, 320, 20, 825);
  rect(195, 350, 30, 825);
  rect(225, 445, 20, 825);
  rect(225, 510, 30, 825);
  rect(245, 580, 30, 825);
  rect(270, 660, 30, 825);
  rect(300, 700, 40, 825);
  rect(340, 800, 45, 825);
  pop();

  //cliff shadows
  push();
  fill(0, 0, 20);
  noStroke();
  rect(0, 250, 40, 825);
  rect(40, 300, 40, 825);
  rect(80, 350, 40, 825);
  rect(120, 400, 40, 825);
  rect(160, 600, 40, 825);
  rect(200, 730, 40, 825);
  pop();
}

function drawCliff2() {
  //cliff
  push();
  fill(0, 0, 30);
  noStroke();
  rect(600, 800, 40, 825);
  rect(640, 750, 30, 825);
  rect(670, 720, 30, 825);
  rect(700, 630, 50, 825);
  rect(750, 600, 20, 825);
  rect(770, 560, 40, 825);
  rect(810, 460, 90, 825);
  rect(900, 370, 90, 825);
  rect(990, 300, 50, 825);
  rect(1040, 280, 40, 825);
  rect(1080, 200, 40, 825);
  rect(1100, 150, 60, 825);
  rect(1160, 100, 40, 825);
  rect(1200, 50, 300, 825);
  pop();

  //cliff shadows
  push();
  fill(0, 0, 20);
  noStroke();
  rect(750, 660, 80, 825);
  rect(830, 600, 100, 825);
  rect(930, 430, 100, 825);
  rect(1030, 350, 100, 825);
  rect(1100, 230, 70, 825);
  rect(1150, 190, 70, 825);
  rect(1200, 160, 70, 825);
  rect(1260, 120, 200, 825);
  pop();

  //cliff cave
  push();
  fill(0, 0, 0);
  noStroke();
  rect(1000, 700, 50, 825);
  rect(1050, 600, 50, 825);
  rect(1100, 500, 100, 825);
  rect(1200, 400, 100, 825);
  rect(1300, 350, 150, 825);
  pop();
}

function drawPlants() {
  //vegetation hanging from the cave
  push();
  fill(10, 35, 20);
  noStroke();
  rect(1230, 395, 10, 30);
  rect(1240, 395, 6, 60);
  rect(1245, 395, 10, 40);
  rect(1255, 395, 6, 70);
  rect(1261, 395, 6, 20);
  pop();

  //vegetation on the side of the cave
  push();
  fill(10, 35, 20);
  noStroke();
  rect(1010, 770, 10, 100);
  rect(1000, 750, 10, 100);
  rect(990, 720, 10, 110);
  rect(980, 730, 10, 100);
  rect(970, 750, 10, 100);
  rect(960, 770, 10, 100);
  rect(950, 750, 10, 100);
  rect(940, 780, 10, 100);
  pop();

  //vegetation on the left cliff
  push();
  fill(10, 35, 20);
  noStroke();
  rect(135, 250, 40, 10);
  rect(145, 240, 10, 20);
  pop();

  //vegetation on the right cliff
  push();
  fill(10, 35, 20);
  noStroke();
  rect(820, 450, 80, 10);
  rect(835, 450, 10, 20);
  pop();
}

function drawBioAlgae() {
  //bio algae on the right cliff
  push();
  fill(0, 100, 255);
  noStroke();
  rect(850, 440, 50, 10);
  pop();

  //bio algae on vegetation beside the cave
  push();
  fill(0, 100, 255);
  noStroke();
  rect(970, 750, 10, 10);
  pop();

  //bio algae/monsters in the cave
  push();
  fill(0, 100, 255);
  noStroke();
  rect(1100, 640, 10, 10);
  rect(1140, 635, 10, 10);
  rect(1300, 550, 10, 10);
  rect(1350, 555, 10, 10);
  pop();
}

/*---------CRITTERS DRAW FUNCTIONS---------*/
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

function generateCritters() {
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

/*---------------!THE! DRAW FUNCTION----------------*/

function draw() {
  //basics
  background(0, 0, 0);
  drawWaterMovement();

  //background
  drawCliff1();
  drawCliff2();
  drawPlants();
  drawBioAlgae();

  frameRate(3);
  drawWaterVariation();

  //hand tracing - squish critters
  //squish();

  frameRate(20);
  //glitch
  //glitchThis();

  //critters
  drawCritters();
}
window.draw = draw;
// this shit is necessary so we can use the files as modules & imports work
