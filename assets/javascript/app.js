$(document).ready(function () {

    //Questions are an Array holding objects. Each object will be the question w/ 4 answers and the correctPick

    let questions = [
        {
            question: "Littlefinger holds what position in the King's Small Council?",
            answerA: "Master of Whispers",
            answerB: "Hand of the King",
            answerC: "Master of Coin",
            answerD: "Master of War",
            correctPick: "Master of Coin",
            image: '<img src="assets/images/littlefinger1.jpg" alt="image">',
            gif: '<img src="assets/images/littlefinger2.gif" alt="image">'
        },
        {
            question: "Which of these is not a name for Dany's Dragons?",
            answerA: "Rhaegal",
            answerB: "Drogon",
            answerC: "Viserion",
            answerD: "Thoynar",
            correctPick: "Thoynar",
            image: '<img src="assets/images/dany1.jpg" alt="image">',
            gif: '<img src="assets/images/dany2.gif" alt="image">'
        },
        {
            question: "What must a Dothraki do if they are defeated in battle?",
            answerA: "Cut off their braid",
            answerB: "Be exhiled",
            answerC: "Be murdered",
            answerD: "Give up their horse",
            correctPick: "Cut off their braid",
            image: '<img src="assets/images/drogo1.jpg" alt="image">',
            gif: '<img src="assets/images/drogo2.gif" alt="image">'
        },
        {
            question: "What did Joffrey name the sword given to him by his father?",
            answerA: "Stabby",
            answerB: "Widow's Wail",
            answerC: "Heartbreaker",
            answerD: "Ice",
            correctPick: "Widow's Wail",
            image: '<img src="assets/images/joff1.jpg" alt="image">',
            gif: '<img src="assets/images/joff2.gif" alt="image">'
        },
        {
            question: "Growing up, who was Jon Snow's youngest brother?",
            answerA: "Robb",
            answerB: "Bran",
            answerC: "Chachi",
            answerD: "Rickon",
            correctPick: "Rickon",
            image: '<img src="assets/images/jon1.jpg" alt="image">',
            gif: '<img src="assets/images/jon2.gif" alt="image">'
        },
        {
            question: "What are the Lannister's house words?",
            answerA: "A Lion Never Forgets",
            answerB: "Dolla Dolla Billz, y'all",
            answerC: "Honor, Glory, Money",
            answerD: "Hear Me Roar!",
            correctPick: "Hear Me Roar!",
            image: '<img src="assets/images/lannister1.jpg" alt="image">',
            gif: '<img src="assets/images/lannister2.gif" alt="image">'
        },
        {
            question: "Melisandre believes Stannis is actually... ?",
            answerA: "A Targaryen",
            answerB: "A Traitor",
            answerC: "A Boring Loser",
            answerD: "Azor Ahai",
            correctPick: "Azor Ahai",
            image: '<img src="assets/images/mel1.jpg" alt="image">',
            gif: '<img src="assets/images/mel2.gif" alt="image">'
        },
        {
            question: "Before joining the Night's Watch, Sam belonged to what house?",
            answerA: "Stark",
            answerB: "Greyjoy",
            answerC: "Tarly",
            answerD: "Baratheon",
            correctPick: "Tarly",
            image: '<img src="assets/images/sam1.jpg" alt="image">',
            gif: '<img src="assets/images/sam2.gif" alt="image">'
        },
        {
            question: "The Bolton's were reknown for what practice?",
            answerA: "Witchcraft",
            answerB: "Skinning people alive",
            answerC: "Selling their children",
            answerD: "Breaking truces",
            correctPick: "Skinning people alive",
            image: '<img src="assets/images/bolton1.jpg" alt="image">',
            gif: '<img src="assets/images/bolton2.gif" alt="image">'
        },
        {
            question: "What nicknames does Varys go by?",
            answerA: "Cueball",
            answerB: "Sneaky V",
            answerC: "The Spider",
            answerD: "The Shadow on the Wall",
            correctPick: "The Spider",
            image: '<img src="assets/images/varys1.jpg" alt="image">',
            gif: '<img src="assets/images/varys2.gif" alt="image">'
        },

    ];

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

shuffle(questions);
console.log(questions);

    //  Variables that will hold our interval ID when we execute the "run" function, what question we're on and 
    // scoreboard varibles for endgame reveal
    let timeLeft = 20;
    let intervalId;
    let currentQuestion = 0;
    let correctAns = 0;
    let incorrectAns = 0;
    let noAns = 0;

    
    $(".timer").hide();
    $(".optionBtn").hide();

    //  When the start button gets clicked, question 0 loaded, show buttons and execute the run clock function.
    $(".startBtn").on("click", function () {
        reset();

        $(".questionDiv").text(questions[currentQuestion].question);
        $(".questImg").html(questions[currentQuestion].image);
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
            $(".questImg").html(questions[currentQuestion].gif);
            correctAns++;
            $(".optionBtn").toggle();
            stop();
            //     "<h2 class='text-danger'> Correct!" + "</h2>" +
            //     "<img src='https://media0.giphy.com/media/rTg5MCCGlpvMs/200.webp' alt='CORRECT' class='img-fluid'>"
        }

        //If user chooses incorrect answer
        else {
            console.log("That's Wrong")
            $(".questionDiv").text("SORRY. The Answer was " +questions[currentQuestion].correctPick);
            $(".questImg").html(questions[currentQuestion].gif);
            incorrectAns++;
            $(".optionBtn").toggle();
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
            $(".optionBtn").toggle();
            $(".questionDiv").text("TIME UP. The Answer was " +questions[currentQuestion].correctPick);
            $(".questImg").html(questions[currentQuestion].gif);
            //  Pass to stop.
            stop();

        }
    }

    //  The stop function clears the interval, resets the timer and hands over reloader after 3 seconds
    function stop() {
       
        clearInterval(intervalId);
        timeLeft = 20;
        setTimeout(reloader, 1000 * 4);
        
    }

    //cues up next question or takes you final score if you've reached the end.   
    function reloader() {
        currentQuestion++;
        $(".optionBtn").toggle();
        if(currentQuestion < questions.length){
        $(".questionDiv").text(questions[currentQuestion].question);
        $(".questImg").html(questions[currentQuestion].image);
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
        $(".timer").hide();
        $(".questionDiv").text("You Got " + correctAns + " correct! You got " + incorrectAns + " incorrect. Time Expired: " + noAns + ". Play again?");
        currentQuestion = 0; 
        $(".startBtn").text("CLICK TO PLAY AGAIN!")
        $(".startBtn").show();
        $(".optionBtn").hide();

        if (correctAns > incorrectAns && correctAns > noAns){
            $(".questImg").html('<img src="assets/images/dancing.gif" alt="image">');
        } else {
            $(".questImg").html('<img src="assets/images/shame.gif" alt="image">');
        }

    }

    function reset(){
        timeLeft = 20;
        intervalId;
        currentQuestion = 0;
        correctAns = 0;
        incorrectAns = 0;
        noAns = 0;
        shuffle(questions);
    }


});