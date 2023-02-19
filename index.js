// Also reference -- https://p5play.org/learn/ 

// https://creative-coding.decontextualize.com/making-games-with-p5-play/
// Pulling from Sprite Groups example

// https://p5play.org/learn/sprite.html?page=3
let player;
let fire;
let fires;
let score = 0;
let playerImg;
let backgroundImg; 
let buttonRestart;
let song;
let musiccontrol;
let musicImgPause;
let musicImgPlay;
let countMusicControl = 0;

window.preload = () => {
  playerImg = loadImage('images/balloon.png');
  // How to add background image -  https://p5js.org/examples/image-background-image.html
  musicImgPause = loadImage('images/pauseim.png');
  musicImgPlay = loadImage('images/playim.png');
  backgroundImg = loadImage('images/darkBack.png');
};

window.setup = () => {
  song = loadSound('./audio/gameaudio.mp3');
	new Canvas(windowWidth, windowHeight);
  // Following "Images and animations" from https://creative-coding.decontextualize.com/making-games-with-p5-play/
  player = createSprite(windowWidth/2, windowHeight/2);
  player.addImage(playerImg);
  player.scale = 0.2;

  musiccontrol = createSprite(windowWidth/8*7, windowHeight/8*1);
  musiccontrol.addImage(musicImgPlay);
  musiccontrol.scale = 0.15;
  musiccontrol.collider = 'none';

  





  // Reference -- https://editor.p5js.org/mbardin/sketches/OyZLpQW6N 
    fires = new Group();
  
   // while (fires.length < 2) {
      for (let i = 0; i < 5; i++) { // before was 1
          fire = new Sprite(random(windowWidth), random(windowHeight)); 
          fire.img = 'images/fire.png';
          fire.speed = random(10); 
          fire.rotationSpeed  = random(10); //0.5;
          fire.position.x = random(windowWidth);
          fire.position.y = random(windowHeight);
          fires.add(fire);
          console.log("Length: " + fires.length);
      }
   // }
};

window.draw = () => {
    // Using code from "Sprites on the move" of https://creative-coding.decontextualize.com/making-games-with-p5-play/
    background(backgroundImg);

    for (let i = 0; i < 20; i++) {
      noStroke();
      strokeWeight(1+ player.position.x/400);
      fill(80 + (3*score*i), 1+1.1*score, 1.1*(score+1));
      bezier(5*score/2 - i*1000, -2000 - i*10, 100*(1+score)/2 + 2000, 0, 0, 0, -1000, windowHeight*2 + 20000);
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
      if (fires[i].position.x > windowWidth) {
        fires[i].position.x = 0;
      } else if (fires[i].position.x < 0) {
        fires[i].position.x = windowWidth - 10;
      }

      if (fires[i].position.y > windowHeight) {
        fires[i].position.y = 0;
      } else if (fires[i].position.y < 0) {
        fires[i].position.y = windowHeight - 10;
      }
    }

    drawSprites();

    //REFERENCE -- Collision callbacks -- https://creative-coding.decontextualize.com/making-games-with-p5-play/
    for (let i = 0; i < fires.length; i++) {
      if(player.overlap(fires[i])) {
        expandBalloon(score);
      };
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
    }
};

window.keyPressed = () => {
    //console.log(keyCode);

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


window.mousePressed = () => {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    musiccontrol.remove();
  // background(255, 0, 200);
        musiccontrol = createSprite(windowWidth/8*7, windowHeight/8*1);
        musiccontrol.addImage(musicImgPlay);
        musiccontrol.scale = 0.15;
        musiccontrol.collider = 'none';
  } else {
    //song.play();
    song.loop();
    musiccontrol.remove();
    musiccontrol = createSprite(windowWidth/8*7, windowHeight/8*1);
    musiccontrol.addImage(musicImgPause);
    musiccontrol.scale = 0.15;
    musiccontrol.collider = 'none';
  }
};


window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
};
