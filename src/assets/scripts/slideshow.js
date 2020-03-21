let slideIndex = 0;
const ANIMATION_TIME = 1500;
const CYCLE_TIME = 5000;
const ELEMENTS = document.getElementsByClassName('slide');

const carousel = () => {
    const currentElement = ELEMENTS[slideIndex];
    const nextElement = ELEMENTS[slideIndex + 1 >= ELEMENTS.length ? 0 : slideIndex + 1];

    setTimeout(() => {
        addFade(nextElement);
    }, CYCLE_TIME - ANIMATION_TIME);
    setTimeout(() => {
        removeFade(currentElement);
    }, CYCLE_TIME);

    slideIndex++;
    if (slideIndex >= ELEMENTS.length) {
        slideIndex = 0;
    }
    setTimeout(carousel, CYCLE_TIME);
};

const addFade = element => {
    element.classList.add('fade');
};

const removeFade = element => {
    element.classList.remove('fade');
};

carousel();
