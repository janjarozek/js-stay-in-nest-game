import { setupBird, randomBirdMove, resumeBird, pauseBird, isBirdInNest } from "./bird.js";
import { setupNest } from "./nest.js";

// document.addEventListener("keyup", logKey);
// function logKey(e) {
//     // console.log(e.code)
//     // console.log(generateRandomNumberFromTwo(2,7));
// }
document.addEventListener("keyup", startGame);
// document.addEventListener("keyup", startGame, { once: true });

const score = document.querySelector("[data-score]");
const nestElem = document.querySelector("[data-nest");

var gameTime = 0;
let gameIntervalTimer;
let gameRunning = false;
let gamePaused = false;

let lastTime = null
function updateLoop(currentLoopTime) {
    //  handle jump into loop
    if ( lastTime === null ) {
        lastTime = currentLoopTime;
        gameRunning = true;
        window.requestAnimationFrame(updateLoop);
        return
    }
    // calc the delta time and handle changes accordingly
    const delta = currentLoopTime - lastTime;
    // handle game logic based on the time flow ...
    // console.log("Pause: ",gamePaused, " Running: ",gameRunning);
    if(!gamePaused) {
        score.innerHTML = `Your time: ${gameTime}`;
        randomBirdMove(delta, gamePaused);
        if(!isBirdInNest()) return handleEndGame();
    } else {
        score.innerHTML = `Game paused! Click space to resume.`;
    }
    // set lastTime for next iteration
    lastTime = currentLoopTime;
    window.requestAnimationFrame(updateLoop)
}

function startGame(event) {
    if (event.code === 'Space' && gameRunning === true && gamePaused === true) {
        gamePaused = false;
        resumeBird();
        gameTimeCounter();
    }
    if (event.code === 'Space' && gameRunning === false && gamePaused === false) {
        setupBird();
        setupNest();
        gameTimeCounter();
    }
    if (event.key === 'Escape' && gameRunning === true) {
        pauseBird();
        gamePause();
    }
    window.requestAnimationFrame(updateLoop);
}

function unpauseGame(event) {
    if (event.key === 'Space') {
        gamePaused = false;
    }
}

function gamePause() {
    gamePaused = true;
    lastTime = null;
    clearInterval(gameIntervalTimer);
    document.addEventListener("keyup", unpauseGame, { once: true });
}

function handleEndGame() {
    nestElem.style.setProperty("display", "none");
    score.innerHTML = `Your final score: ${gameTime}`;
    gameRunning = false;
    lastTime = null;
    clearInterval(gameIntervalTimer);
    document.removeEventListener("keyup", unpauseGame, { once: true });
    document.removeEventListener("keyup", startGame);

    // const containerDiv = document.querySelector("[data-container]");
    // const btn = document.createElement("button");
    // btn.type = "button";
    // btn.name = "restartBtn";
    // btn.onclick = function () {
    //     startGame()
    //   };
    // btn.innerHTML = "RESTART";
    // containerDiv.appendChild(btn);
}

function gameReset() {
    gameTime = 0;
    gamePause();
    document.addEventListener("keyup", unpauseGame, { once: true });
}

function gameTimeCounter() {
    gameIntervalTimer = setInterval(() => {
        gameTime++;
    }, 1000);
}