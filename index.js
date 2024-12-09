
window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function () {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });

  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1,
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia?",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "Which gas is most abundant in the Earth's atmosphere?",
      o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      a: 2,
    },
    {
      q: "What is the boiling point of water?",
      o: ["90°C", "100°C", "80°C", "110°C"],
      a: 1,
    },
  ];

  // Display quiz
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item" id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item" id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate score and highlight correct answers
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        let liElement = document.querySelector("#" + li);
        let radioElement = document.querySelector("#" + r);

        // Highlight correct answer
        if (quizItem.a === i) {
          liElement.style.backgroundColor = "lightgreen";
        }

        // Check if the user's selected answer is correct
        if (radioElement.checked && quizItem.a === i) {
          score++;
        }
      }
    });

    // Display the score
    document.querySelector("#score").innerHTML = `Your score is: ${score}`;
  };

  // Reset button functionality
  const resetQuiz = () => {
    window.location.reload();
  };

  // Countdown timer
  const startTimer = (duration) => {
    let timer = duration, minutes, seconds;
    const interval = setInterval(function () {
      minutes = Math.floor(timer / 60);
      seconds = timer % 60;

      document.querySelector("#timer").innerHTML = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      if (--timer < 0) {
        clearInterval(interval);
        calculateScore(); // Calculate score when time is up
        document.querySelector("#submit").disabled = true; // Disable the submit button when time is up
      }
    }, 1000);
  };

  // Event listener for the submit button
  const submitButton = document.querySelector("#submit");
  submitButton.addEventListener("click", calculateScore);

  // Event listener for the reset button
  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", resetQuiz);

  // Start the quiz and the countdown timer (e.g., 60 seconds)
  displayQuiz();
  startTimer(60); // Countdown of 60 seconds
});
