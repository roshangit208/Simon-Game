
var buttonsColor =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animate(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
               nextSequence();
            },1000);
        }

    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function()
        {
          $("body").removeClass("game-over");
        },200);

        $("h1").html("Game-Over , Press Any Key to Start");
        startOver();

    }
}


function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;

}

function animate(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


function nextSequence()
{
    userClickedPattern = [];
    $("h1").html("level "+ level);
    level = level +1;
    var randomNumber =  Math.floor(Math.random()*3);
    var randomchossenColor = buttonsColor[randomNumber];
    gamePattern.push(randomchossenColor);

    $("#"+randomchossenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchossenColor);

}

function playSound(name)
{
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}



$(document).keypress(function()
{
   if(!started)
   {
     nextSequence();
     started = true;
   }
 
});