// TODO: Review the code and make it better
const
  FONT = "14px Titan One",
  FONTCOLOR = "white",
  SHADOW = 20,
  SHADOWCOLOR = "white",
  TIMEWORD = "TIME",
  SECONDS = 30,
  MINUTES = 0,
  GAMELEVEL = 1,
  GAMESPEED = [1100, 1601],
  CANVAS = "main-canvas",
  CONTEXT = "2d";
  SCORE = 0,
  BULLETS = 15,
  LEVEL = 1
;

let loadGame = function(){

  //Game intro elements
  let
  count = 1,
    startButton = document.getElementById("start-game"),
    intro = document.getElementById("intro"),

    //Game end elements
    end = document.getElementById("end"),
    finalScore = document.getElementsByTagName("p"),
    playAgain = document.getElementById("play-again"),

    //Starting sounds
    bgMusic = new Audio('sounds/bg-music.mp3'),
    shoot = new Audio('sounds/shoot.mp3'),
    hitGhost = new Audio('sounds/hit.mp3'),
    lvlUp = new Audio('sounds/lvlUp.mp3'),
    gameOver = new Audio('sounds/game-over.mp3'),

    //Getting the window size
    canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight,
    margin = canvasWidth / 40
  ;

  //Managing volume
  bgMusic.volume = .3;
  shoot.volume = 1;
  hitGhost.volume = .3;
  lvlUp.volume = .5;
  gameOver.volume = .8;

  bgMusic.loop = true;//Looping the background music

  //Defining canvas and styles
  let canvas = document.getElementById(CANVAS);
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  ctx = canvas.getContext(CONTEXT);
  ctx.font = FONT;
  ctx.fillStyle = FONTCOLOR;

  let playGame = function(){ // Starting game
    bgMusic.play();

    //References for development
    // ctx.fillRect (margin, margin/2, canvasWidth/5, margin); //Score Position reference (y, x, width, height)
    // ctx.fillRect (canvasWidth/4, margin/2, canvasWidth/5, margin); //LVL Position reference
    // ctx.fillRect ((canvasWidth/3)+(canvasWidth/7), margin/2, canvasWidth/5, margin); //Bullets spent reference
    // ctx.fillRect ((canvasWidth/3), MARGIN/2, 155, 20); //Reference for timer

    //Drawing the top info
    let boardScore = SCORE,
        lvl = LEVEL,
        bullets = BULLETS,
        gameSpeed = GAMESPEED,

    //Defining game timing and countdown timer
        min = 0,
        sec = 30,
        hit = false;//Trigger when hit ghost

        let board = null;

        timer = null;//Call the interval to the timing function
        //timer variable is also responsible for stopping the game

    //Simple timer
    const timing = () => {
    //   ctx.clearRect(canvasWidth / 2, margin * 2, 155, 20);//Clear canvas where timer goes
    //   ctx.fillRect(canvasWidth / 2, margin * 2, 155, 20);//Clear canvas where timer goes
    //   ctx.fillText(TIMEWORD + ": " + min + ":" + sec, canvasWidth / 2 + margin, 30);//Draw timer on canvas
      sec--;

      if(sec < 10){
        sec = "0" + sec; //Fixing the left 0 on timer
      }
      if(sec === "0-1"){
        min--;
        sec = 60;
      }
      //Stoping timer and game if bullets goes to 0
      if(bullets <= 0){
        clearInterval(timer);
        clearInterval(board);
        timer = null;
      }
      //Stoping timer and setting timer null to finish the game
      if(min < 0 && sec === 60){
        clearInterval(timer);
        clearInterval(board);
        timer = null;
      }
    }

    //Positioning the score board
    const infoBoard = () => {
      ctx.clearRect(6, 12, 150, 25);
      ctx.fillRect(canvasHeight / 50, canvasHeight / 100, 150, 25);
      ctx.fillText("Score: " + boardScore, 20, 30);
      ctx.clearRect(200, 10, 110, 22);
      ctx.fillText("Level: " + lvl, 200, 30);
      ctx.clearRect(420, 10, 170, 22);
      ctx.fillText("Bullets: " + bullets, 420, 30);
    }

    //Defining game images
    let defaultGhost = new Image();
    defaultGhost.src = 'images/ghost-default.png';
    let ghostPos = []; //Initial ghost position
    let dieGhost = new Image();
    dieGhost.src = 'images/ghost-die.png';
    let bulletHole = new Image();
    bulletHole.src = 'images/bullet-hole.png';
    //

    //Generating random between 2 given numbers
    function randomBtw(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

  //Making ghost randomly popping
    function popGhost(){
      let randomX = randomBtw(margin + 15, canvasWidth - (margin + 15));
      let randomY = randomBtw(margin * 2 + 15, canvasHeight - (margin + 15));
      ctx.clearRect(ghostPos[0], ghostPos[1], margin + 15, margin + 15); //Clear last ghost
      ctx.drawImage(defaultGhost, randomX, randomY, margin + 15, margin + 15); //Create new ghost
      ghostPos = [randomX, randomY];
      console.log("ghost position", ghostPos)
      console.log("Canvas w", canvasWidth)
      console.log("Canvas h", canvasHeight)
      console.log("Counter", count)
      count ++
      return ghostPos; //Need the position to compare with click
    }

    //Making the ghost pop up with random times
    (function loop(){
      ctx.clearRect(ghostPos[0], ghostPos[1] - 16, margin + 30, margin + 30);

      //New random position each iteration
      let time = randomBtw(gameSpeed[0], gameSpeed[1]);//Random time to ghost appears

      function ghostBusting(){

        //Passing the player to the next level
        if(boardScore == lvl*10){
          lvlUp.play();
          lvl += 1;
          bullets += 20;
          min += 1;
          sec = 30;
          gameSpeed = [gameSpeed[0]-100, gameSpeed[1]-100];//Ghost appearing speed
        }

        if(timer != null){ //Finish game when time ends
          loop();
          let ghostPosition = popGhost(); //Getting the ghost position
          hit = false;

          //This happens when clicks
          window.onclick = function(e){
            if(bullets <= 0){
              bullets = 0;
            } else {
              bullets --;
            }

            let clickPos = [e.layerX, e.layerY]; //Getting the click position
            ctx.drawImage(bulletHole, clickPos[0], clickPos[1], 10, 10);//Pointing clicked spots

            //Checking when player hits ghost and increasing score
            if(clickPos[0] > ghostPosition[0] & clickPos[0] < ghostPosition[0] + margin + 15){
              if(clickPos[1] > ghostPosition[1] & clickPos[1] < ghostPosition[1] + margin + 15){

                //Preventing the player to hit the same target more than once
                if(hit == true){
                  null
                } else {
                  ctx.clearRect(ghostPos[0],ghostPos[1], margin + 15, margin + 15); //Clear last ghost
                  ctx.drawImage(dieGhost, ghostPos[0], ghostPos[1], margin + 15, margin + 15); //Showing hurt ghost
                  ctx.fillText("+1", ghostPos[0], ghostPos[1] - 3);//Point +1 popping up over ghost
                  hitGhost.play();
                  hit = true;
                  boardScore ++;
                }

              }
            }
            if(shoot.duration > 0){
              shoot.pause();
              shoot.currentTime = 0;
              shoot.play();
            }else
            shoot.play();

          }//Window onclick function

        } else { //if - ends the game when time goes 0
          //create here a board with results
          bgMusic.pause();
          gameOver.play();
          end.style = "display: block";
          finalScore[1].innerHTML = "Your score: "+boardScore;
          finalScore[2].innerHTML = "Your level: "+lvl;
          window.onclick = function(e){}
        }

      }//GhostBusting function

      setTimeout(ghostBusting, time);//Random time for ghost appearing

    }());//Loop function

    //Setting interval for info board and timer updating
    timer = setInterval(timing, 1000);
    board = setInterval(infoBoard, 100);
    intro.style = "display: none";
  }//Play Game function

  startButton.onclick = playGame;

  playAgain.onclick = function(){
    end.style = "display:none";
    bgMusic.currentTime = 0;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    playGame();
  }
}//Load Game function

window.onload = loadGame;


  ///REFERENCE FUNCTION - SHOWING MOUSE POSITION SCREEN

  // function writeMessage(canvas, message) {
  //   ctx.clearRect(0, 0, 500, 120);
  //   ctx.font = '18pt Calibri';
  //   ctx.fillStyle = 'black';
  //   ctx.fillText(message, 10, 25);
  // }
  // function getMousePos(canvas, evt) {
  //   var rect = canvas.getBoundingClientRect();
  //   return {
  //     x: evt.clientX - rect.left,
  //     y: evt.clientY - rect.top
  //   };
  // }

  // canvas.addEventListener('mousemove', function(evt) {
  //   var mousePos = getMousePos(canvas, evt);
  //   var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  //   writeMessage(canvas, message);
  // }, false);
