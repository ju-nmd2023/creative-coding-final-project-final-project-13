import { Critter } from "./critters.js";
//REFERENCES
//https://codepen.io/pixelkind/pen/JjwGQgd - the following code was created with the help of this tutorial
//https://chatgpt.com/share/68e569bc-9108-8003-be50-cb73fb308bed - the following code was created with the help of chatGPT
//https://tonejs.github.io/docs/14.9.17/index.html - this website was used to understand Tone.js
//https://codepen.io/pixelkind/pen/wvRMVwy - the following code was created with the help of this tutorial
//https://ffd8.github.io/p5.glitch/ - this website was used to understand the p5.glitch library
//https://codepen.io/pixelkind/pen/XWojVaO - the following code was created with the help of this tutorial
//https://editor.p5js.org/ml5/sketches/W9vFFT5RM - squishVictim(); was created with the help of this tutorial
//https://editor.p5js.org/Tr4yvon/sketches/fTjWZZLBf - squishVictim(); was created with the help of this tutorial

//#region VARIABLES
//handpose variables
const button = document.getElementById("button");
let video;
let handpose;
let predictions = [];
let pointer;
let thumb;
let detecting = false;

//glitch variables
let glitch;
let timedGlitch;
let glitching = true;

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
let victims = [];
let victimScale = 0.4;

//speed indicator variables
let barY = 562.5;
let pinching = false;
//#endregion

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
  timedGlitch = window.setInterval(newGlitch(), 5000, true, false);
}
window.setup = setup;

/*----------------HANDPOSE----------------*/
button.addEventListener("click", () => {
  //hand detection start/stop at buttonclick
  toggleDetection();
  //change button appearance
  if (detecting === false) {
    button.setAttribute("class", "startB");
  } else {
    button.setAttribute("class", "stopB");
  }
});

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
      //draw tip trackers for UI
      push();
      fill(100, 230, 230, 190);
      stroke(100, 230, 230);
      strokeWeight(2);
      ellipse(1440 - pointer.x, pointer.y, 50);
      ellipse(1440 - thumb.x, thumb.y, 50);
      pop();

      //case: pinky & ring finger is folded, activate squish
      if (
        keypoints[16].y > keypoints[14].y &&
        keypoints[20].y > keypoints[18].y
      ) {
        if (1440 - pointer.x < 1000) {
          if (critters.length > 0) {
            return squish("victim");
          }
        } else {
          return squish("speed");
        }
      }
    }
  }
}

function squish(value) {
  //calculate size & position for the captured critter
  let centerX = (1440 - pointer.x + (1440 - thumb.x)) / 2;
  let centerY = (pointer.y + thumb.y) / 2;
  let size = dist(pointer.x, pointer.y, thumb.x, thumb.y);

  if (value === "victim") {
    let victim = victims[0];

    //move predetermined victim between fingers
    let newDirection = createVector(centerX, centerY);
    victim.maxSpeed = 20;
    victim.maxForce = 5;
    victim.acceleration = p5.Vector.sub(newDirection, victim.position);
    victim.update();
    victim.checkBorders();
    victim.draw(victimScale);
    //once it reaches between fingers,
    if (
      victim.position.x <= centerX + 30 &&
      victim.position.x >= centerX - 30
    ) {
      //remove movement
      victim.position = createVector(centerX, centerY);
      victim.velocity = createVector(0, 0);
      victim.acceleration = createVector(0, 0);
      victim.maxSpeed = 0;
      //adjust size to pinch motion
      victimScale = size / 100;

      //when someone pinches, burst critter
      if (size <= 20) {
        //REPLACE THE FOLLOWING 4 LINES WITH BURST ANIMATION
        push();
        fill(255, 0, 0);
        ellipse(victim.position.x, victim.position.y, 15);
        pop();
        //after burst, assign new victim and automatically turn off detection
        victims.splice(0);
        let newVictim = random(critters);
        victims.push(newVictim);
        victimScale = 0.4;
        critters.splice(critters.indexOf(newVictim), 1);
        return toggleDetection();
      }
    }
  } else if (value === "speed") {
    //check that person is pinching
    console.log(size);
    if (size < 40) {
      pinching = true;
      //check person is pinching near bar
      if (centerY > barY - 100 && centerY < barY + 100) {
        //update bar height
        barY = centerY;

        //update critter speed
        for (let critter of critters) {
          critter.maxSpeed = (((825 - barY) / 100) * (825 - barY)) / 100;
        }
      }
    } else if (size > 40 && pinching === true) {
      //after pinch is released stop detecting hand
      toggleDetection();
      pinching = false;
    }
  }
}

