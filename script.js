import { setupBird } from "./bird.js";

// document.addEventListener("keyup", logKey);
// function logKey(e) {
//     console.log(e.code)
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
        window.requestAnimationFrame(updateLoop);
        // document.addEventListener("keyup", pauseGame, { once: true });
        return
    }
    // cal the delta time and handle changes accordingly
    const delta = currentLoopTime - lastTime;
    // handle game logic based on the time flow ...
    if(gameStarted) {
        score.innerHTML = `Your time: ${gameTime}`;
    } else {
        score.innerHTML = `Game paused!`;
    }
    // set lastTime for next iteration
    lastTime = currentLoopTime;
    window.requestAnimationFrame(updateLoop)
}

function startGame(event) {
    // if (event.code !== 'Space') return
    if (event.code === 'Space' && gameStarted === false) {
        gameStarted = true;
        // reset when lost
        // gameTime = 0;
        score.innerHTML = `Your time: ${gameTime}`;
        setupBird();
        gameTimeCounter();
    }
    if (event.key === 'Escape' && gameStarted === true) {
        gameStarted = false;
        gamePause();
    }
    window.requestAnimationFrame(updateLoop);
}

function gamePause() {
    gameStarted = false;
    lastTime = null;
    clearInterval(gameIntervalTimer);
}

function gameReset() {
    gameTime = 0;
    gamePause();
    document.addEventListener("keyup", startGame, { once: true });
}

function gameTimeCounter() {
    gameIntervalTimer = setInterval(() => {
        gameTime++;
    }, 1000);
}