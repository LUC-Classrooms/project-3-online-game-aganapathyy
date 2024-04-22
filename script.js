/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Anya Ganapathy
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

var gameState = "splash";
var player1;
var gameTimer;

function setup() {
  createCanvas(600, 400);
  player1 = new Player(width/2, height* 4/5);
  console.log(player1);

  gameTimer = new Timer(5000); // 5 second timer
  console.log(gameTimer);
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
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);
  //player1.x = mouseX; 
  //player1.y = mouseY;
  player1.display();
  player1.move();
 
  if (gameTimer.isFinished()) {
    gameState = "gameOver"
  }

  textAlign(LEFT);
  text("elapsed time: " + gameTimer.elapsedTime, 40, 100); 
  // show elapsed time in top left corner

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
} else if(gameState == "play") { 
    //gameState = "gameOver";// go to "gameOver"
} else if(gameState == "gameOver") { 
   gameState = "splash"; // go to "splash"
} 
  console.log("click!");
}

/*
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
*/