/* function squishVictim() {
  //calculate size & position for the captured critter
  let victim = victims[0];
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
    if (size <= 20) {
      //REPLACE THE FOLLOWING 4 LINES WITH BURST ANIMATION
      push();
      fill(255, 0, 0);
      ellipse(victim.position.x, victim.position.y, 15);
      pop();
      //after burst, assign new victim and automatically turn off detection
      victims.splice(0);
      let newVictim = random(critters);
      victims.push(newVictim);
      victimScale = 0.4;
      critters.splice(critters.indexOf(newVictim), 1);
      return toggleDetection();
    }
  }
} */

function toggleDetection() {
  //start & stop hand detection
  if (detecting === true) {
    handpose.detectStop();
    //keep critters slow when detection is off
    /* for (let critter of critters) {
      critter.maxSpeed = 1;
      critter.maxForce = 0.025;
    } */
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

//speed bar visual
function drawSpeedBar(indicatorY) {
  push();
  fill(100, 230, 230);
  noStroke();
  //plus
  rect(1145, 28.75, 15, 45);
  rect(1130, 43.75, 45, 15);
  //bar itself
  rect(1115, 102.5, 75, 10);
  rect(1145, 112.5, 15, 600);
  rect(1115, 712.5, 75, 10);
  //minus
  rect(1130, 766.25, 45, 15);
  //indicator
  stroke(255);
  strokeWeight(5);
  //set limit so bar doesn't leave spectrum
  if (barY > 112.5 && barY < 712.5) {
    rect(1122.5, indicatorY, 60, 30);
  } else if (barY < 112.5) {
    rect(1122.5, 112.5, 60, 30);
  } else if (barY > 712.5) {
    rect(1122.5, 712.5, 60, 30);
  }
  pop();
}

//glitch function
function newGlitch(value) {
  glitching = value;
  console.log(value);
}

function drawGlitch() {
  glitch.resetBytes();
  glitch.loadQuality(0.8);
  glitch.loadImage("white.png");
  glitch.limitBytes(0, 1);
  glitch.randomBytes(5);
  glitch.buildImage();
  for (let i = 0; i < 100; i++) {
    let x = Math.ceil(Math.random() * 1440 - 200);
    let y = Math.ceil(Math.random() * 875 - 50);
    let width = Math.ceil(Math.random() * 450);
    let height = Math.ceil(Math.random() * 35);
    push();
    tint(255, 100);
    image(glitch.image, x, y, width, height);
    pop();
  }
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
      const value = noise(x / 10, y / 10) * Math.PI;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}

function generateCritters() {
  for (let i = 0; i < 50; i++) {
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
  let victim = random(critters);
  victims.push(victim);
  critters.splice(critters.indexOf(victim), 1);
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
  drawPlants();
  drawBioAlgae();

  //frameRate(3);
  drawWaterVariation();
  //glitch
  if (glitching === true) {
    drawGlitch();
    glitching = false;
  }

  //hand tracking
  detect();

  //critters
  drawCritters();

  //speed regulation
  if (detecting === true) {
    drawSpeedBar(barY);
  }
}
window.draw = draw;
// this shit is necessary so we can use the files as modules & imports work
