function init() {
    //Initial value of time remaining
    var timeRemaining = 0;

    var startBtnEl = document.getElementById("start-button");
    var timeRemainingEl = document.getElementById("time-remaining");
    var finalScoreEl = document.getElementById("final-score");
    var numQuestions = questions.length;
    var landingContainerEl = document.getElementById("landing-container");
    var quizContainerEl = document.getElementById("quiz-container");
    var finalContainerEl = document.getElementById("final-container");
    var submitBtnEl = document.getElementById("submit-initials");
    var highscoreBtnEl = document.getElementById("highscore-container");
    var highScores = [];

    function startQuiz() {
        //Upon starting the quiz the landing page disappears
        landingContainerEl.setAttribute("class", "container empty");
        //Quiz page appears
        quizContainerEl.setAttribute("class", "container");
        var currentQuestions = 1;
        var score = 0;
        //When the quiz begins time remaining variable is assigned a value of 10 seconds per each question then will decrement by 1 seconds. If the user is wrong the time remaining will be deducted by 10.
        timeRemaining = numQuestions * 10;
        timeRemainingEl.setAttribute("value",timeRemaining);


    }


}