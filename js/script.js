window.onload = function(){

  //Defining canvas
  canvas = document.getElementById("main-canvas");
  ctx = canvas.getContext("2d");

  //Defining ghosts images
  let defaultGhost = new Image();
  defaultGhost.src = 'images/ghost.png';

  //Generating random between 2 given numbers
  function randomBtw(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  

  function popGhost() {
    let randomX = randomBtw(30, 920);
    let randomY = randomBtw(30, 620);
    ctx.clearRect(0,0,950,650);
    ctx.fillRect(randomX,randomY,35,35);
    ctx.drawImage(defaultGhost, randomX,randomY, 35, 35 );
    let ghostPos = [randomX, randomY];
    return ghostPos;
  }


  (function loop() {
      var rand = randomBtw(600, 1500);
      setTimeout(function() {
        let b = popGhost();
        loop();
        console.log(b);

        window.onclick = function(e){
          console.log(e.layerX);
          console.log(e.layerY);
        }
      
      }, rand);
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
