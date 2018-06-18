
window.onload=function(){
var yourScore = document.getElementById('yourScore');
// var yourScore = getElementById("red", "blue", "purple", "green").onclick(math.sum);
yourScore.innerHTML = 0;
var targetScore = document.getElementById('targetScore');
targetScore.innerHTML = getRandomValue(19, 120);

function addToScore(val) {
  var numberToAdd = parseInt(val);
  var currentScore = parseInt(yourScore.innerHTML);
  yourScore.innerHTML = numberToAdd + currentScore;
}

var red = document.getElementById('red');
red.value = getRandomValue(1, 12);
console.log("red".value);

var blue = document.getElementById("blue");
console.log("blue".value);
blue.value = getRandomValue(1, 12);

var purple = document.getElementById("purple");
console.log("purple".value);
purple.value = getRandomValue(1, 12);

var green = document.getElementById("green");
console.log("green".value);
green.value = getRandomValue(1, 12);

// add an event listener to elements
red.addEventListener('click', function() {
  addToScore(this.value);
  checkPlayerScore();
});

blue.addEventListener('click', function() {
  // this refers to blue
  addToScore(this.value);
  checkPlayerScore();
});

purple.addEventListener('click', function() {
  // this refers to purple
  addToScore(this.value);
  checkPlayerScore();
});

green.addEventListener('click', function() {
  // this refers to green
  addToScore(this.value);
  checkPlayerScore();
});
//var sum = parseInt(red.value) + parseInt(blue.value) + parseInt(yelow.value) + parseInt(green.value);

// console.log (sum);
function getRandomValue (a, b){
  return Math.floor((Math.random() * (b - a)) + a);
}

function checkPlayerScore() {
  //yourScore, targetScore (parseFloat() is for decimals)
  var playerInt = parseInt(yourScore.innerHTML);
  var targetInt = parseInt(targetScore.innerHTML);
  if (playerInt === targetInt) {
      alert('You win!');
  } else if (playerInt > targetInt) {
    alert('You lose!');
  } 
}

console.log(getRandomValue());
}