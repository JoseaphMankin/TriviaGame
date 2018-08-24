$(document).ready(function () {

    // Start Button to get game going. Probably set in HTML connected to Reset Function.
    // Question presented w/ 4 options. timer starts

    //  Variable that will hold our interval ID when we execute the "run" function
    let timeLeft = 6;
    let intervalId;

    //  When the start button gets clicked, execute the run function.
    $(".startBtn").on("click", run);

    //  The run function sets an interval
    //  that runs the decrement function once a second.
    //  *****BUG FIX******** 
    //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.
    function decrement() {

        //  Decrease number by one.
        timeLeft--;

        //  Show the number in the #show-number tag.
        // $(".timer").text(timeLeft);
        $(".timer").html("<h2> TIME REMAINING: " + timeLeft + "</h2>");


        //  Once number hits zero...
        if (timeLeft === 0) {

            //  ...run the stop function.
            stop();

            //  Alert the user that time is up.
            console.log("Time Up!");
        }
    }

    //  The stop function
    function stop() {
        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
        timeLeft = 6;
        setTimeout(fiveSeconds, 1000 * 5);
    }
    
    function fiveSeconds() {
       run();
    }


    // answer picked. right answer shown for 5 seconds
    // Next question presented. repeat for x questions.
    // After all questions asked, present Right/Wrong/Didn't answer. Restart button

});