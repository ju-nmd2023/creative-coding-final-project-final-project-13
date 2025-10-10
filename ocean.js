//REFERENCES
//https://codepen.io/pixelkind/pen/JjwGQgd - the following code was created with the help of this tutorial
//https://chatgpt.com/share/68e569bc-9108-8003-be50-cb73fb308bed - the following code was created with the help of chatGPT
//https://tonejs.github.io/docs/14.9.17/index.html - this website was used to understand Tone.js
//https://codepen.io/pixelkind/pen/wvRMVwy - the following code was created with the help of this tutorial
//https://ffd8.github.io/p5.glitch/ - this website was used to understand the p5.glitch library

//VARIABLES
//x and y for drawing the background
let drawX = 0;
let drawY = 0;

//handpose variables
let video;
let handpose;
let predictions = [];
let pointer;
let thumb;

//glitch
let glitch;

//sound effect
const now = Tone.now();
const synthNotes = ["G6", "G5"];
const monoSynth = new Tone.Synth().toDestination();
//add more here???

/*-------------------------------*/
//SOUND SETUP
//background music
window.addEventListener("click", () => {
  Tone.start();
  //tone.js in bwaterNoiseRowers requires a user interaction in order to play audio
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
  monoSynth.triggerAttackRelease("E6", 0.1);
}

/*-------------------------------*/
//SETUP FUNCTIONS
function preload() {
  handpose = ml5.handPose();
}

function setup() {
  /*creating canvas with system variables*/
  createCanvas(windowWidth, windowHeight);
  frameRate(1);
  //start video recording & hand detection
  video = createCapture(VIDEO);
  video.hide();
  handpose.detectStart(video, getHandsData);
  //initiate glitch
  glitch = new Glitch();
}

function windowResized() {
  //resize p5.js canvas to fit window width and height
  resizeCanvas(windowWidth, windowHeight);
}

/*-------------------------------*/
//HANDPOSE
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

/*-------------------------------*/
//OTHER FUNCTIONS
function drawBaseCanvas(/*creating the back of the background*/) {
  //main area of the artwork and the background colour of it
  push();
  fill(0, 30, 60);
  rectMode(CENTER);
  rect(width / 2, height / 2, width, 600);
  pop();
}

/*function drawWaterNoise() {
  if (y > height / 2 - 300 && y < height / 2 + 300) {
    let n = noise(x * 0.01, y * 0.01);
    // draw something based on n
  }
}*/

function drawWaterVariation() {
  push();
  const waterVariationFields = 70;
  const waterHeight = 600;
  const variationWidth = width / waterVariationFields;
  const variationHeight = waterHeight / waterVariationFields;
  noStroke();
  for (let xVariation = 0; xVariation < waterVariationFields; xVariation++) {
    for (let yVariation = 0; yVariation < waterVariationFields; yVariation++) {
      if (Math.random() < 0.002) {
        fill(10, 25, 200);
      } else {
        noFill();
      }
      square(
        xVariation * variationWidth,
        yVariation * variationHeight,
        variationHeight
      );
    }
  }
  pop();
}

//OTHER THINGS (CANVES, BOATS(?) ETC.)
function drawCave() {
  //basics - from left to right
  push();
  noStroke();
  fill(0, 0, 0);
  rect(drawX + 680, drawY + 560, 35, 40);
  rect(drawX + 710, drawY + 510, 30, 90);
  rect(drawX + 740, drawY + 460, 40, 140);
  rect(drawX + 780, drawY + 400, 60, 200);
  rect(drawX + 830, drawY + 440, 50, 160);
  rect(drawX + 880, drawY + 480, 20, 120);
  rect(drawX + 900, drawY + 540, 30, 60);
  pop();

  //extra small pixels - from left to right
  push();
  noStroke();
  fill(0, 0, 0);
  rect(drawX + 690, drawY + 545, 20, 20);
  rect(drawX + 750, drawY + 440, 15, 25);
  rect(drawX + 765, drawY + 430, 15, 35);
  pop();
}

/*-------------------------------*/
//CLIFF FUNCTIONS
function drawCliff1() {
  //basics - from left to right
  push();
  noStroke();
  fill(0, 0, 30);
  rect(drawX, drawY, 20, 600);
  rect(drawX, drawY + 50, 40, 550);
  rect(drawX, drawY + 100, 60, 500);
  rect(drawX, drawY + 200, 100, 400);
  rect(drawX + 100, drawY + 300, 100, 300);
  rect(drawX + 200, drawY + 400, 100, 200);
  rect(drawX + 300, drawY + 500, 100, 100);
  pop();

  //extra small pixels - from left to right
  push();
  noStroke();
  fill(0, 0, 30);
  rect(drawX + 60, drawY + 170, 15, 40);
  rect(drawX + 75, drawY + 180, 15, 30);
  rect(drawX + 100, drawY + 240, 30, 70);
  rect(drawX + 130, drawY + 260, 40, 50);
  rect(drawX + 200, drawY + 360, 50, 50);
  rect(drawX + 250, drawY + 375, 20, 35);
  rect(drawX + 300, drawY + 450, 40, 60);
  rect(drawX + 340, drawY + 470, 30, 40);
  pop();

  //shadows
  push();
  noStroke();
  fill(0, 0, 20);
  rect(drawX, drawY + 250, 50, 350);
  rect(drawX + 50, drawY + 320, 100, 280);
  rect(drawX + 150, drawY + 400, 70, 200);
  rect(drawX + 220, drawY + 470, 70, 130);
  rect(drawX + 290, drawY + 500, 40, 100);
  pop();
}

function drawCliff2() {
  //basics - from left to right
  push();
  noStroke();
  fill(0, 0, 30);
  rect(drawX + 500, drawY + 500, 100, 100);
  rect(drawX + 600, drawY + 400, 100, 200);
  rect(drawX + 650, drawY + 300, 300, 300);
  rect(drawX + 800, drawY + 250, 100, 200);
  rect(drawX + 900, drawY + 500, 100, 100);
  pop();

  //extra small pixels - from left to right
  push();
  noStroke();
  fill(0, 0, 30);
  rect(drawX + 540, drawY + 480, 40, 30);
  rect(drawX + 560, drawY + 460, 50, 50);
  rect(drawX + 680, drawY + 280, 50, 30);
  rect(drawX + 730, drawY + 270, 30, 40);
  rect(drawX + 945, drawY + 430, 15, 30);
  rect(drawX + 1000, drawY + 550, 20, 50);
  pop();

  //shadows
  push();
  noStroke();
  fill(0, 0, 25);
  rect(drawX + 520, drawY + 520, 80, 80);
  rect(drawX + 600, drawY + 490, 100, 110);
  rect(drawX + 700, drawY + 350, 200, 250);
  rect(drawX + 820, drawY + 400, 100, 140);
  rect(drawX + 900, drawY + 530, 70, 70);
  pop();
}

/*-------------------------------*/
//PLANTATION VARIATION - Gonna draw more
function drawPlantType1() {
  push();
  noStroke();
  fill(13, 25, 10);
  //stem
  rect(drawX + 115, drawY + 220, 7, 20);
  //left thing
  rect(drawX + 110, drawY + 215, 7, 17);
  rect(drawX + 106, drawY + 200, 5, 20);
  rect(drawX + 108, drawY + 180, 3, 20);
  //middle thing
  rect(drawX + 115, drawY + 190, 5, 40);
  rect(drawX + 118, drawY + 172, 3, 20);
  //right thing
  rect(drawX + 120, drawY + 220, 6, 14);
  rect(drawX + 125, drawY + 200, 6, 25);
  rect(drawX + 130, drawY + 190, 3, 25);
  pop();
}

function drawPlantType2() {
  push();
  noStroke();
  fill(13, 25, 10);
  rect(drawX + 20, drawY + 570, 10, 30);
  rect(drawX + 30, drawY + 550, 5, 50);
  rect(drawX + 35, drawY + 560, 5, 40);
  rect(drawX + 40, drawY + 530, 5, 70);
  rect(drawX + 45, drawY + 540, 7, 60);
  rect(drawX + 45, drawY + 540, 7, 60);
  rect(drawX + 50, drawY + 580, 15, 20);
  rect(drawX + 60, drawY + 530, 5, 60);
  rect(drawX + 65, drawY + 550, 5, 50);
  pop();
}

function drawNormalAlgae() {
  push();
  noStroke();
  fill(13, 25, 10);
  rect(200, drawY + 350, 30, 10);
  rect(270, drawY + 390, 15, 10);
  rect(400, drawY + 585, 100, 15);
  rect(420, drawY + 575, 15, 15);
  rect(775, drawY + 280, 25, 20);
  rect(820, drawY + 590, 75, 10);
  rect(870, drawY + 581, 15, 10);
  rect(900, drawY + 290, 35, 10);
  rect(1215, drawY + 490, 25, 10);
  pop();
}

function drawBioAlgae() {
  push();
  noStroke();
  fill(10, 25, 200);
  rect(125, drawY + 196, 5, 5);
  rect(120, drawY + 590, 65, 10);
  rect(830, drawY + 586, 40, 5);
  pop();
}

/*-------------------------------*/
//GLITCH
function glitchThis() {
  glitch.loadQuality(0.8);
  glitch.loadImage(video); //will have to replace "video" with a jpg of our final static bg
  glitch.randomBytes(2);
  glitch.buildImage();
  image(glitch.image, 0, 0, windowWidth, 600);
}

/*-------------------------------*/
//!THE! DRAW FUNCTION
function draw() {
  //THE BASICS
  background(0, 0, 30);
  drawBaseCanvas();
  let variationFit = height / 2 - 300;
  translate(0, variationFit);

  //DRAWING THE CLIFFS
  //cliff 1
  drawCliff1();
  //cliff 2
  drawCliff2();
  //draw extra cliff by the edge
  push();
  translate(drawX + 700, drawY);
  drawCliff2();
  pop();

  //DRAW THE EXTRA STUFF
  drawCave();

  //DRAWING THE PLANTS
  //plant type 1 - placement 1
  drawPlantType1();
  //plant type 1 - placement 2 (by the cave)
  push();
  translate(drawX + 600, drawY + 360);
  drawPlantType1();
  pop();

  //plant type 2 - placement 1
  drawPlantType2();
  //plant type 2 - placement 2
  push();
  translate(drawX + 50, drawY);
  drawPlantType2();
  pop();
  //plant type 2 - placement 3
  push();
  translate(drawX + 820, drawY - 350);
  drawPlantType2();
  pop();

  //Algae
  drawNormalAlgae();
  drawBioAlgae();

  //DRAWING THE EXTRA STUFF
  drawWaterVariation();

  //HAND TRACING - SQUISH CRITTERS
  squish();

  //GLITCH
  glitchThis();
}
