import { Critter } from "./critters.js";
import { Squish } from "./squishCritter.js";

//REFERENCES
//https://codepen.io/pixelkind/pen/JjwGQgd - the following code was created with the help of this tutorial
//https://chatgpt.com/share/68e569bc-9108-8003-be50-cb73fb308bed - the following code was created with the help of chatGPT
//https://tonejs.github.io/docs/14.9.17/index.html - this website was used to understand Tone.js
//https://codepen.io/pixelkind/pen/wvRMVwy - the following code was created with the help of this tutorial
//https://ffd8.github.io/p5.glitch/ - this website was used to understand the p5.glitch library
//https://codepen.io/pixelkind/pen/XWojVaO - the following code was created with the help of this tutorial
//https://editor.p5js.org/ml5/sketches/W9vFFT5RM - squish(); was created with the help of this tutorial
//https://editor.p5js.org/Tr4yvon/sketches/fTjWZZLBf - squish(); was created with the help of this tutorial

//VARIABLES
//handpose variables
let video;
let handpose;
let predictions = [];
let pointer = false;
let thumb = false;
let detecting = false;

//glitch variables
let glitch;

//sound effect variables
const autofilter = new Tone.PingPongDelay("7n", 0.2).toDestination();
const polySynth = new Tone.MonoSynth().connect(autofilter);

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
let victim;
let victimScale = 0.4;

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
  polySynth.triggerAttackRelease("F5", "8n");
  setTimeout(() => {
    polySynth.triggerAttackRelease("D5", "8n");
  }, 295);

  //hand detection start/stop at mouseclick
  toggleDetection();
}
window.mousePressed = mousePressed;

/*---------------SETUP FUNCTIONS-----------------*/
function preload() {
  handpose = ml5.handPose();
}
window.preload = preload;

function setup() {
  //basics
  createCanvas(1440, 825);

  //critters & flowfields
  field = generateField();
  generateCritters();

  //video recording & hand detection
  video = createCapture(VIDEO, { flipped: true });
  video.size(1440, 825);
  video.position(0, 0);
  video.hide();

  //initiate glitch
  glitch = new Glitch();
}
window.setup = setup;

/*----------------HANDPOSE----------------*/

function getHandsData(results) {
  predictions = results;
}

function detect() {
  if (detecting === true) {
    // assign variables for thumb & pointer finger
    for (let hand of predictions) {
      const keypoints = hand.keypoints;
      pointer = keypoints[8];
      thumb = keypoints[4];

      if (
        keypoints[16].y > keypoints[14].y &&
        keypoints[20].y > keypoints[18].y
      ) {
        //case: pinky & ring finger is folded, activate squish
        return squish();
      } else {
        return wave();
      }
    }
  }
}
//PARTICLES/EXPLOADING STAR FUNCTIONS
function squishThis(x, y) {
  for (let i = 0; i < 700; i++) {
    const squishX = x + random(-10, 10);
    const squishY = y + random(-10, 10);
    const squishing = new Squish(squishX, squishY);
    imSquished.push(squishing);
  }
}

let imSquished = [];

function squish() {
  //calculate size & position for the captured critter
  let centerX = (1440 - pointer.x + (1440 - thumb.x)) / 2;
  let centerY = (pointer.y + thumb.y) / 2;
  let size = dist(pointer.x, pointer.y, thumb.x, thumb.y);

  //move predetermined victim between fingers
  let newDirection = createVector(centerX, centerY);
  victim.maxSpeed = 20;
  victim.maxForce = 5;
  victim.acceleration = p5.Vector.sub(newDirection, victim.position);
  victim.update();
  victim.checkBorders();
  victim.draw(victimScale);
  //once it reaches between fingers,
  if (victim.position.x <= centerX + 30 && victim.position.x >= centerX - 30) {
    //remove movement
    victim.position = createVector(centerX, centerY);
    victim.velocity = createVector(0, 0);
    victim.acceleration = createVector(0, 0);
    victim.maxSpeed = 0;
    //adjust size to pinch motion
    victimScale = size / 100;

    //when someone pinches, burst critter
    if (size <= 75) {
      squishThis(centerX, centerY);
    }
  }
}

function wave() {
  console.log("iyeah");
}

