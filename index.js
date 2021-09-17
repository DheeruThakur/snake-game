// Game variables.

let inputDir = {x:0 , y:0};
const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
const speed = 5;
//let speed=5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
 {x:12 , y:15}
];
let food = {x:6 , y:7};

// Game function....

function main(ctime) {
 window.requestAnimationFrame(main);
 //console.log(ctime);
 if((ctime - lastPaintTime)/1000 < 1/speed) {
  return;
 }
 lastPaintTime = ctime;
 gameEngine();
}

function isCollide(snake){
  // if snake is dump into itself..
  for(let i = 1 ; i < snake.length ; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
     return true;
  } 

// if snake is dump into wall..

  if(snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18) 
   return true;

}


function gameEngine() {
// Update the snakeArray and food
console.log(isCollide(snakeArr))

  if(isCollide(snakeArr)){
    gameoverSound.play();
    musicSound.pause();
    alert("Game is Over. Press Any Key To Play Again")
    snakeArr = [
      {x:12 , y:15}
     ];
    score = 0;
    musicSound.play();

  }

 

  //if you have eaten the food , increment in score and regenerate the food..

  if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
    foodSound.play();
    //speed++
   snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y})
   let a = 2;
   let b = 16;
   food = {x:Math.round(a + (b-a)*Math.random()) , y:Math.round(a + (b-a)*Math.random())};
   score += 1;
   document.getElementById('scoreBox').innerHTML = "Score :" + score;
   if(score > highScoreVal){
    highScoreVal = score;
    localStorage.setItem("highScore" , JSON.stringify(highScoreVal));
    document.getElementById('highScore').innerHTML = "HighScore :" + highScoreVal;
   }

  }

 // moving the snake...

  for(let i = snakeArr.length-2 ; i >= 0 ; i--){
   snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;


  // Display the Snake and Food....
  // Display Snake

  document.querySelector('.board').innerHTML = "";
  snakeArr.forEach((e , index) => {
  let snakeElement = document.createElement('div');
   snakeElement.style.gridRowStart = e.y;
   snakeElement.style.gridColumnStart = e.x;

   if(index === 0) {
    snakeElement.classList.add('head');
   }
   else {
    snakeElement.classList.add('snake');
   }

   document.querySelector('.board').appendChild(snakeElement);

// Display Food

  let foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
   document.querySelector('.board').appendChild(foodElement);
  })
}



// Main logic starts here...
let highScore = localStorage.getItem("highScore");
if(highScore === null){
  highScoreVal = 0;
  localStorage.setItem("highScore" , JSON.stringify(highScoreVal));
}
else{
  highScoreVal = JSON.parse(highScore);
  document.getElementById("highScore").innerHTML = "HighScore :" + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e => {
 inputDir = {x:0 , y:1}; // Start Game....
 moveSound.play();
 musicSound.play();

 switch (e.key) {
  case "ArrowUp":
    console.log('ArrowUp');
    inputDir.x = 0;
    inputDir.y = -1;
   break;
  case "ArrowDown":
    console.log('ArrowDown');
    inputDir.x = 0;
    inputDir.y = 1;
   break;
  case "ArrowLeft":
    console.log('Arrowleft');
    inputDir.x = -1;
    inputDir.y = 0;
   break;
  case "ArrowRight":
    console.log('Arrowright');
    inputDir.x = 1;
    inputDir.y = 0;
   break;
 
  default: 
   break;
 }
})