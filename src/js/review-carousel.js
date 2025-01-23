const radioButtons = document.querySelectorAll('.radio-buttons input');
const carousel = document.querySelector('.carousel');

radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        const offset = index * -100; // Calculate the offset for the transform
        carousel.style.transform = `translateX(${offset}%)`;
    });
});