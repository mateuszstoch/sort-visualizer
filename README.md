# SortVisualizer

A high-performance, split-screen sorting algorithm visualizer built with vanilla JavaScript, CSS custom properties, and Web Audio. It visualizes and compares 50 different sorting algorithms side-by-side with real-time statistics, complexity badges, and Python code references.

## Key Technical Features

### 1. Generator-Based Execution Model
Instead of using fragile `setInterval` loops or recursively chained `setTimeout` calls, the visualizer uses JavaScript **Generator functions** (`function*`). 
* Each sorting algorithm is implemented as a generator that yields events (`compare`, `swap`, `overwrite`, `pivot`).
* The visualizer engine advances the generator step-by-step inside a `requestAnimationFrame` loop.
* This architecture allows pause/resume control, dynamic speed adjustment, and dual-visualizer synchronization.

### 2. High-Performance DOM Caching & Mutations
To prevent garbage collection overhead and layout thrashing:
* Bar elements are created once in a `DocumentFragment` when the array size is set, and cached in `this.barElements`.
* During visualization, the rendering engine modifies CSS variables (`--bar-color`, `--bar-glow`) and `height` properties directly on the cached elements rather than recreating DOM nodes.
* This allows smooth rendering at 60 FPS even with 300+ elements.

### 3. GPU-Accelerated Blurs
Large ambient background orbs with `filter: blur(160px)` moving continuously can cause massive repaint costs in browsers.
* The blurred elements are isolated on separate GPU layers using `will-change: transform` and `transform: translate3d(0,0,0)`.
* This shifts the layout recalculations off the CPU main thread, maintaining buttery smooth animations on Retina displays.

### 4. Audio Thread Throttling
Playing retro triangle oscillator tones corresponding to bar heights is a core feature, but at high speeds, executing dozens of concurrent sounds locks the browser's audio thread.
* Audio synth triggers are throttled to a maximum of 1 trigger per 20ms using `performance.now()`.
* Every beep features a volume envelope (`exponentialRampToValueAtTime`) that decays cleanly to zero to prevent audio clipping and clicks.

## Supported Algorithms (50 Total)

* **Divide & Conquer / Efficient**: Quick Sort (Lomuto, Hoare, 3-Way, Dual Pivot), Merge Sort (Standard, In-place), Heap Sort, Smoothsort, Tournament Sort, WikiSort (Block Merge), Block Sort, Tree Sort, Cartesian Tree Sort, Splay Sort.
* **Simple / Quadratic**: Bubble Sort, Selection Sort, Insertion Sort, Shell Sort (Standard, Metzner), Cocktail Shaker Sort, Gnome Sort, Comb Sort, Odd-Even Sort, Cycle Sort, Library Sort, Pancake Sort, Wiggle Sort, Tag Sort.
* **Non-Comparison**: Radix Sort (LSD), Counting Sort, Bucket Sort, Pigeonhole Sort, Flashsort, Spread Sort, Bead / Gravity Sort, Burst Sort, Proxmap Sort, Postman Sort, Spaghetti Sort, Interpolation Sort.
* **Hybrid & Advanced**: TimSort, Merge-Insertion Sort (Ford-Johnson), Samplesort, JSort.
* **Esoteric & Impractical**: Bogo Sort, Sleep Sort, Stooge Sort, Strand Sort, Patience Sort.

## Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mateuszstoch/sort-visualizer.git
   cd sort-visualizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the local development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Building for Production
To bundle the project for production:
```bash
npm run build
```
The compiled files will be located in the `dist/` directory.

## File Structure

```text
├── index.html          # Main HTML structure and algorithm options
├── package.json        # Dependencies and build scripts
├── public/             # Static assets (icons, favicons)
└── src/
    ├── main.js         # Entry point, event handlers, and animation loop coordinator
    ├── style.css       # Obsidian & Sunset Amber glassmorphism layout and animations
    ├── visualizer.js   # Rendering engine, AudioContext synth, and metadata maps
    └── algorithms.js   # Core implementations of the 50 sorting generators
```
