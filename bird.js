const arrows = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

const BIRD_SIZE = 35;
const BIRD_JUMP = 30;
const birdXcenter = (window.innerWidth - BIRD_SIZE) / 2;
const birdYcenter = (window.innerHeight - BIRD_SIZE) / 2;
let timeSinceLastJump = 0;

const bird = document.querySelector("[data-bird]");

export function setupBird() {
    bird.style.setProperty("--bird-size", BIRD_SIZE);
    setBirdPosition(birdXcenter, birdYcenter);
    // add event listners
    document.removeEventListener("keyup", moveBird);
    document.addEventListener("keyup", moveBird);
}

export function pauseBird() {
    document.removeEventListener("keyup", moveBird);
}
export function resumeBird() {
    document.addEventListener("keyup", moveBird);
}

function setBirdPosition(x, y) {
    bird.style.setProperty("--bird-left", x);
    bird.style.setProperty("--bird-top", y);
}

export function getBirdPosition() {
    // return bird.getBoundingClientRect();
    let x = parseFloat(getComputedStyle(bird).getPropertyValue("--bird-left"));
    let y = parseFloat(getComputedStyle(bird).getPropertyValue("--bird-top"));
    return [x, y];
}

function generateRandomNumberFromTwo(min, max) {
    return Math.floor(( Math.random() * (max-min) ) + min);
}

export function isBirdInNest() {
    let [x,y] = getBirdPosition();
    console.log("Pos x: ", x, "Pos y: ", y);
}

export function randomBirdMove( delta, pause ) {
    if (pause) return null

    let [x,y] = getBirdPosition();
    let randomDirection = generateRandomNumberFromTwo(0,3)
    if (timeSinceLastJump > 500) {
        switch (randomDirection) {
            case 0:
                setBirdPosition(x, y-BIRD_JUMP);
                break;
            case 1:
                setBirdPosition(x, y+BIRD_JUMP);
                break;
            case 2:
                setBirdPosition(x-BIRD_JUMP, y);
                break;
            case 3:
                setBirdPosition(x+BIRD_JUMP, y);
                break;
            default: return null;
        }
        timeSinceLastJump = 0;
    }
    timeSinceLastJump += delta;
}

export function moveBird(event) {
    // get bird position
    let [x,y] = getBirdPosition();
    // control the bird by arrow keys
    if (arrows.includes(event.code)) {
        // console.log("Clicked: ", event.code);
        switch (event.code) {
            case "ArrowUp":
                setBirdPosition(x, y-BIRD_JUMP);
                break;
            case "ArrowDown":
                setBirdPosition(x, y+BIRD_JUMP);
                break;
            case "ArrowLeft":
                setBirdPosition(x-BIRD_JUMP, y);
                break;
            case "ArrowRight":
                setBirdPosition(x+BIRD_JUMP, y);
                break;
            default: return null;
        }
    }
}