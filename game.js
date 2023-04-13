$(document).ready(function() {

    let buttonColors= ["red", "blue", "green", "yellow"];

    let gamePattern= [];    

    let userClickedPattern= [];

    let started= false;

    let level= 0;

    $(document).on("keydown", function(){
        if (!started) {
            $(`#level-title`).text(`Level ${level}`);
            nextSequence();
            started= true;
        }
    })



    $(".btn").click(function(){
        
       
        let userChosenColor= $(this).attr("id");

       userClickedPattern.push(userChosenColor);

       playSound(userChosenColor);

       animatePress(userChosenColor);

       let lastIndex= userClickedPattern.length-1;
       
       checkAnswer(lastIndex);
      

       

    //    console.log(userClickedPattern);

    })

    function checkAnswer(currentLevel) {

        //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
          console.log("success");
    
          //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
          if (userClickedPattern.length === gamePattern.length){
    
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    
        } else {
    
            playSound("wrong");

            $("body").addClass("game-over")

            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);

            $(`#level-title`).text("Game Over, Press Any Key to Restart");

            startOver();

        //   console.log("wrong");
            
        }
    
    }


    const nextSequence= function() 
        {
            userClickedPattern= [];

            level ++;

            $(`#level-title`).text(`Level ${level}`);
            
            let randomNumber= Math.floor(Math.random()*4);

            let randomChosenColor= buttonColors[randomNumber];

            gamePattern.push(randomChosenColor);

            $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

            playSound(randomChosenColor);
          
         };    

    const playSound= function(name){
        let audio= new Audio(`sounds/${name}.mp3`);
        audio.play();
    }

    const animatePress= function(currentColor) {
        
        $(`#${currentColor}`).addClass("pressed");

        setTimeout(function() {
            $(`#${currentColor}`).removeClass("pressed");
        }, 100);

    }

    const startOver= function(){
        level= 0;
        gamePattern= [];
        started= false;
    }



});