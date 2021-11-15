import { setupBird, randomBirdMove, resumeBird, pauseBird, isBirdInNest } from "./bird.js";

// document.addEventListener("keyup", logKey);
// function logKey(e) {
//     // console.log(e.code)
//     // console.log(generateRandomNumberFromTwo(2,7));
// }
document.addEventListener("keyup", startGame);
// document.addEventListener("keyup", startGame, { once: true });

const nest = document.querySelector("[data-nest]");
const score = document.querySelector("[data-score]");

var gameTime = 0;
let gameIntervalTimer;
let gameStarted = false;
let gamePaused = false;

let lastTime = null
function updateLoop(currentLoopTime) {
    //  handle jump into loop
    if ( lastTime === null ) {
        lastTime = currentLoopTime;
        gameStarted = true;
        window.requestAnimationFrame(updateLoop);
        return
    }
    // calc the delta time and handle changes accordingly
    const delta = currentLoopTime - lastTime;
    // handle game logic based on the time flow ...
    // console.log("Pause: ",gamePaused, " Running: ",gameStarted);
    if(!gamePaused) {
        score.innerHTML = `Your time: ${gameTime}`;
        randomBirdMove(delta, gamePaused);
        isBirdInNest();
    } else {
        score.innerHTML = `Game paused! Click space to resume.`;
    }
    // set lastTime for next iteration
    lastTime = currentLoopTime;
    window.requestAnimationFrame(updateLoop)
}

function startGame(event) {
    if (event.code === 'Space' && gameStarted === true && gamePaused === true) {
        gamePaused = false;
        resumeBird();
        gameTimeCounter();
    }
    if (event.code === 'Space' && gameStarted === false && gamePaused === false) {
        setupBird();
        gameTimeCounter();
    }
    if (event.key === 'Escape' && gameStarted === true) {
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

function gameReset() {
    gameStarted = false;
    gameTime = 0;
    gamePause();
    document.addEventListener("keyup", unpauseGame, { once: true });
}

function gameTimeCounter() {
    gameIntervalTimer = setInterval(() => {
        gameTime++;
    }, 1000);
}