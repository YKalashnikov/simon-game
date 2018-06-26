//variables
userSeq = [];
simonSeq = [];
const NUM_OF_LEVELS = 10;
var id, color, level = 0;
var strict = false;
var error = false;
var gameOn = false 
var boardSound = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", 
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", 
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", 
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"    
];


$(document).ready(function() {
  $(".display").text("");
  $(".start").click(function() {
    // $(".switch").text("Playing")
    strict = false;
    error = false;
    level = 0;
    level++;
    simonSeq = []
    userSeq = [];
    simonSequence();
  })


  $(".pad").click(function() {
    id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[1];
    userSequence();
  });


  $(".strict").click(function() {
    level = 0;
    level++;
    simonSeq = []
    userSeq = [];
    strict = true;    
    simonSequence();
  })


  $(".switch").click(function() {    
    gameOn = (gameOn == false) ? true : false;
    console.log(gameOn);
    if(gameOn) {
      $(".inner-switch").addClass("inner-inactive");
      $(".switch").addClass("outter-active");
      $(".display").text("00")
    }
    else {
      $(".inner-switch").removeClass("inner-inactive");
      $(".switch").removeClass("outter-active");
      $(".display").text("");
    }    
  })
})


function userSequence() {
  userSeq.push(id);
  console.log(id+" "+color);
  addClassSound(id, color);

  if(!checkUserSeq()) {

    if(strict) {
      simonSeq = [];
      level = 1;
    }   
    error = true;   
    displayError();
    userSeq = [];      
    simonSequence();
  }
  else if(userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS) {
    level++;
    userSeq = [];
    error = false;
    console.log("start simon")
    simonSequence();
  }
  if(userSeq.length == NUM_OF_LEVELS) {
    displayWinner();
    resetGame();
  }     

}
function simonSequence() {
  $(".display").text(level);
  if(!error) {
    getRandomNum();
  }
  if(error && strict) {
    getRandomNum();
  }  
  var i = 0;
  var myInterval = setInterval(function() {
    id = simonSeq[i];
    color = $("#"+id).attr("class");
    color = color.split(" ")[1];
    console.log(id+" "+color);
    addClassSound(id, color);
    i++;
    if(i == simonSeq.length) {
      clearInterval(myInterval);
    } 
  }, 1000);  
}
function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}
function addClassSound(id, color) {
  $("#"+id).addClass(color+"-active");
  playSound(id)
  setTimeout(function(){
    $("#"+id).removeClass(color+"-active");
  }, 500);
}
function checkUserSeq() {
  for(var i = 0; i < userSeq.length; i++) {
    if(userSeq[i] != simonSeq[i]) {      
      return false;
    }
  }
  return true;
}
function displayError() {  
  var counter = 0;
  var myError = setInterval(function() {
    $(".display").text("Err");
    counter++;
    if(counter == 3) {
      $(".display").text(level);
      clearInterval(myError);
      userSeq = [];
      counter = 0;
    }
  }, 500);
}
function resetGame() {
  userSeq = [];
  simonSeq = [];
  level = 0;
  $(".display").text("00");
}
function displayWinner() {
  var count = 0;
  var winInterval = setInterval(function() { 
    count++;
    $(".display").text("Win");
    if(count == 5) {
      clearInterval(winInterval);
      $(".display").text("00");
      count = 0;
    }
  }, 500);
}
function playSound(id) {
  var sound = new Audio(boardSound[id]);
  sound.play();
}