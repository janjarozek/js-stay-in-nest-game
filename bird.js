const arrows = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

const BIRD_SIZE = 35;
const BIRD_JUMP = 30;
const birdXcenter = (window.innerWidth - BIRD_SIZE) / 2;
const birdYcenter = (window.innerHeight - BIRD_SIZE) / 2;

const bird = document.querySelector("[data-bird]");

export function setupBird() {
    bird.style.setProperty("--bird-size", BIRD_SIZE);
    setBirdPosition(birdXcenter, birdYcenter);
    // add event listners
    document.removeEventListener("keyup", moveBird);
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