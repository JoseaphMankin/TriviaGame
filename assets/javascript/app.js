$(document).ready(function () {

    //Questions are an Array holding objects. Each object will be the question w/ 4 answers and the correctPick

    let questions = [
        {
            question: "What's the name of Eddard Stark's Sword?",
            answerA: "Stabby",
            answerB: "Shiny",
            answerC: "Pokey",
            answerD: "Ice",
            correctPick: "Ice"
        },
        {
            question: "What it Be?",
            answerA: "Yup",
            answerB: "Nope",
            answerC: "Lame",
            answerD: "Dope",
            correctPick: "Yup"
        }

    ];

    //  Variables that will hold our interval ID when we execute the "run" function, what question we're on and 
    // scoreboard varibles for endgame reveal
    let timeLeft = 5;
    let intervalId;
    let currentQuestion = 0;
    let correctAns = 0;
    let incorrectAns = 0;
    let noAns = 0;

    $(".optionBtn").hide();
    $(".timer").hide();

    //  When the start button gets clicked, question 0 loaded, show buttons and execute the run clock function.
    $(".startBtn").on("click", function () {
        reset();

        $(".questionDiv").text(questions[currentQuestion].question);
        $(".opt1").text(questions[currentQuestion].answerA);
        $(".opt2").text(questions[currentQuestion].answerB);
        $(".opt3").text(questions[currentQuestion].answerC);
        $(".opt4").text(questions[currentQuestion].answerD);
        $(".startBtn").hide();
        $(".optionBtn").show();
        $(".timer").show();
        run();

    });

    //On-click event when user chooses an answer
    $(".optionBtn").on("click", function () {
        var userGuess = $(this).text();

        //If user chooses correct answer
        if (userGuess === questions[currentQuestion].correctPick) {
            console.log("That's Right");
            $(".questionDiv").text("THAT'S RIGHT. The Answer is " +questions[currentQuestion].correctPick);
            correctAns++;
            // $(".optionBtn").off();
            stop();
            //     "<h2 class='text-danger'> Correct!" + "</h2>" +
            //     "<img src='https://media0.giphy.com/media/rTg5MCCGlpvMs/200.webp' alt='CORRECT' class='img-fluid'>"
        }

        //If user chooses incorrect answer
        else {
            console.log("That's Wrong")
            $(".questionDiv").text("SORRY. The Answer was " +questions[currentQuestion].correctPick);
            incorrectAns++;
            // $(".optionBtn").off();
            stop();
            // incorrect();
        }
    });

    //ALL THE TIMER OPERATIONS START HERE

    //  Run starts the clock and also fires toggle decrement function once a second
    function run() {
        clearInterval(intervalId); //probably not needed, but keeping just in case
        intervalId = setInterval(decrement, 1000);
        $(".timer").html("<h2> TIME REMAINING: " + timeLeft + "</h2>");
    }

    //  The decrement function for counting down the clock and showing remaining time
    function decrement() {
        timeLeft--;
        $(".timer").html("<h2> TIME REMAINING: " + timeLeft + "</h2>");

        //  If time runs out...
        if (timeLeft === 0) {
            noAns++;
            // $(".optionBtn").toggle();
            $(".questionDiv").text("TIME UP. The Answer was " +questions[currentQuestion].correctPick);
            //  Pass to stop.
            stop();

        }
    }

    //  The stop function clears the interval, resets the timer and hands over reloader after 3 seconds
    function stop() {
       
        clearInterval(intervalId);
        timeLeft = 5;
        setTimeout(reloader, 1000 * 3);
        
    }

    //cues up next question or takes you final score if you've reached the end.   
    function reloader() {
        currentQuestion++;
        if(currentQuestion < questions.length){
        $(".questionDiv").text(questions[currentQuestion].question);
        $(".opt1").text(questions[currentQuestion].answerA);
        $(".opt2").text(questions[currentQuestion].answerB);
        $(".opt3").text(questions[currentQuestion].answerC);
        $(".opt4").text(questions[currentQuestion].answerD);
        run();
        } else {
            finalScreen();
        }
       
        
    }

    function finalScreen(){
        $(".questionDiv").text("You Got " + correctAns + " correct! You got " + incorrectAns + " incorrect. You didn't answer " + noAns + ". Play again?");
        currentQuestion = 0; 
        $(".startBtn").text("CLICK TO PLAY AGAIN!")
        $(".startBtn").show();

    }

    function reset(){
        timeLeft = 5;
        intervalId;
        currentQuestion = 0;
        correctAns = 0;
        incorrectAns = 0;
        noAns = 0;
    }


});