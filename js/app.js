const options = document.querySelectorAll(".option");
const optionsArray = Array.from(options);

const title = document.querySelector("h1");

const restartButton = document.querySelector(".restart-button");

const playerTurn = document.querySelector(".player-turn");

let gameState = true;

let playerTurnCounter = 0;

let firstTurn;

let firstTurnControl = 0;

options.forEach((element) => {
  element.addEventListener("click", () => {
    if (gameState) {
      if (element.textContent !== "") {
        return;
      }

      if (playerTurnCounter === 0) {
        element.textContent = "X";
        element.classList.add("player-x");
        playerTurn.innerHTML =
          'Turno del jugador <span class="player-o">O</span>';
        playerTurnCounter = 1;
      } else if (playerTurnCounter === 1) {
        element.textContent = "O";
        element.classList.add("player-o");
        playerTurn.innerHTML =
          'Turno del jugador <span class="player-x">X</span>';
        playerTurnCounter = 0;
      }

      if (firstTurnControl === 0) {
        firstTurn = element.textContent;
        firstTurnControl++;
      }

      calculateResult();
    } else {
      return;
    }
  });
});

const calculateResult = () => {
  const board = optionsArray.map((option) => option.textContent);

  for (let i = 0; i < 9; i += 3) {
    if (board[i] && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      markMove([i, i + 1, i + 2]);
      return announceWinner(board[(i, i + 1, i + 2)]);
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      board[i] &&
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6]
    ) {
      markMove([i, i + 3, i + 6]);
      return announceWinner(board[(i, i + 3, i + 6)]);
    }
  }

  if (board[0] && board[0] === board[4] && board[4] === board[8]) {
    markMove([0, 4, 8]);
    return announceWinner(board[(0, 4, 8)]);
  }

  if (board[2] && board[2] === board[4] && board[4] === board[6]) {
    markMove([2, 4, 6]);
    return announceWinner(board[(2, 4, 6)]);
  } else if (board.includes("") === false) {
    announceWinner(null);
  }
};

const markMove = (move) => {
  move.forEach((position) => {
    options[position].classList.add("winning-position");
  });
  gameState = false;
};

const announceWinner = (winner) => {
  if (winner === "X") {
    title.innerHTML = '¡Ganó el jugador <span class="player-x">X</span>! 😜🤟';
  } else if (winner === "O") {
    title.innerHTML = '¡Ganó el jugador <span class="player-o">O</span>! 😎🤙';
  } else if (winner === null) {
    title.textContent = "¡Es un empate! 🤝";
  }
  playerTurn.style.display = "none";
  restartButton.style.display = "flex";

  restartButton.addEventListener("click", () => {
    restartGame();
  });

  disableOptions();
};

const disableOptions = () => {
  options.forEach((element) => {
    element.style.cursor = "default";
  });
};

const restartGame = () => {
  title.textContent = "¡Ta Te Ti!";

  restartButton.style.display = "none";
  playerTurn.style.display = "block";

  options.forEach((element) => {
    element.textContent = "";
    element.classList.remove("player-x");
    element.classList.remove("player-o");
    element.classList.remove("winning-position");
    element.style.cursor = "pointer";
  });

  if (firstTurn === "X") {
    playerTurnCounter = 1;
    playerTurn.innerHTML = 'Turno del jugador <span class="player-o">O</span>';
  } else if (firstTurn === "O") {
    playerTurnCounter = 0;
    playerTurn.innerHTML = 'Turno del jugador <span class="player-x">X</span>';
  }

  firstTurnControl = 0;

  gameState = true;
};
