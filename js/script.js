window.onload = function(){

  //Defining canvas and styles
  canvas = document.getElementById("main-canvas");
  ctx = canvas.getContext("2d");
  ctx.font = '24px Titan One';

  //Drawing the board score
  let boardScore = 0;
  //ctx.fillRect (6, 12, 150, 20);//Position reference
  //ctx.fillRect (780, 10, 155, 20);//Reference for timer

  //Defining game timing and countdown timer
  var min = 3; //
  var sec = 59;
  let timer = null;

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
    ctx.clearRect(ghostPos[0],ghostPos[1],35,35); //Cler last ghost
    ctx.drawImage(defaultGhost, randomX,randomY, 35, 35 ); //Create new ghost
    ghostPos = [randomX, randomY];
    return ghostPos; //Need the position to compare with click
  }

  //Making the ghost pops up with random times
  (function loop() {
    //Positioning the score
    ctx.clearRect(6, 12, 150, 25);
    ctx.fillText("Score: "+boardScore, 20, 30);
    
    //New random position each iteration
    var time = randomBtw(300, 900);//Random time to ghost appears
    setTimeout(function() {
      let ghostPosition = popGhost(); //Getting the ghost position
      loop();
      
      let hit = false; //Trigger when hit ghost
      window.onclick = function(e){
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
        
      }

    }, time);
  }());


  //Simple timer
  function timing(){
    ctx.clearRect(780, 10, 155, 20);
    ctx.fillText("Time: " + min + ":" + sec, 800, 30);
    sec--;
    if(sec < 10){
      sec = "0" + sec;
    }
    if(sec == "0-1"){
      min--;
      sec = 60;
    }
    if(min < 0 && sec == 60){
      clearInterval(timer);
    }
  }
  timer = setInterval(timing, 1000);


}


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