function toggleDetection() {
  //start & stop hand detection
  if (detecting === true) {
    handpose.detectStop();
    detecting = false;
  } else {
    handpose.detectStart(video, getHandsData);
    detecting = true;
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
        fill(0, 0, 255, 50);
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
      fill(10, 10, 0 + waterNoise * 90);
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
  image(glitch.image, 700, 200, 300, 50);
}

/*---------BACKGROUND DRAW FUNCTIONS---------*/
function drawCliff1() {
  //cliff - left
  push();
  fill(0, 0, 40);
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
  fill(0, 0, 30);
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
  //cliff - middle
  push();
  beginShape();
  fill(0, 0, 40);
  noStroke();
  vertex(300, 0);
  vertex(950, 0);
  vertex(950, 100);
  vertex(890, 100);
  vertex(890, 120);
  vertex(870, 120);
  vertex(870, 150);
  vertex(810, 150);
  vertex(810, 220);
  vertex(780, 220);
  vertex(780, 270);
  vertex(740, 270);
  vertex(740, 340);
  vertex(670, 340);
  vertex(670, 400);
  vertex(570, 400);
  vertex(570, 380);
  vertex(530, 380);
  vertex(530, 300);
  vertex(470, 300);
  vertex(470, 270);
  vertex(420, 270);
  vertex(420, 180);
  vertex(380, 180);
  vertex(380, 80);
  vertex(300, 80);
  endShape(CLOSE);
  pop();
}

function drawCliff3() {
  //cliff - right
  push();
  fill(0, 0, 40);
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
  fill(0, 0, 30);
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
  //vegetation on the left cliff
  push();
  fill(10, 35, 20);
  noStroke();
  rect(135, 250, 40, 10);
  rect(145, 240, 10, 20);
  pop();

  //vegetation on the top of the right cliff - right to left
  push();
  beginShape();
  fill(10, 35, 20);
  noStroke();
  vertex(380, 110);
  vertex(380, 185);
  vertex(420, 185);
  vertex(420, 215);
  vertex(435, 215);
  vertex(435, 270);
  vertex(485, 270);
  vertex(485, 245);
  vertex(495, 245);
  vertex(495, 225);
  vertex(505, 225);
  vertex(505, 200);
  vertex(515, 200);
  vertex(515, 170);
  vertex(505, 170);
  vertex(505, 140);
  vertex(480, 140);
  vertex(480, 100);
  vertex(450, 100);
  vertex(450, 120);
  vertex(440, 120);
  vertex(440, 110);
  endShape();
  pop();

  push();
  beginShape();
  fill(10, 35, 20);
  noStroke();
  vertex(680, 0);
  vertex(680, 40);
  vertex(700, 40);
  vertex(700, 100);
  vertex(710, 100);
  vertex(710, 80);
  vertex(720, 80);
  vertex(720, 60);
  vertex(740, 60);
  vertex(740, 0);
  endShape(CLOSE);
  pop();

  //vegetation on the right cliff
  push();
  fill(10, 35, 20);
  noStroke();
  rect(820, 450, 80, 10);
  rect(835, 450, 10, 20);
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

  //vegetation on the top of the right cliff
  push();
  beginShape();
  fill(10, 35, 20);
  noStroke();
  vertex(1250, 45);
  vertex(1420, 45);
  vertex(1420, 250);
  vertex(1410, 250);
  vertex(1410, 270);
  vertex(1400, 270);
  vertex(1400, 200);
  vertex(1390, 200);
  vertex(1390, 300);
  vertex(1370, 300);
  vertex(1370, 280);
  vertex(1360, 280);
  vertex(1360, 260);
  vertex(1350, 260);
  vertex(1350, 240);
  vertex(1340, 240);
  vertex(1340, 290);
  vertex(1330, 290);
  vertex(1330, 250);
  vertex(1320, 250);
  vertex(1320, 230);
  vertex(1310, 230);
  vertex(1310, 210);
  vertex(1280, 210);
  vertex(1280, 150);
  vertex(1260, 150);
  vertex(1260, 100);
  vertex(1250, 100);
  endShape();
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

  //bigg chunk of bio algae on the right cliff - from left to right
  push();
  beginShape();
  fill(0, 100, 255);
  noStroke();
  vertex(120, 410);
  vertex(150, 410);
  vertex(150, 500);
  vertex(140, 500);
  vertex(140, 480);
  vertex(130, 480);
  vertex(130, 460);
  vertex(120, 460);
  endShape(CLOSE);
  pop();

  push();
  beginShape();
  fill(0, 100, 255);
  noStroke();
  vertex(955, 460);
  vertex(1020, 460);
  vertex(1020, 500);
  vertex(1010, 500);
  vertex(1010, 540);
  vertex(995, 540);
  vertex(995, 560);
  vertex(985, 560);
  vertex(985, 580);
  vertex(975, 580);
  vertex(975, 600);
  vertex(955, 600);
  endShape(CLOSE);
  pop();

  push();
  beginShape();
  fill(0, 100, 255);
  noStroke();
  vertex(1050, 450);
  vertex(1050, 370);
  vertex(1090, 370);
  vertex(1090, 400);
  vertex(1080, 400);
  vertex(1080, 430);
  vertex(1050, 430);
  endShape(CLOSE);
  pop();
}

function drawBlinkingEyes() {
  //the monsters in the cave opens their eyes and closes them (loop)
  push();
  noStroke();
  if (frameCount % 30 === 0) {
    fill(0, 100, 255);
    rect(1100, 640, 10, 10);
    rect(1140, 635, 10, 10);
    rect(1300, 550, 10, 10);
    rect(1350, 555, 10, 10);
  } else {
    fill(0, 0, 0);
  }
  pop();
}

function drawHighlight() {
  //highlights (white) from left to right
  push();
  fill(255, 255, 255);
  noStroke();
  rect(135, 415, 10, 20);
  rect(965, 470, 10, 20);
  rect(1055, 375, 10, 10);
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
      1,
      0.025
    );
    critters.push(critter);
  }
  //future victim
  victim = random(critters);
  critters.splice(critters.indexOf(victim));
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
    critter.draw(0.4);
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
  drawCliff3();
  drawPlants();
  drawBioAlgae();
  drawBlinkingEyes();
  drawHighlight();

  frameRate(3);

  drawWaterVariation();

  //hand tracing - squish critters
  detect();

  frameRate(20);
  //glitch
  //glitchThis();

  //critters
  drawCritters();

  //when squished I'll expload!
  push();
  for (let squishing of imSquished) {
    squishing.update();
    squishing.draw();

    if (squishing.evap()) {
      imSquished.splice(imSquished.indexOf(squishing));
    }
  }
  pop();
}
window.draw = draw;
// this shit is necessary so we can use the files as modules & imports work

/*---------------TO DO LIST FOR MEETING----------------*/
//Fix frameCount - bubbles and eyes
//Add the sound to the squish action