// SVG icon for the blocks
// const boxIcon = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//     <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/>
//     <path d="m7 16.5-4.74-2.85"/>
//     <path d="m7 16.5 5-3"/>
//     <path d="M7 16.5v5.17"/>
//     <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/>
//     <path d="m17 16.5-5-3"/>
//     <path d="m17 16.5 4.74-2.85"/>
//     <path d="M17 16.5v5.17"/>
//     <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/>
//     <path d="M12 8 7.26 5.15"/>
//     <path d="m12 8 4.74-2.85"/>
//     <path d="M12 13.5V8"/>
//     </svg>`;


const words = ['python', 'css', 'javascript','html','django']

// Colors for the blocks
const colors = [
    '#000000', // blue
    '#8B5CF6', // purple
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#6366F1'  // indigo
];

// Function to create a block element
function createBlock(color) {
    const block = document.createElement('div');
    block.className = 'slider-item';
    block.style.backgroundColor = color;
    for (let word of words){
        block.innerHTML = word;
    }
    return block;
}

// Function to initialize a track with blocks
function initializeTrack(trackId, blockCount = 8) {
    const track = document.getElementById(trackId);
    const blocks = [];

    // Create initial blocks
    for (let i = 0; i < blockCount; i++) {
    const block = createBlock(colors[0]);
    blocks.push(block);
    }

    // Duplicate blocks for seamless scrolling
    blocks.forEach(block => {
    track.appendChild(block.cloneNode(true));
    });
    blocks.forEach(block => {
    track.appendChild(block.cloneNode(true));
    });
}

// Initialize all tracks
initializeTrack('track1');


// initializeTrack('track2');
// initializeTrack('track3');