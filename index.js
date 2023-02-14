// To do: 
//   - Make fire not just move vertically (make it more random and also SLOWER!!!)
//   - Add levels of difficulty ?
//   - Add button to restart game
//   - 

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
let buttonRestart;
window.preload = () => {
  playerImg = loadImage('images/balloon.png');
  // How to add background image -  https://p5js.org/examples/image-background-image.html
  backgroundImg = loadImage('images/darkBack.png');
};

window.setup = () => {
	new Canvas(windowWidth, windowHeight);
  // Following "Images and animations" from https://creative-coding.decontextualize.com/making-games-with-p5-play/
  player = createSprite(windowWidth/2, windowHeight/2);
  player.addImage(playerImg);
  player.scale = 0.2;



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
    fill(255);

    if (score < 2) {
      textSize(20);
      text("Use arrow keys, or SPACE to stop", width/2, height*0.8);
    }
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
     /* if (score >= 35) {
        fires[i].setSpeed(0); // QUESTION -- WHY THEY ARE STILL MOVING
      }*/
    }

    drawSprites();

    //REFERENCE -- Collision callbacks -- https://creative-coding.decontextualize.com/making-games-with-p5-play/
    if(player.overlap(fires)) {
       expandBalloon(score);
    };
    
    textSize(30);
    text('Number of Hits', width/2, height*0.1);
    textStyle(BOLD);
    textSize(50);
    text(score + "/35", width/2, height*0.17);
    textStyle(NORMAL);
    if (score >= 35) {
      textSize(100);
      // textStyle - https://p5js.org/reference/#/p5/textStyle 
      textStyle(BOLD);
      fill(255);
      text("Game over!", width/2, height*0.5);
      text("score");
      fires.setSpeed(0);
      // QUESTION !!! -- WHY ISN'T THIS BUTTON APPEARING
      // https://p5js.org/reference/#/p5/createButton
     /* buttonRestart = createButton('Restart');
      buttonRestart.position(windowWidth/2, windowHeight/8*7);
      buttonRestart.mousePressed(resizeCanvas(windowWidth, windowHeight));*/
      //buttonRestart = createButton('Restart');
      /*buttonRestart = createSprite(windowWidth/2, windowHeight/2);
      buttonRestart.width = 550;
      buttonRestart.height = 50;
      buttonRestart.position.x = windowWidth/2;
      buttonRestart.position.y = windowHeight/8*7;
      buttonRestart.color = 'white';
      buttonRestart.textSize = 20; 
      buttonRestart.text = "Restart";*/
    }
};

window.keyPressed = () => {
    //console.log(keyCode);
    // Note for Error write up -- the direction and speed (using console.log of setspeed to see how the number for keycode wasn't updating for right arrow after the very beginning of the game)
    if (keyCode == RIGHT_ARROW) {
      player.direction = 0;
      player.speed = 3.5;
    }
    else if (keyCode == DOWN_ARROW) {
      player.direction = 90;
      player.speed = 3.5;
    }
    else if (keyCode == LEFT_ARROW) {
      player.direction = 180;
      player.speed = 3.5;
    }
    else if (keyCode == UP_ARROW) {
      player.direction = 270;
      player.speed = 3.5;
    }
    else if (key == ' ') {
      player.direction = 0;
      player.speed = 0;
    }
    return false;  
};

window.expandBalloon = (m) => {
  player.scale = 0.2 + 0.06*(m+1); // scale - https://p5play.org/learn/sprite_animation.html?page=1 
  score += 1;
};
