// Define Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        answer: "Mars"
    },
    {
        question: "AM I your friend?",
        options: ["Yes", "No"],
        answer: "Yes"
    },
    {
        question: "Is Jacob the best and nicest teacher & Boo?",
        options: ["Yes", "OF COURSE YES", "No"],
        answer: "OF COURSE YES"
    }
];

// Implement JavaScript Logic
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
let restartButton; // Define restartButton variable

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('bg-gray-200', 'text-gray-800', 'font-semibold', 'py-2', 'px-4', 'rounded');
        optionButton.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        feedbackElement.textContent = "Correct!";
        score++;
    } else {
        feedbackElement.textContent = "Incorrect!";
    }
    nextButton.classList.remove('hidden');
    optionsElement.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        feedbackElement.textContent = '';
        nextButton.classList.add('hidden');
        optionsElement.querySelectorAll('button').forEach(button => {
            button.disabled = false;
        });
    } else {
        showScore();
    }
}

function showScore() {
    quizContainer.innerHTML = `
        <h2 class="text-xl font-semibold mb-4">Your Score: ${score}/${quizData.length}</h2>
        <button id="restart-btn" class="mt-4 bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600">Restart</button>
    `;
    restartButton = document.getElementById('restart-btn'); // Reassign restartButton variable
    restartButton.addEventListener('click', restartQuiz); // Add event listener for restart button
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    feedbackElement.textContent = ''; // Clear any previous feedback
    nextButton.classList.add('hidden'); // Hide the next button
    restartButton.classList.add('hidden'); // Hide the restart button
}

// Event Listeners
nextButton.addEventListener('click', showNextQuestion);

// Initial setup
showQuestion();
