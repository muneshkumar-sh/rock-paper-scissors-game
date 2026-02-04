let userScore=0;
let compScore=0;
let totalRounds = 0;
const max_rounds = 10;

const choices =document.querySelectorAll(".choice");
const msg =document.querySelector("#msg");
const userScoreUpdate = document.querySelector("#user-score");
const compScoreUpdate = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");
const attemptsLeft = document.querySelector("#attempts-left");


const generateCompChoice = () => {
    let options=["rock", "paper", "scissors"]; 
    // rock, paper, scissors
    const randIndx = Math.floor(Math.random() * 3); //random choose from 0 to 2 array index
    return options[randIndx];
}

const drawGame = () => {
    console.log("Game was Draw.");
    msg.innerText="Game was Draw. Play again.";
    msg.style.backgroundColor = "black";
    msg.style.color = "white";
}

const showWinner = (userWin, userchoice, compChoice) => {
    totalRounds++;

    attemptsLeft.innerText = `Attempts Left: ${max_rounds - totalRounds}`;

    if (userWin) {
        userScore++;
        userScoreUpdate.innerText = userScore;
        msg.innerText = `You Win! Your ${userchoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        msg.style.color = "white";
    } else {
        compScore++;
        compScoreUpdate.innerText = compScore;
        msg.innerText = `You lose. ${compChoice} beats ${userchoice}`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
    }

    checkGameOver();
};


const checkGameOver = () => {
  if (totalRounds === max_rounds) {
    if (userScore > compScore) {
      msg.innerText = "🏆 You won the game!";
    } else if (compScore > userScore) {
      msg.innerText = "💻 Computer won the game!";
    } else {
      msg.innerText = "🤝 Game Draw!";
    }
    disableChoices();
  }
};

const disableChoices = () => {
  choices.forEach(choice => choice.style.pointerEvents = "none");
};

const enableChoices = () => {
  choices.forEach(choice => choice.style.pointerEvents = "auto");
};


const playGame = (userchoice) => {

    if (totalRounds >= max_rounds) {
        return;
    }

    const compChoice = generateCompChoice();

    if(userchoice === compChoice){
        drawGame();
        return;
    }

    let userWin;
    if(userchoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
    } else if(userchoice === "paper") {
        userWin = compChoice === "scissors" ? false : true;
    } else{
        userWin =compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userchoice, compChoice);
};


choices.forEach((choice)=>{
    
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playGame(userchoice);
    });
});

const welcomeScreen = document.querySelector("#welcome-screen");
const rulesScreen = document.querySelector("#rules-screen");
const gameScreen = document.querySelector("#game-screen");

const playBtn = document.querySelector("#play-btn");
const rulesBtn = document.querySelector("#rules-btn");
const closeRulesBtn = document.querySelector("#close-rules");

playBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
});

rulesBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hide");
    rulesScreen.classList.remove("hide");
});

closeRulesBtn.addEventListener("click", () => {
    rulesScreen.classList.add("hide");
    welcomeScreen.classList.remove("hide");
});



resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    totalRounds = 0;

    userScoreUpdate.innerText = 0;
    compScoreUpdate.innerText = 0;
    attemptsLeft.innerText = `Attempts Left: ${max_rounds}`;

    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#f3f5f5";
    msg.style.color = "black";

    enableChoices();
});
