// https://creative-coding.decontextualize.com/making-games-with-p5-play/
// Pulling from Sprite Groups example

//sprite that move with keyboard 
// create bullet --> that increases size 
// work on core functionality

// https://p5play.org/learn/sprite.html?page=3
let player;

window.setup = () => {
	new Canvas(windowWidth, windowHeight);

	player = new Sprite();
	player.img = 'images/flower.png';
	player.diameter = 70;
};

window.draw = () => {
	//clear();
    // Using code from "Sprites on the move" of https://creative-coding.decontextualize.com/making-games-with-p5-play/
    background(255);
    textAlign(CENTER, CENTER);
    text("use arrow keys, or SPACE to stop",
    width/2, height*0.67);
    drawSprites();
    
    // Sprites on the move from https://creative-coding.decontextualize.com/making-games-with-p5-play/
    /*for (let i = 0; i < 10; i++) {
        let spr;
        spr = createSprite(width/2, height/2, 40, 40);
        spr.shapeColor = color(0);
        //spr.velocity.y = 0;
        if (spr.position.y >= height) {
            spr.velocity.y *= -1;
            // set to height to prevent "tunneling"
            spr.position.y = height;
        }
    }
      // constant downward speed
      // (i.e., gravity)
      spr.addSpeed(0.25, 90);
      drawSprites();*/

    //REFERENCE -- Collision callbacks -- https://creative-coding.decontextualize.com/making-games-with-p5-play/
    //Maybe also collision -- "Collisions" -- https://creative-coding.decontextualize.com/making-games-with-p5-play/
    // Maybe also second code under Multiple sprites
};

window.keyPressed = () => {
    if (keyCode == RIGHT_ARROW) {
      player.setSpeed(1.5, 0);
    }
    else if (keyCode == DOWN_ARROW) {
      player.setSpeed(1.5, 90);
    }
    else if (keyCode == LEFT_ARROW) {
      player.setSpeed(1.5, 180);
    }
    else if (keyCode == UP_ARROW) {
      player.setSpeed(1.5, 270);
    }
    else if (key == ' ') {
      player.setSpeed(0, 0);
    }
    return false;  
  };


/*
let balls;
*/
/*
window.setup = () => {
    createCanvas(windowWidth, windowHeight);
    balls = new Group();
  
    for (let i = 0; i < 10; i++) {
        let c = new Sprite();
        c.diameter = random(50, 100);
*/
      /*let c = createSprite(
        random(width), random(height),
        random(25, 100), random(25, 100));*/
 /*
        c.shapeColor = color(random(200, 255));
      balls.add(c);
    }
  };
  
  window.draw = () => {
    background(0, 0, 0);
  for (let i = 0; i < balls.length; i++) { // modified balls.length --> 
    balls[i].position.x += balls[i].width * 0.01;
    if (balls[i].position.x > width) {
      balls[i].position.x = 0;
    }
    balls[i].position.y = random(0, windowHeight); //Added
  }
  drawSprites();
  };

*/
