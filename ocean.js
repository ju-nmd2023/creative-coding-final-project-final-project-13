//REFERENCES
//https://codepen.io/pixelkind/pen/JjwGQgd - the following code was created with the help of this tutorial
//https://chatgpt.com/share/68e569bc-9108-8003-be50-cb73fb308bed - the following code was created with the help of chatGPT
//https://tonejs.github.io/docs/14.9.17/index.html - this website was used to understand Tone.js
//https://ffd8.github.io/p5.glitch/ - this website was used to understand the p5.glitch library

//VARIABLES
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

/*-------------------------------*/
//BACKGROUND MUSIC SETUP
window.addEventListener("click", () => {
  Tone.start();
  //tone.js in browsers requires a user interaction in order to play audio
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

/*-------------------------------*/
//SETUP FUNCTIONS
function preload() {
  handpose = ml5.handPose();
}

function setup() {
  /*creating canvas with system variables*/
  createCanvas(windowWidth, windowHeight);
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
function canvasBase(/*creating the back of the background*/) {
  //main area of the artwork and the background colour of it
  push();
  fill(0, 0, 0);
  rectMode(CENTER);
  rect(width / 2, height / 2, width, 600);
  pop();
}

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
        fill(255, 255, 255);
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
  push();
  fill(0, 0, 0);
  rect(drawX + 710, drawY + 500, 100, 100);
  rect(drawX + 770, drawY + 400, 60, 120);
  rect(drawX + 800, drawY + 480, 80, 120);
  pop();
}

/*-------------------------------*/
//CLIFF FUNCTIONS
function drawCliff1() {
  push();
  noStroke();
  fill(0, 0, 30);
  //basics
  rect(drawX, drawY + 200, 100, 400);
  rect(drawX + 100, drawY + 300, 100, 300);
  rect(drawX + 200, drawY + 400, 100, 200);
  rect(drawX + 300, drawY + 500, 100, 100);
  //cliff extra pixels
  rect(drawX + 100, drawY + 250, 30, 100);
  rect(drawX + 300, drawY + 450, 40, 100);
  pop();
}

function drawCliff2() {
  push();
  noStroke();
  fill(0, 0, 30);
  //basics
  rect(drawX + 500, drawY + 500, 100, 100);
  rect(drawX + 600, drawY + 400, 100, 200);
  rect(drawX + 650, drawY + 300, 300, 300);
  rect(drawX + 800, drawY + 250, 100, 200);
  rect(drawX + 900, drawY + 500, 100, 100);

  //cliff extra pixels
  rect(drawX + 1000, drawY + 550, 20, 50);
  pop();
}

/*-------------------------------*/
//PLANTATION VARIATION - Gonna draw more
function drawPlantType1() {
  push();
  noStroke();
  fill(23, 40, 23);
  //stem
  rect(drawX + 115, drawY + 230, 7, 20);
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
  fill(23, 50, 23);
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

/*-------------------------------*/

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
  background(255, 255, 255);
  canvasBase();
  let variationFit = height / 2 - 300;
  translate(0, variationFit);

  //DRAWING THE CLIFFS
  drawCliff1();
  drawCliff2();
  push(/*draw extra cliff by the edge*/);
  translate(drawX + 700, drawY);
  drawCliff2();
  pop();

  //DRAW THE EXTRA STUFF
  drawCave();

  //DRAWING THE PLANTS
  //plant type 1 - placement 1
  drawPlantType1();
  push(/*plant type 1 - placement 2 (by the cave)*/);
  translate(drawX + 600, drawY + 350);
  drawPlantType1();
  pop();
  //plant type 2 - placement 1
  drawPlantType2();
  push(/*plant type 2 - placement 2*/);
  translate(drawX + 50, drawY);
  drawPlantType2();
  pop();

  //DRAWING THE WATER VARIATION/REFLECTION
  drawWaterVariation();

  //HAND TRACING - SQUISH CRITTERS
  squish();

  //GLITCH
  glitchThis();
}
