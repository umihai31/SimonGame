
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var score = 0 ;

var started = false;

var level = 0;


$(document).keypress(function() {
  if (!started) {


    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document.body).click(function(){
    if (!started) {

      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      console.log(started)
    }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(gamePattern.length)

});

function nextSequence() {


  level++; 
  userClickedPattern = [];

  $("#level-title").text("Level " + level);
  $("#score-tag").text("Score: " + score);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    
    console.log("bravo");

    if (userClickedPattern.length == gamePattern.length){
      score++;
      console.log("merge");
        setTimeout(function(){
          nextSequence();
          console.log(gamePattern);
          console.log(userClickedPattern);
         
        },1000);  
    }

  }
  else {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart")
      console.log('wrong');
      startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern=[]
  started = false;
  score = 0 ;
}