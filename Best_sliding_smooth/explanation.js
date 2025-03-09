// Get the container element that holds the images
const imageContainer = document.getElementById("image-track");

// When the mouse is pressed down (or touch starts), save the initial position
function onMouseDown(event) {
  imageContainer.dataset.mouseStartPosition = event.clientX;
}

// When the mouse is released (or touch ends), reset the starting position and save the current percentage
function onMouseUp() {
  imageContainer.dataset.mouseStartPosition = "0"; // Reset the mouse start position
  imageContainer.dataset.previousPercentage = imageContainer.dataset.currentPercentage; // Save the current percentage
}

// When the mouse is moved (or touch moves), update the image sliding based on mouse movement
function onMouseMove(event) {
  // If the mouse is not pressed down, exit the function
  if (imageContainer.dataset.mouseStartPosition === "0") return;
  
  // Calculate the difference between the starting mouse position and the current mouse position
  const mouseMovement = parseFloat(imageContainer.dataset.mouseStartPosition) - event.clientX;
  
  // Define the maximum movement (half the width of the screen)
  const maxMovement = window.innerWidth / 2;
  
  // Calculate the percentage of movement (how much the image should move)
  const percentageMovement = (mouseMovement / maxMovement) * -100;
  
  // Calculate the next percentage of movement, keeping it between 0% and -100%
  const unconstrainedPercentage = parseFloat(imageContainer.dataset.previousPercentage) + percentageMovement;
  const constrainedPercentage = Math.max(Math.min(unconstrainedPercentage, 0), -100);

  // Set the new percentage as a data attribute
  imageContainer.dataset.currentPercentage = constrainedPercentage;

  // Animate the image container's movement (horizontally) based on the percentage
  imageContainer.animate({
    transform: `translate(${constrainedPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  // Animate each image's position to simulate sliding
  for (const image of imageContainer.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + constrainedPercentage}% center` // Adjust the position of each image within the container
    }, { duration: 1200, fill: "forwards" });
  }
}

// ------------------------- Touch Events for Mobile -------------------------

// Handle mouse down event
window.onmousedown = function(event) {
  onMouseDown(event);
};

// Handle touch start event (for mobile)
window.ontouchstart = function(event) {
  onMouseDown(event.touches[0]);
};

// Handle mouse up event
window.onmouseup = function() {
  onMouseUp();
};

// Handle touch end event (for mobile)
window.ontouchend = function(event) {
  onMouseUp(event.touches[0]);
};

// Handle mouse move event
window.onmousemove = function(event) {
  onMouseMove(event);
};

// Handle touch move event (for mobile)
window.ontouchmove = function(event) {
  onMouseMove(event.touches[0]);
};
