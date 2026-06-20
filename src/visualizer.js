import * as algorithms from './algorithms.js';

const ALGO_METADATA = {
  bubbleSort: { stats: ['comparisons', 'swaps', 'time'] },
  selectionSort: { stats: ['comparisons', 'swaps', 'time'] },
  insertionSort: { stats: ['comparisons', 'overwrites', 'time'] },
  quickSort: { stats: ['comparisons', 'swaps', 'time'] },
  quickSort3Way: { stats: ['comparisons', 'swaps', 'time'] },
  quick2Sort: { stats: ['comparisons', 'swaps', 'time'] },
  mergeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  inplaceMergeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  heapSort: { stats: ['comparisons', 'swaps', 'time'] },
  radixSort: { stats: ['comparisons', 'overwrites', 'time'] },
  countingSort: { stats: ['comparisons', 'overwrites', 'time'] },
  bucketSort: { stats: ['comparisons', 'overwrites', 'time'] },
  pigeonholeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  beadingSort: { stats: ['comparisons', 'overwrites', 'time'] },
  gravitySort: { stats: ['comparisons', 'overwrites', 'time'] },
  timSort: { stats: ['comparisons', 'overwrites', 'time'] },
  shellSort: { stats: ['comparisons', 'overwrites', 'time'] },
  shellMetznerSort: { stats: ['comparisons', 'swaps', 'time'] },
  blockSort: { stats: ['comparisons', 'overwrites', 'time'] },
  librarySort: { stats: ['comparisons', 'overwrites', 'time'] },
  smoothsort: { stats: ['comparisons', 'swaps', 'time'] },
  bogoSort: { stats: ['comparisons', 'swaps', 'time'] },
  sleepSort: { stats: ['comparisons', 'overwrites', 'time'] },
  stoogeSort: { stats: ['comparisons', 'swaps', 'time'] },
  pancakeSorting: { stats: ['comparisons', 'swaps', 'time'] },
  gnomeSort: { stats: ['comparisons', 'swaps', 'time'] },
};

const ALGO_DETAILS = {
  bubbleSort: { stats: ['comparisons', 'swaps', 'time'] },,
  selectionSort: { stats: ['comparisons', 'swaps', 'time'] },,
  insertionSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  quickSort: { stats: ['comparisons', 'swaps', 'time'] },,
  quickSort3Way: { stats: ['comparisons', 'swaps', 'time'] },,
  quick2Sort: { stats: ['comparisons', 'swaps', 'time'] },,
  mergeSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  inplaceMergeSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  heapSort: { stats: ['comparisons', 'swaps', 'time'] },,
  radixSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  countingSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  bucketSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  pigeonholeSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  beadingSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  gravitySort: { stats: ['comparisons', 'overwrites', 'time'] },,
  timSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  shellSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  shellMetznerSort: { stats: ['comparisons', 'swaps', 'time'] },,
  blockSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  librarySort: { stats: ['comparisons', 'overwrites', 'time'] },,
  smoothsort: { stats: ['comparisons', 'swaps', 'time'] },,
  bogoSort: { stats: ['comparisons', 'swaps', 'time'] },,
  sleepSort: { stats: ['comparisons', 'overwrites', 'time'] },,
  stoogeSort: { stats: ['comparisons', 'swaps', 'time'] },,
  pancakeSorting: { stats: ['comparisons', 'swaps', 'time'] },,
  gnomeSort: { stats: ['comparisons', 'swaps', 'time'] },,
};

export class Visualizer {
  /**
   * @param {HTMLElement} containerEl - The container element for the visualizer bars
   * @param {HTMLElement} statsEl - The visualizer panel DOM element (for stats tracking)
   */
  constructor(containerEl, statsEl) {
    this.container = containerEl;
    this.statsEl = statsEl;
    
    this.array = [];
    this.barElements = [];
    this.maxVal = 0;
    
    this.algorithmName = '';
    this.generator = null;
    this.isFinished = false;
    
    // Stats tracking
    this.stats = {
      comparisons: 0,
      swaps: 0,
      overwrites: 0,
      startTime: null,
      elapsedTime: 0
    };
    
    // Highlight states tracking
    this.highlighted = {
      compare: [],
      swap: [],
      overwrite: [],
      pivot: []
    };
    
    // Audio Context (initialized lazily)
    this.audioCtx = null;
    this.isMuted = false;
    this.lastToneTime = 0;
    
    // Cache stats DOM nodes
    this.comparisonsValEl = this.statsEl.querySelector('.stat-comparisons');
    this.swapsValEl = this.statsEl.querySelector('.stat-swaps');
    this.overwritesValEl = this.statsEl.querySelector('.stat-overwrites');
    this.timeValEl = this.statsEl.querySelector('.stat-time');
    this.codeValEl = this.statsEl.querySelector('.pseudocode-text code');
    this.descValEl = this.statsEl.querySelector('.algo-description');
    this.complexityValEl = this.statsEl.querySelector('.algo-complexity');
  }

