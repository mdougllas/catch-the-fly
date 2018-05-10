/*
TODO: Style the game and put on the sound effects
*/
const FONT = "24px Titan One";
const BULLETS = 15;
const TIME = "TIME"; 

window.onload = function(){

  //Defining canvas and styles
  canvas = document.getElementById("main-canvas");
  ctx = canvas.getContext("2d");
  ctx.font = FONT;

  //ctx.fillRect (6, 12, 150, 20);//Score Position reference
  //ctx.fillRect (200, 10, 110, 22);//LVL Position reference
  //ctx.fillRect (420, 10, 170, 22);//Bullets spent reference
  //ctx.fillRect (780, 10, 155, 20);//Reference for timer

  //Drawing the top info
  let boardScore = 0,
      lvl = 1,
      bullets = BULLETS,
      starterTime = [1100, 1601],

  //Defining game timing and countdown timer
      min = 0,
      sec = 30,
      timer = null,

  //Forcing last iteration after bullets go 0
  //This is fixing a behavior to not go to 0 bullets on screen
      iterations = 0,
      lastFrame = 1;

  //Simple timer
  const timing = () => {
    ctx.clearRect(780, 10, 155, 20);//Clear canvas where timer goes
    ctx.fillText(TIME + " : " + min + ":" + sec, 800, 30);//Draw timer on canvas
    sec--;
    
    if(sec < 10){
      sec = "0" + sec;//Fixing the left 0 on timer
    }
    if(sec === "0-1"){
      min--;
      sec = 60;
    }
    //Stoping timer and game if bullets goes to 0
    if(bullets <= 0){
      clearInterval(timer);
      lastFrame --;
    }
    //Stoping timer and setting timer null to finish the game
    if(min < 0 && sec === 60){
      clearInterval(timer);
      timer = null;
    }
  }

  //Defining ghosts images
  let defaultGhost = new Image();
  defaultGhost.src = 'images/ghost.png';
  let ghostPos = []; //Initial ghost position

  //Generating random between 2 given numbers
  function randomBtw(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
 //Making ghost randomly popping
  function popGhost() {
    let randomX = randomBtw(30, 920);
    let randomY = randomBtw(30, 610);
    ctx.clearRect(ghostPos[0],ghostPos[1],35,35); //Clear last ghost
    ctx.drawImage(defaultGhost, randomX,randomY, 35, 35); //Create new ghost
    ghostPos = [randomX, randomY];
    return ghostPos; //Need the position to compare with click
  }

  //Making the ghost pops up with random times
  (function loop() {

    //Positioning the score board
    ctx.clearRect(6, 12, 150, 25);
    ctx.fillText("Score: " + boardScore, 20, 30);
    ctx.clearRect(200, 10, 110, 22);
    ctx.fillText("Level: " + lvl, 200, 30);
    ctx.clearRect(420, 10, 170, 22);
    ctx.fillText("Bullets: " + bullets, 420, 30);
    
    //New random position each iteration
    let time = randomBtw(starterTime[0], starterTime[1]);//Random time to ghost appears
    
    function ghostBusting(){
      //Passing the player to the next level
      if(boardScore == lvl*10){
        lvl += 1;
        bullets += 20;
        min += 1;
        sec = 30;
        starterTime = [starterTime[0]-50, starterTime[1]-50];//Ghost appearing speed
      }
      
      if(timer != null){
        loop(); //Finish game when time ends
        let ghostPosition = popGhost(); //Getting the ghost position
        let hit = false; //Trigger when hit ghost

        //This happens when clicks
        window.onclick = function(e){
          if(bullets <= 0){
            bullets = 0;
          } else {
            bullets --;
          }

          let clickPos = [e.layerX, e.layerY]; //Getting the click position
          ctx.fillRect(clickPos[0],clickPos[1],5,5); //Pointing clicked spots

          //Checking when player hits ghost and increasing score
          if(clickPos[0] > ghostPosition[0] & clickPos[0] < ghostPosition[0]+35){
            if(clickPos[1] > ghostPosition[1] & clickPos[1] < ghostPosition[1]+35){

              //Preventing the player to hit the same target more than once
              if(hit == true){
                console.log("bluuu");
              } else {
                console.log("bleh");
                hit = true;
                boardScore ++;
              }

            }
          }//I will put an else here with the 'miss' sound
          
        }//Window onclick function

      } else { //if - ends the game when time goes 0
        //create here a board with results
        
        window.onclick = function(e){}
      }

    }//GhostBusting function
    
    setTimeout(ghostBusting, time);//Random time for ghost appearing

    //Tracking the iterations to force last frame to appears
    //This is fixing the behavior of showing player still have bullets after end
    iterations ++;
    lastFrame ++;
    if(lastFrame == iterations){ //Forcing the last iteration
      timer = null;
    }

      console.log("speed: ", starterTime[0], starterTime[1], "level: ", lvl, "bullets", bullets, "time", min, sec);
    

  }());//Loop function

  timer = setInterval(timing, 1000);

}//Window onload function


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
