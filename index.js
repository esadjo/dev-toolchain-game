// Also reference -- https://p5play.org/learn/ 

// https://creative-coding.decontextualize.com/making-games-with-p5-play/
// Pulling from Sprite Groups example

//sprite that move with keyboard 
// create bullet --> that increases size 
// work on core functionality

// https://p5play.org/learn/sprite.html?page=3
let player;
let fire;
let fires;
let score = 0;
let playerImg;
let backgroundImg; 
window.preload = () => {
  playerImg = loadImage('images/balloon.png');
  backgroundImg = loadImage('images/darkBack.png');
};

window.setup = () => {
	new Canvas(windowWidth, windowHeight);
  // Following "Images and animations" from https://creative-coding.decontextualize.com/making-games-with-p5-play/
  player = createSprite(windowWidth/2, windowHeight/2);
  player.addImage(playerImg);
  player.scale = 0.1;


  // Reference -- https://editor.p5js.org/mbardin/sketches/OyZLpQW6N 
    fires = new Group();
  
   // while (fires.length < 2) {
      for (let i = 0; i < 1; i++) {
          fire = new Sprite(random(windowWidth), random(windowHeight)); // (random(windowWidth), random(windowHeight));
          fire.img = 'images/fire.png';
          //fire.rotation = 0;
          //fire.rotationSpeed = 1;
          //fire.setSpeed(random(12), random(360));
          fires.add(fire);
      }
   // }
};

window.draw = () => {
	//clear();
    // Using code from "Sprites on the move" of https://creative-coding.decontextualize.com/making-games-with-p5-play/
    //background(1, 36, 68);
    // PULLING FROM INTERACTIVE SKETCH
    background(backgroundImg);
    //background(0, 0, 0);
    //background(200*20*(score+1), 200*(36+score), 200*68*(score+1));
    for (let i = 0; i < 20; i++) {
      //fill(i*5, i*20, i*40)
      //fill(115 - (2*i), 191 - (8*i), 184 - i);
      //fill(115 - (mouseX*30), 191 - (8*i), 184 - i);
      noStroke();
      //stroke(100 - (mouseX/3), 91 - (8*i), 150 - 2*(mouseY/100));
      strokeWeight(1+ player.position.x/400);
      fill(80 + (3*score*i), 1+1.1*score, 1.1*(score+1));
      //fill(20*(score+1), 36+score, 68*(score+1));
      //fill(200 - (player.position.x/3), 191 - (8*i), 250 - 2*(player.position.x/100));
      bezier(5*score/2 - i*1000, -2000 - i*10, 100*(1+score)/2 + 2000, 0, 0, 0, -1000, windowHeight*2 + 20000);
      //bezier(player.position.y + i*3000, 0 + i*10, player.position.x - 4000, player.position.y - 1000, 0, 400, 1000, windowHeight + 1000);
    }

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

    //REFERENCE -- Collision callbacks -- https://creative-coding.decontextualize.com/making-games-with-p5-play/
    if(player.overlap(fires)) {
       expandBalloon(score);
    };
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
  player.scale = 0.1 + 0.3*(0.1*m+1); // scale - https://p5play.org/learn/sprite_animation.html?page=1 
  score += 1;
};
