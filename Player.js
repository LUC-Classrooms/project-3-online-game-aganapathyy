function Player(tempX, tempY) {
    // properties
    this.x = tempX;
    this.y = tempY;
    this.diam = 50;
    this.angle = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
  
    this.display = function () {
      push(); // create a drawing layer
      translate(this.x, this.y); // move origin point
      rotate(this.angle); // player can rotate
  
      fill(0); // black
      /** calculate points on a triangle based on a unit circle. You could use this method to draw more complex polygons that would fit inside a circle centered on (this.x, this.y)
       * For any point around the circle, x = the cosine of the angle in radians from 0 to TWO_PI, and y = the sine of that angle. an angle of 0 is the right side of the circle, PI is the left side. 
       * The points generated this way are relative to the coordinate point (0,0). 
       * The translate() function (above, line 10) takes care of moving it on the canvas.
       * 
      */
      let r = this.diam / 2; // radius
      // 270 degrees (top):
      let x1 = cos(PI + HALF_PI) * r; 
      let y1 = sin(PI + HALF_PI) * r; 
      // 30 degrees (bottom right):
      let x2 = cos(PI / 6) * r;
      let y2 = sin(PI / 6) * r;
      // 150 degrees (bottom left): 
      let x3 = cos(PI * 5 / 6) * r;
      let y3 = sin(PI * 5 / 6) * r;
      let white = color(240);
      let black = color(0);
      //draw the triangle:
      //triangle(x1, y1, x2, y2, x3, y3);
      //or draw a complex polygon
      /*beginShape();
      vertex(x1, y1);
      vertex(x2, y2);
      vertex(x3, y3);
      endShape(); */
      fill(black)
      ellipse(0, 0, this.diam, this.diam);//body
     //eye
      fill(white);
      ellipse(x1, y1/8, r/.5, r/2);
      fill(black)
      ellipse(x1, y1/8, r, r);
      pop(); // dispose of this layer
    
    }
  
  
    this.move = function () {
  //folow the mouse for now
      this.x += this.xSpeed;
      this.y += this.ySpeed;
  
      if(this.x > width || this.x < 0){
        this.x = abs(this.x - width);
      }
      if(this.y > height || this.y < 0){
        this.y = abs(this.y - height);
      } 
    } // end of .move()
    
    this.thrust = function(){
      let horiz = Math.sin(this.angle);
      let vert = Math.cos(this.angle);
      
      this.xSpeed += .02 * horiz;
      this.ySpeed -= .02 * vert;
    }
  
    this.brake = function() {
      if(this.xSpeed > 0)
        this.xSpeed -= .01; // slow down!
      else this.xSpeed += .01 // speed was less than 0, so bring it back up
      
      if (this.ySpeed > 0)
        this.ySpeed -= 0; // slow down on y axis, too!
      else this.ySpeed += .01; // bring up to 0 if we went too far
    }
  }