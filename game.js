
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


$(".btn").click(function(){
  var buttonClicked = $(this).attr("id");
  userClickedPattern.push(buttonClicked);
    playSound(buttonClicked);
    animatePress(buttonClicked);
    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  
  level++;
  $("h1").html("Level " + level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
        console.log(userClickedPattern.length);
        console.log(gamePattern.length);
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);  
        }

    }
    else{
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart. Level " + level);
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

$(document).keydown(function(){
    if(!started){
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
    }
});

