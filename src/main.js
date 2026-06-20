import { Visualizer } from './visualizer.js';

// DOM Elements
const btnRandomize = document.getElementById('btn-randomize');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const btnMute = document.getElementById('btn-mute');

const inputSize = document.getElementById('input-size');
const inputSpeed = document.getElementById('input-speed');

const checkCompare = document.getElementById('check-compare');
const checkSync = document.getElementById('check-sync');
const syncGroup = document.getElementById('sync-group');
const wrapper = document.getElementById('visualizers-wrapper');

const selectAlgoA = document.getElementById('select-algo-a');
const selectAlgoB = document.getElementById('select-algo-b');

const containerA = document.getElementById('container-bars-a');
const containerB = document.getElementById('container-bars-b');
const panelA = document.getElementById('visualizer-a');
const panelB = document.getElementById('visualizer-b');

// Initialize Visualizers
const visualizerA = new Visualizer(containerA, panelA);
const visualizerB = new Visualizer(containerB, panelB);

// App State
let isPlaying = false;
let speed = parseInt(inputSpeed.value) || 30; // delay in ms
let arraySize = parseInt(inputSize.value) || 50;
let isSync = checkSync.checked;
let compareMode = checkCompare.checked;
let isMuted = false;

let originalArrayA = [];
let originalArrayB = [];
let lastFrameTime = 0;

// Setup initial state
randomizeArrays();
updateButtonStates();

// Event Listeners
btnRandomize.addEventListener('click', () => {
  randomizeArrays();
});

inputSize.addEventListener('change', () => {
  validateSizeInput();
  randomizeArrays();
});

inputSpeed.addEventListener('input', () => {
  validateSpeedInput();
});

checkCompare.addEventListener('change', (e) => {
  compareMode = e.target.checked;
  toggleCompareModeUI();
  randomizeArrays();
});

checkSync.addEventListener('change', (e) => {
  isSync = e.target.checked;
  randomizeArrays();
});

selectAlgoA.addEventListener('change', (e) => {
  visualizerA.setAlgorithm(e.target.value);
});

selectAlgoB.addEventListener('change', (e) => {
  visualizerB.setAlgorithm(e.target.value);
});

btnStart.addEventListener('click', () => {
  if (isPlaying) {
    pauseSorting();
  } else {
    startSorting();
  }
});

btnReset.addEventListener('click', () => {
  resetSorting();
});

btnMute.addEventListener('click', () => {
  toggleMute();
});

// Helper and Validation Functions
function validateSizeInput() {
  let val = parseInt(inputSize.value);
  if (isNaN(val) || val < 5) val = 5;
  if (val > 300) val = 300;
  inputSize.value = val;
  arraySize = val;
}

function validateSpeedInput() {
  let val = parseInt(inputSpeed.value);
  if (isNaN(val) || val < 0) val = 0;
  if (val > 2000) val = 2000;
  inputSpeed.value = val;
  speed = val;
}

function toggleCompareModeUI() {
  if (compareMode) {
    wrapper.classList.remove('single-mode');
    syncGroup.style.display = 'flex';
  } else {
    wrapper.classList.add('single-mode');
    syncGroup.style.display = 'none';
  }
}

function randomizeArrays() {
  pauseSorting();
  
  if (compareMode) {
    if (isSync) {
      originalArrayA = generateShuffledArray(arraySize);
      originalArrayB = [...originalArrayA];
    } else {
      originalArrayA = generateShuffledArray(arraySize);
      originalArrayB = generateShuffledArray(arraySize);
    }
  } else {
    originalArrayA = generateShuffledArray(arraySize);
  }
  
  visualizerA.setArray(originalArrayA);
  visualizerA.setAlgorithm(selectAlgoA.value);
  
  if (compareMode) {
    visualizerB.setArray(originalArrayB);
    visualizerB.setAlgorithm(selectAlgoB.value);
  }
  
  btnStart.disabled = false;
  updateButtonStates();
}

