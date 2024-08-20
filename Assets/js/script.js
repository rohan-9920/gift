const textContainer = document.getElementById('text');
const paragraphContainer = document.querySelector('#give')
const texts = ['HELLO', 'UMAMAH','MY LOVE','YOU ARE','THE','NICE','PERSON' , 'IN THE','WORLD','FOR ME' , 'IDC ABOUT','ANYONE','I LOVE','YOU','SO MUCH','ALWAYS','SMILE','AND HAPPY']; // Array of texts to cycle through
const size = texts.length;
let currentIndex = 0;
let cycleCompleted = false; // Flag to indicate if the cycle has completed
let intervalId; // Variable to store interval ID

function updateText() {
    const text = texts[currentIndex];

    // Clear existing spans
    textContainer.innerHTML = '';

    // Create and append new spans based on the length of the text
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        textContainer.appendChild(span);
    }

    // Update index for next text
    currentIndex = (currentIndex + 1) % texts.length;

    // If we're at the last text, start the fade-out process
    if (currentIndex === 0 && !cycleCompleted) {
        cycleCompleted = true; // Set flag to indicate cycle completion
        setTimeout(() => {
            const lastSpans = textContainer.querySelectorAll('span');
            lastSpans.forEach(span => {
                span.style.animationName = 'disappear';
                span.style.animationDuration = '2s';
                span.style.animationTimingFunction = 'ease-out';
                span.style.animationFillMode = 'forwards';
            });

            // Stop the interval once the last element has disappeared
            setTimeout(() => {
                clearInterval(intervalId);
                paragraphContainer.style.display = "block";
                paragraphContainer.classList.add('paragraph')
            }, 2000); // Wait for the fade-out animation to complete
        }, 5000); // Delay to allow final animation to complete
    }
}

function restartAnimations() {
    const spans = textContainer.querySelectorAll('span');
    spans.forEach(span => {
        span.style.animation = 'none';
        span.offsetHeight; // Trigger a reflow
        span.style.animation = ''; // Reset the animation
    });
}

function updateAndAnimate() {
    updateText();
    restartAnimations();

    // Restart animations after a short delay to ensure the reset
    setTimeout(() => {
        const spans = textContainer.querySelectorAll('span');
        spans.forEach(span => span.style.animationPlayState = 'running');
    }, 50);
}

intervalId = setInterval(updateAndAnimate, 5000); // Update text and restart animation every 5 seconds

// Initial trigger to start animations
updateAndAnimate();