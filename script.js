/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Anya Ganapathy
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

var gameState = "splash";
var player1;
var gameTimer;
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents"
var score = 0; // keep track of points (starting at 0) 

function setup() {
  createCanvas(600, 400);
  player1 = new Player(width/2, height* 4/5);
  testBox = new Box(width/2, height/3);
  //  console.log(player1);

  gameTimer = new Timer(30000); // 30 second timer
  dropTimer = new Timer(1000); // 1 sec 
  // console.log(gameTimer);
}

function draw() {
  background(200);
  /* un-comment each line to see it work */
 // splash(); // call the splash screen function (below)
 // play(); // call the play screen function (below)
 // gameOver(); // call the gameOver screen function (below)
  switch (gameState)  {
    case "splash" :
    splash(); // go to the "splash" screen
    break;
  case "play" :
    play(); // go to the "play" screen
    break;
  case "gameOver" :
    gameOver(); // go to the "game over" screen
    break;
  default :
    console.log("no match found - check your mousePressed() function!");
 }
}

function splash() {
  // this is what you would see when the game starts
  background(150,200,200);
  textAlign(CENTER);
  textSize(16);
  text("GAME START!", width / 2, height / 2);
  textSize(12);
  text("Use the arrow keys to move the spirit", width / 2, height / 2 + 30);
  text("(click the mouse to continue)", width / 2, height / 2 + 50);
  testBox.display();
  testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(150, 0, 30);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  //text("This is where the Game happens", width / 2, height / 2);
  //player1.x = mouseX; 
  //player1.y = mouseY;
  player1.display();
  player1.move();
 
  if (gameTimer.isFinished()) {
    gameState = "gameOver"
  }

  if(dropTimer.isFinished()) {
    let p = new Box(random(width), -40); // new box, anywhere across the width of the canvas, but 40px above the canvas
    presents.push(p); // add object 'p' to the 'presents' Array
    dropTimer.start(); // restart timer for next drop
  }

  for(let i = 0; i < presents.length; i++) {
    // for each element of the array, represented by 'i', do the following:
    presents[i].display(); // draw it on the canvas
    presents[i].move(); // make it drop
    presents[i].spin() // make it rotate

    if(presents[i].y > height) {
      // present went below the canvas
      presents.splice(i, 1); // remove 1 element from from "presents" at index 'i'
      //score--; // decrement score by 1
    }

    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if (d < 50) {
      presents.splice(i, 1); // remove 1 item at index 'i'
      score ++; // add 1 point!
    }

  }

  textAlign(LEFT);
  fill(50,0,0)
  text("elapsed time: " + gameTimer.elapsedTime, 20, 20); // show elapsed time in top left corner
  text("Score: " + score, 20, 40); 

  if(keyIsPressed){
    switch(keyCode){
      case UP_ARROW:
        player1.thrust(); // accelerate
        break;
      case DOWN_ARROW:
        player1.brake();
        break; 
      case LEFT_ARROW:
        player1.angle -= .02; //turn left
        break;
      case RIGHT_ARROW:
        player1.angle += .02; //turn right
        break;
      default:
        console.log("use the arrow keys to move");
     }
  }
}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
}

function mousePressed() {

  if(gameState == "splash") { 
    gameState = "play"; // go to "play"
    gameTimer.start(); // starts the timer
    dropTimer.start(); // start the drop timer for presents
    score = 0; // reset score to 0 at start of game
} else if(gameState == "play") { 
    //gameState = "gameOver";// go to "gameOver"
} else if(gameState == "gameOver") { 
   gameState = "splash"; // go to "splash"
} 
  console.log("click!");
}


function keyPressed() { 
  switch(keyCode) {
    case UP_ARROW :
      player1.y -= 30 // move up 30px
      player1.angle = 0; // no rotation
      if(player1.y < 0) player1.y = height; // wrap to bottom
        break;
    case DOWN_ARROW :
      player1.y += 30 // move down 30px
      player1.angle = PI ; // point down (rotate 180 deg.)
      if(player1.y > height) player1.y = 0; // wrap to top
        break;
    case LEFT_ARROW :
      player1.x -= 30;
      player1.angle = PI + PI/2;
      if(player1.x < 0) player1.x = width;
        break;
    case RIGHT_ARROW :
      player1.x += 30;
      player1.angle = PI/2;
      if(player1.x > width) player1.x = 0;
       break;
      default : // do this if the key doesn't match the list ...
        console.log("press the arrow keys to move player1");
  }
}
