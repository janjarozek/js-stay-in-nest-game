const BIRD_SIZE = 35;
const birdXcenter = (window.innerWidth - BIRD_SIZE) / 2;
const birdYcenter = (window.innerHeight - BIRD_SIZE) / 2;

const bird = document.querySelector("[data-bird]");

export function setupBird() {
    bird.style.setProperty("--bird-size", BIRD_SIZE);
    setBirdPosition(birdXcenter, birdYcenter);
}

function setBirdPosition(x, y) {
    bird.style.setProperty("--bird-left", x);
    bird.style.setProperty("--bird-top", y);
}