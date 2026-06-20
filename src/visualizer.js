import * as algorithms from './algorithms.js';

const ALGO_METADATA = {};
const ALGO_DETAILS = {};

export class Visualizer {
  constructor(panelId, containerId) {
    this.panel = document.getElementById(panelId);
    this.container = document.getElementById(containerId);
    
    // UI elements selection
    this.selectEl = this.panel.querySelector('.algo-select');
    this.statsEl = this.panel.querySelector('.stats-row');
    
    this.comparisonsValEl = this.panel.querySelector('.stat-comparisons');
    this.swapsValEl = this.panel.querySelector('.stat-swaps');
    this.overwritesValEl = this.panel.querySelector('.stat-overwrites');
    this.timeValEl = this.panel.querySelector('.stat-time');
    
    this.descValEl = this.panel.querySelector('.algo-description');
    this.complexityValEl = this.panel.querySelector('.algo-complexity');
    this.codeValEl = this.panel.querySelector('.pseudocode-text code');
    
    // Visualizer state variables
    this.array = [];
    this.barElements = [];
    this.maxVal = 100;
    this.algorithmName = '';
    this.generator = null;
    this.isFinished = false;
    
    this.highlighted = {
      compare: [],
      swap: [],
      overwrite: [],
      pivot: []
    };
    
    this.stats = {
      comparisons: 0,
      swaps: 0,
      overwrites: 0,
      startTime: null,
      elapsedTime: 0
    };
    
    this.audioCtx = null;
    this.isMuted = false;
    this.lastToneTime = 0;
  }
  
  initAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

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
}
