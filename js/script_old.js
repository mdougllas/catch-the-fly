window.onload = function(){

  mainCanvas = document.getElementById("main-canvas");
  ctx = mainCanvas.getContext("2d");

  //Random final position
  let randomX = Math.floor(Math.random()*mainCanvas.width);
  let randomY = Math.floor(Math.random()*mainCanvas.height);

  //Generating random
  function randomBtw(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
// Example \Math.random = 0.5, max = 10, min = 5, 7



  //Generating random x and y speed/direction
  let movX = randomBtw(1,10);
  let movY = randomBtw(1,10);

  //Array will store new position
  let newPosition = [];

  let fly = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
  }

  //Getting the random final position
  moving = {
    finalX: randomX,
    finalY: randomY,
  }
  //Clearing the canvas
  function clearCanvas() {
    ctx.clearRect(0,0,950,650);
  }

  function moveFly(){
    fly.x += movX;
    fly.y += movY;
    clearCanvas();
    ctx.fillRect(fly.x,fly.y,fly.width,fly.height);
    if(fly.x < moving.finalX-20 && fly.y < moving.finalY-20)
    window.requestAnimationFrame(moveFly);
  }

  window.onclick = function(e){
    randomX = Math.floor(Math.random()*mainCanvas.width);
    randomY = Math.floor(Math.random()*mainCanvas.height);
    moving.finalX = randomX;
    moving.finalY = randomY;
    console.log("x= ", fly.x, " y= ", fly.y);
    movX = randomBtw(2,3);
    movY = randomBtw(2,3);
    lastX = fly.x;
    lastY = fly.y;

    function moveFly2(){
      if(lastX <= 475){
        fly.x += movX;
      } else {
        fly.x -= movX;
      }
      if(lastY <= 325)
        fly.y += movY;
        else
        fly.y -= movY;
          clearCanvas();
      ctx.fillRect(fly.x,fly.y,fly.width,fly.height);
      if(fly.x < moving.finalX && fly.y < moving.finalY)
      window.requestAnimationFrame(moveFly2);
    }
    window.requestAnimationFrame(moveFly2);
    console.log(movX, movY, moving.finalX, moving.finalY);

  }



  window.requestAnimationFrame(moveFly);

};

