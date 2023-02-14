// Also reference -- https://p5play.org/learn/ 

// https://creative-coding.decontextualize.com/making-games-with-p5-play/
// Pulling from Sprite Groups example

//sprite that move with keyboard 
// create bullet --> that increases size 
// work on core functionality

// https://p5play.org/learn/sprite.html?page=3
let player;
let balls;
let character;
let fires;
let score = 0;
let scaleBalloon = 70;
let playerImg;
window.preload = () => {
  playerImg = loadImage('images/balloon.png');
};

window.setup = () => {
	new Canvas(windowWidth, windowHeight);

	//player = new Sprite();
  // Following "Images and animations" from https://creative-coding.decontextualize.com/making-games-with-p5-play/
  player = createSprite(windowWidth/2, windowHeight/2);
  player.addImage(playerImg);
	//Until FIGURE OUT HOW TO SCALE IMAGES
  //player.img = 'images/balloon.png';
  //player.color = 'red'; //(208, 64, 60);

  //player.diameter = 1000;


  // Reference -- https://editor.p5js.org/mbardin/sketches/OyZLpQW6N 

    balls = new Group();
    fires = new Group();
  
   // while (fires.length < 2) {
      for (let i = 0; i < 1; i++) {
          character = new Sprite(random(windowWidth), random(windowHeight)); // (random(windowWidth), random(windowHeight));
          character.img = 'images/fire.png';
          //character.rotation = 0;
          //character.rotationSpeed = 1;
          //character.setSpeed(random(12), random(360));
          fires.add(character);

        /* let c = new Sprite();
          c.img = 'images/fire.png';
          c.diameter = random(50, 100);
          balls.add(c);*/
      }
   // }
};

window.draw = () => {
	//clear();
    // Using code from "Sprites on the move" of https://creative-coding.decontextualize.com/making-games-with-p5-play/
    background(1, 36, 68);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text("use arrow keys, or SPACE to stop", width/2, height*0.67);
    drawSprites();

    if (player.position.x > windowWidth) {
      player.position.x = 0;
    } else if (player.position.x < 0) {
      player.position.x = windowWidth - 10;
    } 

    if (player.position.y > windowHeight) {
      player.position.y = 0;
    } else if (player.position.y < 0) {
      player.position.y = windowHeight - 10;
    }
    
    for (let i = 0; i < fires.length; i++) {
      fires[i].setSpeed(0.00000001); // QUESTION - Why does it seem like the speed isn't decreasing even though made it reall small
      fires[i].position.x += fires[i].width;
      if (fires[i].position.x > windowWidth) {
        fires[i].position.x = random(windowWidth);
        fires[i].position.y = random(windowHeight);
      }
    }

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
    // FIX!!!
    if(player.overlap(fires)) {
       expandBalloon(score);
    };
    //player.overlap(fires, expandBalloon(score));
    //Maybe also collision -- "Collisions" -- https://creative-coding.decontextualize.com/making-games-with-p5-play/
    // Maybe also second code under Multiple sprites
};

window.keyPressed = () => {
    if (keyCode == RIGHT_ARROW) { //QUESTION -- Figure out why right key isn't working
      player.setSpeed(3.5, 0);
    }
    else if (keyCode == DOWN_ARROW) {
      player.setSpeed(3.5, 90);
    }
    else if (keyCode == LEFT_ARROW) {
      player.setSpeed(3.5, 180);
    }
    else if (keyCode == UP_ARROW) {
      player.setSpeed(3.5, 270);
    }
    else if (key == ' ') {
      player.setSpeed(0, 0);
    }
    return false;  
};

window.expandBalloon = (m) => {
 // player.diameter = 400;
  player.scale = 1 + 0.3*(m+1); // scale - https://p5play.org/learn/sprite_animation.html?page=1 
  //sprite.width = scaleBalloon + 20*m
  score += 1;
};
