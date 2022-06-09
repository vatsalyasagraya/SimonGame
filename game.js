var gamePattern=[];

var buttonSequence=["red","blue","green","yellow"]

var userClickedPattern=[];

var started = true;

var level=0;

$(".btn").click(function(){
    
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

$("body").keypress(function(){
    if(started){

        $("h1").text("Level "+level);
        nextSequence();
        started=false;
        $("body").removeClass("game-over");
    }
});


function nextSequence(){
    
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber=Math.floor(Math.random()*4);   
    var randomChosenColor=buttonSequence[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);

}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    
    } 
    else {
        
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game-Over, Press any key to restart");
        started = true;
        level=0;
        userClickedPattern = [];
        gamePattern=[];
        
    }
    

}





function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 120);
}
