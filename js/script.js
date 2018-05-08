window.onload = function(){

  //Defining canvas
  canvas = document.getElementById("main-canvas");
  ctx = canvas.getContext("2d");

  //Drawing the board score
  let boardScore = 0;
  ctx.fillRect (6, 12, 120, 20);


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
    let randomY = randomBtw(30, 620);
    ctx.clearRect(ghostPos[0],ghostPos[1],35,35);
    //ctx.fillRect(randomX,randomY,35,35);
    ctx.drawImage(defaultGhost, randomX,randomY, 35, 35 );
    ghostPos = [randomX, randomY];
    return ghostPos; //Need the position to compare with click
  }

  //Making the ghost pops up with random times
  (function loop() {
    //Positioning the score
    ctx.clearRect(6, 12, 120, 20);
    ctx.font = '24px Arial';
    ctx.fillText("Score: "+boardScore, 20, 30);
    
    //New random position each iteration
    var time = randomBtw(300, 900);
    setTimeout(function() {
      let ghostPosition = popGhost(); //Getting the ghost position
      loop();
      
      let hit = false;
      window.onclick = function(e){
        let clickPos = [e.layerX, e.layerY]; //Getting the click position
        // console.log("cli",clickPos[0]);
        // console.log(ghostPosition[0]);
        ctx.fillRect(clickPos[0],clickPos[1],5,5);

        if(clickPos[0] > ghostPosition[0] & clickPos[0] < ghostPosition[0]+35){
          if(clickPos[1] > ghostPosition[1] & clickPos[1] < ghostPosition[1]+35){
            if(hit == true){
              console.log("bluuu");
            } else {
              console.log("bleh");
              hit = true;
              boardScore ++;
            }
          }
        }
      }

    }, time);
  }());

  
  ///REFERENCE FUNCTION

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

}