function generateShuffledArray(size) {
  // Generate linear scale of values for uniform look
  const arr = Array.from({ length: size }, (_, i) => Math.floor(10 + ((i + 1) / size) * 490));
  
  // Fisher-Yates Shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startSorting() {
  isPlaying = true;
  btnStart.innerHTML = '<span>⏸</span> Pause';
  btnStart.className = 'btn btn-reset-style'; // styled as pause border button
  
  visualizerA.initAudio();
  if (compareMode) {
    visualizerB.initAudio();
  }
  
  disableInteractiveControls(true);
  
  lastFrameTime = performance.now();
  requestAnimationFrame(animationLoop);
}

function pauseSorting() {
  isPlaying = false;
  btnStart.innerHTML = '<span>▶</span> Resume';
  btnStart.className = 'btn btn-primary';
}

function resetSorting() {
  pauseSorting();
  
  // Re-enable and restore arrays
  visualizerA.setArray(originalArrayA);
  visualizerA.setAlgorithm(selectAlgoA.value);
  
  if (compareMode) {
    visualizerB.setArray(originalArrayB);
    visualizerB.setAlgorithm(selectAlgoB.value);
  }
  
  btnStart.innerHTML = '<span>▶</span> Start';
  disableInteractiveControls(false);
  updateButtonStates();
}

function toggleMute() {
  isMuted = !isMuted;
  visualizerA.isMuted = isMuted;
  visualizerB.isMuted = isMuted;
  
  if (isMuted) {
    btnMute.innerHTML = '<span class="mute-icon">🔇</span> Audio: OFF';
    btnMute.classList.add('btn-danger');
  } else {
    btnMute.innerHTML = '<span class="mute-icon">🔊</span> Audio: ON';
    btnMute.classList.remove('btn-danger');
    visualizerA.initAudio();
    if (compareMode) {
      visualizerB.initAudio();
    }
  }
}

function disableInteractiveControls(disable) {
  inputSize.disabled = disable;
  checkCompare.disabled = disable;
  checkSync.disabled = disable;
  selectAlgoA.disabled = disable;
  selectAlgoB.disabled = disable;
  btnRandomize.disabled = disable;
}

function updateButtonStates() {
  const isAFinished = visualizerA.isFinished;
  const isBFinished = compareMode ? visualizerB.isFinished : true;
  btnStart.disabled = isAFinished && isBFinished;
}

// Global Animation Loop
function animationLoop(timestamp) {
  if (!isPlaying) return;
  
  if (speed >= 16) {
    const elapsed = timestamp - lastFrameTime;
    if (elapsed >= speed) {
      lastFrameTime = timestamp;
      
      const runningA = visualizerA.step();
      const runningB = compareMode ? visualizerB.step() : false;
      
      if (!runningA && !runningB) {
        pauseSorting();
        btnStart.disabled = true;
        disableInteractiveControls(false);
        return;
      }
    }
  } else {
    // Fast batching logic for delays less than 16ms
    let batchSize = 1;
    if (speed === 0) batchSize = 80;
    else if (speed <= 1) batchSize = 40;
    else if (speed <= 3) batchSize = 20;
    else if (speed <= 5) batchSize = 10;
    else if (speed <= 10) batchSize = 4;
    else if (speed < 16) batchSize = 2;
    
    let anyRunning = false;
    for (let b = 0; b < batchSize; b++) {
      const runningA = visualizerA.step();
      const runningB = compareMode ? visualizerB.step() : false;
      
      if (runningA || runningB) {
        anyRunning = true;
      } else {
        anyRunning = false;
        break;
      }
    }
    
    if (!anyRunning) {
      pauseSorting();
      btnStart.disabled = true;
      disableInteractiveControls(false);
      return;
    }
  }
  
  requestAnimationFrame(animationLoop);
}
