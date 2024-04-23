// Variables to store references to various HTML elements
let resultContainer = document.querySelector(".result-container");
let restartButton = document.getElementById("restart-button");
let startButton = document.getElementById("start-button");
let quizContainer = document.getElementById("quiz-container");
let nextButton = document.getElementById("next-button");
let timeLeft = document.querySelector(".timer-left");
let mainContainer = document.getElementById("main-container");
let countOfQuestion = document.querySelector(".number-of-question");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");

// Variables to keep track of quiz state
let totalTime = 0;
let countDown;
let questionCount;
let scoreCount = 0;
let count = 8;

// Event listener for the Next button to display the next question or result
nextButton.addEventListener("click", () => {
    // Increment the questionCount to move to the next question
    questionCount += 1;

    // Check if all questions have been answered
    if (questionCount == quizArray.length) {
        // Display the result container with the user's score and total time taken
        mainContainer.classList.add("hide");
        resultContainer.classList.remove("hide");
        userScore.innerHTML = "You've completed the Quiz!<br>Your got " + scoreCount + " out of " + questionCount + "<br>Total time taken: " + totalTime + "s";
        totalTime = 0;
    } else {
        // Display the next question and start the timer
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";

        // Call the function to display the next question
        quizDisplay(questionCount);

        // Reset the countdown timer and start it again
        count = 8;
        clearInterval(countDown);
        timerDisplay();
    }
});

// Function to display the countdown timer
const timerDisplay = () => {
    countDown = setInterval(() => {
        count--;
        totalTime++;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countDown);
            // Automatically move to the next question when the timer reaches 0
            nextButton.click();
        }
    }, 1000);
};

// Function to display a specific question
const quizDisplay = (questionCount) => {
    let quizCard = document.querySelectorAll(".container-mid");
    quizCard.forEach((card) => {
        card.classList.add("hide");
    });
    quizCard[questionCount].classList.remove("hide");
};

// Function to create the quiz from the quizArray
function quizCreator() {
    for (let i of quizArray) {
        // Create a container for each question
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        // Create the question element and add it to the container
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        // Create the answer options buttons and add them to the container
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>`;

        // Add the container to the quizContainer
        quizContainer.appendChild(div);
    }
}

// Function to initialize the quiz
function initial() {
    // Reset various variables and display the first question
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = ;
    clearInterval(countDown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// Function to check the user's answer
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        // Show the correct option to the user
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct")
            }
        });
    }
    clearInterval(countDown);
    // Disable all option buttons to prevent further answers
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Event listener for the Start button to begin the quiz
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    mainContainer.classList.remove("hide");
    initial();
});

// Event listener for the Restart button to restart the quiz
restartButton.addEventListener("click", () => {
    // Reload the quiz page to start over
    window.location.href = "gamingquiz.html";
});

// Function to be executed when the page loads
window.onload = () => {
    startScreen.classList.remove("hide");
    mainContainer.classList.add("hide");
};
