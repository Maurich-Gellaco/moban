let currentIndex = 0; // Track the current index of the active slide

function updateSlides() {
    const slides = document.querySelectorAll('.movie');
    const totalSlides = slides.length;
    const angle = 360 / totalSlides;
    const distance = Math.min(window.innerWidth, window.innerHeight) / 2.5; // Adjust base distance based on viewport size
    const spacing = 150; // Spacing between movies

    slides.forEach((slide, index) => {
        const offset = (index - currentIndex + totalSlides) % totalSlides;

        // Calculate rotation angle and scale for active movie
        const theta = offset * angle;
        const scale = offset === 0 ? 1.5 : 0.8; // Center slide is larger, others smaller
        const zIndex = offset === 0 ? 2 : 1; // Ensure active slide is on top
        const opacity = offset === 0 ? 1 : 0.5; // Make active slide fully opaque

        // Apply transform to position and scale the slides
        slide.style.transform = `rotateY(${theta}deg) translateZ(${distance + spacing}px) scale(${scale})`;
        slide.style.zIndex = zIndex;
        slide.style.opacity = opacity;

        // Ensure only the current slide has the 'active' class
        if (offset === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Event listener for keydown events
document.addEventListener('keydown', (event) => {
    const slides = document.querySelectorAll('.movie');
    const totalSlides = slides.length;
    
    switch (event.keyCode) {
        case 37: // Left arrow key
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlides();
            break;
        case 39: // Right arrow key
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlides();
            break;
    }
});

// Initial update to position slides correctly
updateSlides();

