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
        timeRemainingEl.setAttribute("value", timeRemaining);

        var interval = setInterval(function () {
            if (timeRemaining < 1) {
                clearInterval(interval);
                // if the timer reaches zero or the last question is answered, the quiz container disappears and final container appears.
                quizContainerEl.setAttribute("class", "container empty");
                finalContainerEl.setAttribute("class", "container");
                return;
            }
            // timer decrements by 1 seconds (1000 milliseconds)
            timeRemaining = timeRemaining - 1;
            timeRemainingEl.setAttribute("value", timeRemaining);
        }, 1000);

        var clickTimeout = false;

        function createQuiz(questionNum) {
            // Once the quiz session begins, the header has the question and the answer buttons have a correct answer for the question.
            quizContainerEl.innerHTML = "";
            rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row");
            quizContainerEl.append(rowEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-0 col-sm-2");
            rowEl.append(colEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-12 col-sm-8");
            rowEl.append(colEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-0 col-sm-2");
            rowEl.append(colEl);

            colEl = rowEl.children[1];
            rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row mb-3");
            colEl.append(rowEl);

            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-12");
            rowEl.append(colEl);

            headerEl = document.createElement("h2");
            headerEl.innerHTML = questions[questionNum - 1].title;
            colEl.append(headerEl);

            colEl = quizContainerEl.children[0].children[1];
            for (let i = 0; i < 4; i++) {
                let rowEl = document.createElement("div");
                rowEl.setAttribute("class", "row mb-1");
                colEl.append(rowEl);

                let colEl2 = document.createElement("div");
                colEl2.setAttribute("class", "col-12");
                rowEl.append(colEl2);

                buttonEl = document.createElement("button");
                buttonEl.setAttribute("class", "btn btn-primary");
                buttonEl.setAttribute("type", "button");
                buttonEl.innerHTML = questions[currentQuestion - 1].choices[i];
                colEl2.append(buttonEl);

                buttonEl.addEventListener("click", function () {
                    // If user clicks a button and it is a correct answer - message will display "Correct" other wise will display "Incorrect"
                    if (clickTimeout) {
                        return;
                    }
                    clickTimeout = true;
                    clearInterval(interval);
                    var colEl = quizContainerEl.children[0].children[1];
                    var rowEl = document.createElement("div");
                    rowEl.setAttribute("class", "row border-top");
                    colEl.append(rowEl);

                    colEl = document.createElement("div");
                    colEl.setAttribute("class", "col-12");
                    rowEl.append(colEl);

                    var parEl = document.createElement("p");
                    colEl.append(parEl);
                    if (this.innerHTML === questions[currentQuestion - 1].answer) {
                        parEl.innerHTML = "Correct!";
                    } else {
                        parEl.innerHTML = "Incorrect";
                        timeRemaining = timeRemaining - 15;
                        if (timeRemaining < 0) {
                            timeRemaining = 0;
                        }
                        timeRemainingEl.setAttribute("value", timeRemaining);
                    }
                    currentQuestion++;
                    if (currentQuestion > questions.length) {
                        score = timeRemaining;
                    }
                    setTimeout(function() {
                        if(currentQuestion > questions.length) {
                            quizContainerEl.setAttribute("class","container empty");
                            finalContainerEl.setAttribute("class","container");
                            finalScoreEl.setAttribute("value",score);

                        }else{
                            createQuiz(currenQuestion);
                            clickTimeout = false;
                            interval = setInterval(function() {
                                if (timeRemaining < 1) {
                                    clearInterval(interval);
                                    quizContainerEl.setAttribute("class","container empty");
                                    finalContainerEl.setAttribute("class","container");
                                    return;
                                }
                                timeRemaining = timeRemaining - 1;
                                timeRemainingEl.setAttribute("value",timeRemaining);
                            },1000);
                        }
                    },2000);
                });
            }


        }
        

    }