  /**
   * Initialize or resume the AudioContext on user gesture
   */
  initAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Play a synth beep representing a value
   * @param {number} value 
   */
  playTone(value) {
    if (this.isMuted) return;
    
    const nowTime = performance.now();
    if (nowTime - this.lastToneTime < 20) return; // Throttle to max 50 sound triggers per second
    this.lastToneTime = nowTime;
    
    this.initAudio();
    if (!this.audioCtx) return;
    
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      
      const minFreq = 180;
      const maxFreq = 950;
      const freq = minFreq + (value / this.maxVal) * (maxFreq - minFreq);
      osc.frequency.setValueAtTime(freq, now);
      
      gainNode.gain.setValueAtTime(0.03, now); // Soft comfortable volume
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      
      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
  }

  /**
   * Set a new array to visualize
   * @param {number[]} newArray 
   */
  setArray(newArray) {
    this.array = [...newArray];
    this.maxVal = Math.max(...this.array, 1);
    this.resetStats();
    this.clearHighlights();
    this.isFinished = false;
    this.generator = null;
    
    this.container.innerHTML = '';
    this.barElements = [];
    
    const fragment = document.createDocumentFragment();
    this.array.forEach((val) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${(val / this.maxVal) * 100}%`;
      
      // HSL color gradient based on value (Sunset Amber theme: Orange to Gold Yellow)
      const hue = 18 + (val / this.maxVal) * 32;
      bar.style.setProperty('--bar-color', `hsl(${hue}, 95%, 52%)`);
      bar.style.setProperty('--bar-glow', `hsla(${hue}, 95%, 52%, 0.25)`);
      
      fragment.appendChild(bar);
      this.barElements.push(bar);
    });
    
    this.container.appendChild(fragment);
  }

  /**
   * Set the active sorting algorithm and update stats visibility
   * @param {string} algoKey 
   */
  setAlgorithm(algoKey) {
    this.algorithmName = algoKey;
    this.isFinished = false;
    this.generator = null;
    this.resetStats();
    this.clearHighlights();
    this.updateStatsVisibility();
    this.updatePseudocode();
  }

  /**
   * Update the displayed pseudocode based on active algorithm
   */
  updatePseudocode() {
    const details = ALGO_DETAILS[this.algorithmName];
    if (details) {
      if (this.descValEl) this.descValEl.textContent = details.description;
      if (this.complexityValEl) this.complexityValEl.innerHTML = details.complexity;
      if (this.codeValEl) this.codeValEl.textContent = details.code;
    }
  }

  /**
   * Dynamically show/hide statistics depending on the active algorithm
   */
  updateStatsVisibility() {
    const metadata = ALGO_METADATA[this.algorithmName];
    if (!metadata) return;
    
    const statCards = this.statsEl.querySelectorAll('.stat-card');
    statCards.forEach((card) => {
      const statType = card.getAttribute('data-stat');
      if (metadata.stats.includes(statType)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  /**
   * Reset stats tracker and DOM display
   */
  resetStats() {
    this.stats.comparisons = 0;
    this.stats.swaps = 0;
    this.stats.overwrites = 0;
    this.stats.startTime = null;
    this.stats.elapsedTime = 0;
    this.updateStatsUI();
  }

  /**
   * Update text nodes inside the DOM
   */
  updateStatsUI() {
    if (this.comparisonsValEl) this.comparisonsValEl.textContent = this.stats.comparisons;
    if (this.swapsValEl) this.swapsValEl.textContent = this.stats.swaps;
    if (this.overwritesValEl) this.overwritesValEl.textContent = this.stats.overwrites;
    if (this.timeValEl) this.timeValEl.textContent = `${this.stats.elapsedTime.toFixed(2)}s`;
  }

  /**
   * Remove visual highlight classes from styled bars
   */
  clearHighlights() {
    Object.keys(this.highlighted).forEach((key) => {
      this.highlighted[key].forEach((idx) => {
        const el = this.barElements[idx];
        if (el) el.className = 'bar';
      });
      this.highlighted[key] = [];
    });
  }

  /**
   * Execute one generator step
   * @returns {boolean} True if sorting is in progress, false if completed
   */
  step() {
    if (this.isFinished) return false;
    
    if (!this.generator && this.algorithmName) {
      const algoFunc = algorithms[this.algorithmName];
      if (algoFunc) {
        this.generator = algoFunc(this.array);
        this.stats.startTime = performance.now() - (this.stats.elapsedTime * 1000);
      } else {
        console.error(`Algorithm ${this.algorithmName} not found`);
        return false;
      }
    }
    
    if (!this.generator) return false;
    
    // Calculate elapsed time
    if (this.stats.startTime) {
      this.stats.elapsedTime = (performance.now() - this.stats.startTime) / 1000;
    }
    
    this.clearHighlights();
    
    const result = this.generator.next();
    
    if (result.done) {
      this.isFinished = true;
      this.stats.startTime = null;
      this.updateStatsUI();
      this.animateSortedSweep();
      return false;
    }
    
    const { type, indices, values } = result.value;
    
    if (type === 'compare') {
      this.stats.comparisons++;
      indices.forEach((idx) => {
        const el = this.barElements[idx];
        if (el) el.classList.add('comparing');
        this.highlighted.compare.push(idx);
      });
      if (indices.length > 0) {
        this.playTone(this.array[indices[0]]);
      }
      
    } else if (type === 'swap') {
      this.stats.swaps++;
      const [i, j] = indices;
      const [valI, valJ] = values;
      
      this.array[i] = valI;
      this.array[j] = valJ;
      
      const barI = this.barElements[i];
      const barJ = this.barElements[j];
      
      if (barI && barJ) {
        barI.style.height = `${(valI / this.maxVal) * 100}%`;
        barJ.style.height = `${(valJ / this.maxVal) * 100}%`;
        
        const hueI = 18 + (valI / this.maxVal) * 32;
        barI.style.setProperty('--bar-color', `hsl(${hueI}, 95%, 52%)`);
        barI.style.setProperty('--bar-glow', `hsla(${hueI}, 95%, 52%, 0.25)`);
        
        const hueJ = 18 + (valJ / this.maxVal) * 32;
        barJ.style.setProperty('--bar-color', `hsl(${hueJ}, 95%, 52%)`);
        barJ.style.setProperty('--bar-glow', `hsla(${hueJ}, 95%, 52%, 0.25)`);
        
        barI.classList.add('swapping');
        barJ.classList.add('swapping');
        this.highlighted.swap.push(i, j);
      }
      
      this.playTone(valI);
      
    } else if (type === 'overwrite') {
      this.stats.overwrites++;
      const [i] = indices;
      const [val] = values;
      
      this.array[i] = val;
      const bar = this.barElements[i];
      if (bar) {
        bar.style.height = `${(val / this.maxVal) * 100}%`;
        const hue = 18 + (val / this.maxVal) * 32;
        bar.style.setProperty('--bar-color', `hsl(${hue}, 95%, 52%)`);
        bar.style.setProperty('--bar-glow', `hsla(${hue}, 95%, 52%, 0.25)`);
        
        bar.classList.add('overwriting');
        this.highlighted.overwrite.push(i);
      }
      
      this.playTone(val);
      
    } else if (type === 'pivot') {
      indices.forEach((idx) => {
        const el = this.barElements[idx];
        if (el) el.classList.add('pivot');
        this.highlighted.pivot.push(idx);
      });
    }
    
    this.updateStatsUI();
    return true;
  }

  /**
   * Animate a glowing neon cascade sweep when completed
   */
  async animateSortedSweep() {
    this.clearHighlights();
    const delay = Math.max(8, Math.min(45, 800 / this.barElements.length));
    
    for (let i = 0; i < this.barElements.length; i++) {
      const bar = this.barElements[i];
      if (bar) {
        bar.classList.add('sorted');
      }
      if (i % Math.max(1, Math.floor(this.barElements.length / 15)) === 0) {
        this.playTone(this.array[i]);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
