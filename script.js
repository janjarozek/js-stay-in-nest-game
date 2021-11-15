import { setupBird } from "./bird.js";

document.addEventListener("keypress", setupGame, { once: true });

const nest = document.querySelector("[data-nest]");
const score = document.querySelector("[data-score]");

let lastTime = null
function updateLoop(currentLoopTime) {
    //  handle jump into loop
    if ( lastTime === null ) {
        lastTime = currentLoopTime;
        window.requestAnimationFrame(updateLoop);
        return
    }
    const delta = currentLoopTime - lastTime;
    console.log(delta)

    lastTime = currentLoopTime;
    window.requestAnimationFrame(updateLoop)
}

function setupGame() {
    score.innerHTML = "Your time: ";
    setupBird();
    window.requestAnimationFrame(updateLoop);
}