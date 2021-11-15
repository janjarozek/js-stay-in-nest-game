
const nestElem = document.querySelector("[data-nest");

export const nest = {
    NEST_HEIGHT: 80,
    NEST_WIDTH: 80
}

export function setupNest() {
    nestElem.style.setProperty("--nest-height", nest.NEST_HEIGHT);
    nestElem.style.setProperty("--nest-width", nest.NEST_WIDTH);
}