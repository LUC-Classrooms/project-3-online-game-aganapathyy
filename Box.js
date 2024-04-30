function Box(_x, _y){
  this.x = _x;
  this.y = _y;

  this.xSpeed = 0;
  this.ySpeed = random(1, 2); // 1 - 2 (falling)
  this.rSpeed = random(-.02, .02); // rotation speed
  this.d = 50; // initialize .d property to 50
  this.r = random(0, 255); // set red level
  this.g = random(0, 255); // set green level
  this.b = random(0, 255); // set blue level
  this.angle = 0;

  this.display = function(){

    push();
    translate(this.x, this.y);
    rotate(this.angle);

    rectMode(CENTER)
      fill(this.r, this.g, this.b,85); //set the color); //green
      rect(0,0,40)//body
      //eyes
      fill(240)//white
      ellipse (-20, -10, 25, 20)//left eyeball
      ellipse (20, -10, 25, 20)//right eyeball
      fill(0) //black
      ellipse (-20, -10, 15, 20)//left iris
      ellipse (20, -10, 15, 20)//right iris
      //shiny
      fill(240)//white
      ellipse (-20,-15,10,10)//left top
      ellipse (-20, -3, 10, 5)//left bottom
      ellipse (20, -15, 10,10)//right top
      ellipse (20, -3, 10, 5) // right bottom
      //face lines
      noFill()
      strokeWeight(2)
      arc(-35,-30,this.d,this.d/2,0, HALF_PI)//left eyebrow
      arc(35,-30,this.d,this.d/2,HALF_PI,PI)// r eyebrow
      strokeWeight(1)
      arc(0,5,this.d/2, this.d/4, PI, TWO_PI)//mouth
      arc(0,8,this.d/4, this.d/6, PI, TWO_PI)//mouth
    pop();

  }

  this.move = function() {
    this.y += this.ySpeed; // spin
  }

  this.spin = function() {
    this.angle += this.rSpeed; // spin
  }



}