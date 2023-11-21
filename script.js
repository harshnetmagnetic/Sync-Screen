// Get the elements
const count = document.getElementById("TotalProgSync");
const progress = document.getElementById("SyncProgressBar");
// Animate the SVG progress bar
const initialDashArray = 0;
const targetDashArray = 251.2; // Change this to the desired target dash array
let currentDashArray = initialDashArray;
SetSyncProgress = function (value) {
  count.textContent = value + "%";
  currentDashArray =
    initialDashArray + (targetDashArray - initialDashArray) * value;
  progress.setAttribute("stroke-dasharray", `${currentDashArray / 100}, 251.2`);
};

// ANIMATION
// Set the initial progress value
let progressValue = 0;

// Select the SVG element
const svg = document.querySelector("svg");

// Select the specific path element by its class or other attributes
const pathElement1 = svg.querySelector(".sync_spinner-arr-1");
const pathElement2 = svg.querySelector(".sync_spinner-arr-2");
const pathElementCheck = svg.querySelector(".sync_spinner-check");
const pathElementCircle = svg.querySelector(".sync_spinner-circle");
const syncSpinnerImage = document.querySelector(".sync_spinner-img");
const syncSpinnerContainer = document.querySelector(".sync_spinner-container");

const tl = gsap.timeline({ duration: 1, ease: "power2.inOut" });

const rotationAnimation = gsap.fromTo(
  syncSpinnerContainer,
  {
    rotation: 0, // Starting rotation angle (in degrees)
  },
  {
    rotation: 360, // Ending rotation angle (in degrees)
    duration: 2, // Duration of one full rotation (in seconds)
    repeat: -1, // Infinite repeat
    ease: "linear", // Linear easing for a consistent speed'
  }
);

const pathElementCheckLength = pathElementCheck.getTotalLength();
const pathElementCircleLength = pathElementCircle.getTotalLength();
const pathElement1Length = pathElement1.getTotalLength();
const pathElement2Length = pathElement2.getTotalLength();

gsap.set(pathElement1, {
  strokeDasharray: pathElement1Length,
  strokeDashoffset: 0,
  opacity: 1,
});

gsap.set(pathElement2, {
  strokeDasharray: pathElement2Length,
  strokeDashoffset: 0,
  opacity: 1,
});

gsap.set(pathElementCircle, {
  strokeDasharray: pathElementCircleLength,
  strokeDashoffset: pathElementCircleLength,
  opacity: 0,
});

gsap.set(pathElementCheck, {
  strokeDasharray: pathElementCheckLength,
  strokeDashoffset: pathElementCheckLength,
  opacity: 0,
});

const interval = setInterval(() => {
  progressValue += 1;
  SetSyncProgress(progressValue);

  if (progressValue === 100) {
    clearInterval(interval);
    syncSpinnerImage.style.display = "none";

    tl.fromTo(
      pathElement1,
      { strokeDashoffset: 0, opacity: 1 },
      { strokeDashoffset: pathElement1Length, opacity: 0, duration: 0.4 }
    );

    tl.fromTo(
      pathElement2,
      { strokeDashoffset: 0, opacity: 1 },
      { strokeDashoffset: pathElement2Length, opacity: 0, duration: 0.4 },
      "<"
    );

    tl.fromTo(
      pathElementCircle,
      { strokeDashoffset: pathElementCircleLength, opacity: 0 },
      { strokeDashoffset: 0, duration: 0.4, opacity: 1 }
    );
    tl.fromTo(
      pathElementCheck,
      { strokeDashoffset: pathElementCheckLength, opacity: 0 },
      { strokeDashoffset: 0, duration: 0.4, opacity: 1 },
      "-=0.2"
    );

    gsap.to(syncSpinnerContainer, { rotation: 0, duration: 0.5 });
    rotationAnimation.pause();
  }
}, 36);
