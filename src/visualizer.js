import * as algorithms from './algorithms.js';

// Metadata mapping all 50 algorithms to their relevant statistics
const ALGO_METADATA = {
  // Divide & Conquer / Efficient
  quickSort: { stats: ['comparisons', 'swaps', 'time'] },
  quickSort3Way: { stats: ['comparisons', 'swaps', 'time'] },
  quick2Sort: { stats: ['comparisons', 'swaps', 'time'] },
  mergeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  inplaceMergeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  heapSort: { stats: ['comparisons', 'swaps', 'time'] },
  smoothsort: { stats: ['comparisons', 'swaps', 'time'] },
  tournamentSort: { stats: ['comparisons', 'overwrites', 'time'] },
  wikiSort: { stats: ['comparisons', 'overwrites', 'time'] },
  blockSort: { stats: ['comparisons', 'overwrites', 'time'] },
  treeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  cartesianTreeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  splaySort: { stats: ['comparisons', 'overwrites', 'time'] },
  
  // Simple / Quadratic
  bubbleSort: { stats: ['comparisons', 'swaps', 'time'] },
  selectionSort: { stats: ['comparisons', 'swaps', 'time'] },
  insertionSort: { stats: ['comparisons', 'overwrites', 'time'] },
  shellSort: { stats: ['comparisons', 'overwrites', 'time'] },
  shellMetznerSort: { stats: ['comparisons', 'swaps', 'time'] },
  cocktailShakerSort: { stats: ['comparisons', 'swaps', 'time'] },
  gnomeSort: { stats: ['comparisons', 'swaps', 'time'] },
  combSort: { stats: ['comparisons', 'swaps', 'time'] },
  oddEvenSort: { stats: ['comparisons', 'swaps', 'time'] },
  cycleSort: { stats: ['comparisons', 'overwrites', 'time'] },
  librarySort: { stats: ['comparisons', 'overwrites', 'time'] },
  pancakeSorting: { stats: ['comparisons', 'swaps', 'time'] },
  wiggleSort: { stats: ['comparisons', 'swaps', 'time'] },
  tagSort: { stats: ['comparisons', 'overwrites', 'time'] },

  // Non-Comparison
  radixSort: { stats: ['comparisons', 'overwrites', 'time'] },
  countingSort: { stats: ['comparisons', 'overwrites', 'time'] },
  bucketSort: { stats: ['comparisons', 'overwrites', 'time'] },
  pigeonholeSort: { stats: ['comparisons', 'overwrites', 'time'] },
  flashsort: { stats: ['comparisons', 'overwrites', 'time'] },
  spreadSort: { stats: ['comparisons', 'overwrites', 'time'] },
  beadingSort: { stats: ['comparisons', 'overwrites', 'time'] },
  burstSort: { stats: ['comparisons', 'overwrites', 'time'] },
  proxmapSort: { stats: ['comparisons', 'overwrites', 'time'] },
  postmanSort: { stats: ['comparisons', 'overwrites', 'time'] },
  spaghettiSort: { stats: ['comparisons', 'overwrites', 'time'] },
  gravitySort: { stats: ['comparisons', 'overwrites', 'time'] },
  interpolationSort: { stats: ['comparisons', 'overwrites', 'time'] },

  // Hybrid & Advanced
  timSort: { stats: ['comparisons', 'overwrites', 'time'] },
  mergeInsertionSort: { stats: ['comparisons', 'overwrites', 'time'] },
  samplesort: { stats: ['comparisons', 'swaps', 'time'] },
  jSort: { stats: ['comparisons', 'overwrites', 'time'] },

  // Esoteric / Impractical
  bogoSort: { stats: ['comparisons', 'swaps', 'time'] },
  sleepSort: { stats: ['comparisons', 'overwrites', 'time'] },
  stoogeSort: { stats: ['comparisons', 'swaps', 'time'] },
  strandSort: { stats: ['comparisons', 'overwrites', 'time'] },
  patienceSorting: { stats: ['comparisons', 'overwrites', 'time'] },
  bitonicSort: { stats: ['comparisons', 'swaps', 'time'] }
};


const ALGO_DETAILS = {
  // ==========================================
  // Divide & Conquer / Efficient
  // ==========================================
  quickSort: {
    description: "Picks a pivot element and partitions the array, recursively sorting sub-arrays on the left and right.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(log N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def quick_sort(arr, left, right):
    if left < right:
        pivot_idx = partition(arr, left, right)
        quick_sort(arr, left, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, right)

def partition(arr, left, right):
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1`
  },
  quickSort3Way: {
    description: "An optimization of quicksort that partitions the array into three sections: smaller, equal, and larger than the pivot.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(log N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def quick_sort_3way(arr, left, right):
    if left >= right: return
    lt, gt = left, right
    pivot = arr[left]
    i = left + 1
    while i <= gt:
        if arr[i] < pivot:
            arr[i], arr[lt] = arr[lt], arr[i]
            i += 1; lt += 1
        elif arr[i] > pivot:
            arr[i], arr[gt] = arr[gt], arr[i]
            gt -= 1
        else:
            i += 1
    quick_sort_3way(arr, left, lt - 1)
    quick_sort_3way(arr, gt + 1, right)`
  },
  quick2Sort: {
    description: "A dual-pivot quicksort implementation that partitions the array into three regions using two separate pivot elements.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(log N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def dual_pivot_quick_sort(arr, low, high):
    if low < high:
        p, q = partition(arr, low, high)
        dual_pivot_quick_sort(arr, low, p - 1)
        dual_pivot_quick_sort(arr, p + 1, q - 1)
        dual_pivot_quick_sort(arr, q + 1, high)`
  },
  mergeSort: {
    description: "Recursively splits the array in halves, sorts them, and merges the sorted sub-arrays back together.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def merge_sort(arr, start, end):
    if start < end:
        mid = (start + end) // 2
        merge_sort(arr, start, mid)
        merge_sort(arr, mid + 1, end)
        merge(arr, start, mid, end)

def merge(arr, start, mid, end):
    temp = []
    i, j = start, mid + 1
    while i <= mid and j <= end:
        if arr[i] <= arr[j]:
            temp.append(arr[i]); i += 1
        else:
            temp.append(arr[j]); j += 1
    # copy remaining elements...`
  },
  inplaceMergeSort: {
    description: "A merge sort implementation that performs all merging operations without allocating auxiliary arrays.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log² N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log² N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def inplace_merge_sort(arr, start, end):
    if start < end:
        mid = (start + end) // 2
        inplace_merge_sort(arr, start, mid)
        inplace_merge_sort(arr, mid + 1, end)
        inplace_merge(arr, start, mid, end)`
  },
  heapSort: {
    description: "Builds a binary max-heap out of the array, repeatedly extracts the maximum element and restores the heap.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)`
  },
  smoothsort: {
    description: "Dijkstra's variant of heapsort using Leonardo heaps, running in O(N) time on nearly sorted inputs.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def smooth_sort(arr):
    # Dijkstra's Heap Sort variant using Leonardo Numbers
    # Complex heap sift up and down operations...
    pass`
  },
  tournamentSort: {
    description: "Sorts elements by simulating a knockout tournament tree where the winner is repeatedly extracted.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def tournament_sort(arr):
    # Knockout tree min-evaluations
    # Extraction phase...
    pass`
  },
  wikiSort: {
    description: "A stable in-place merge sort that groups elements into blocks and merges them with O(1) auxiliary space.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def wiki_sort(arr):
    # Stable block merge sort logic
    # O(1) auxiliary memory merge...
    pass`
  },
  blockSort: {
    description: "Sorts elements by grouping them into equal-sized blocks and using an internal buffer to merge them.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def block_sort(arr):
    # General Block Merge Sort algorithm
    pass`
  },
  treeSort: {
    description: "Builds a Binary Search Tree from the input array and performs an in-order traversal to retrieve sorted elements.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def tree_sort(arr):
    # Insert elements into tree and traverse in-order
    pass`
  },
  cartesianTreeSort: {
    description: "Builds a Cartesian Tree (min-heap/in-order array property) and extracts values using a priority queue.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def cartesian_tree_sort(arr):
    # Build Cartesian tree from array
    # Extract using Priority Queue min-heap
    pass`
  },
  splaySort: {
    description: "A tree sort variant that utilizes a self-balancing Splay Tree to achieve O(N) on pre-sorted data.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def splay_sort(arr):
    # Insert elements into splaying tree
    # Traversal in-order...
    pass`
  },

  // ==========================================
  // Simple / Quadratic
  // ==========================================
  bubbleSort: {
    description: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break`
  },
  selectionSort: {
    description: "Repeatedly finds the minimum element from the unsorted portion and swaps it with the first unsorted element.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`
  },
  insertionSort: {
    description: "Builds a sorted array element by element by inserting each new element into its proper position.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`
  },
  shellSort: {
    description: "An extension of insertion sort that allows the exchange of far apart elements, narrowing the gap on each pass.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N^1.25)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2`
  },
  shellMetznerSort: {
    description: "A Shell Sort variation commonly used in retro programming to optimize index comparisons and swap steps.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N^1.25)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def shell_metzner_sort(arr):
    n = len(arr)
    gap = n
    while gap > 1:
        gap = (gap + 1) // 2
        for i in range(n - gap):
            j = i
            while j >= 0:
                if arr[j] > arr[j + gap]:
                    arr[j], arr[j + gap] = arr[j + gap], arr[j]
                    j -= gap
                else:
                    break`
  },
  cocktailShakerSort: {
    description: "A bidirectional bubble sort that bubbles elements in both directions on alternating passes.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def cocktail_shaker_sort(arr):
    start, end = 0, len(arr) - 1
    swapped = True
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped: break
        swapped = False; end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1`
  },
  gnomeSort: {
    description: "A simple sorting algorithm resembling how a garden gnome sorts flower pots, moving backwards on swaps.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def gnome_sort(arr):
    n = len(arr)
    idx = 0
    while idx < n:
        if idx == 0: idx += 1
        if arr[idx] >= arr[idx - 1]:
            idx += 1
        else:
            arr[idx], arr[idx - 1] = arr[idx - 1], arr[idx]
            idx -= 1`
  },
  combSort: {
    description: "An optimization of bubble sort that uses a shrink factor to eliminate 'turtles' (small values at the end).",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def comb_sort(arr):
    n = len(arr)
    gap = n
    shrink = 1.3
    swapped = True
    while gap > 1 or swapped:
        gap = int(gap / shrink)
        if gap < 1: gap = 1
        swapped = False
        for i in range(n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True`
  },
  oddEvenSort: {
    description: "A parallel bubble sort variant that alternates between comparing odd/even and even/odd indexed adjacent pairs.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def odd_even_sort(arr):
    n = len(arr)
    sorted = False
    while not sorted:
        sorted = True
        for i in range(1, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted = False
        for i in range(0, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted = False`
  },
  cycleSort: {
    description: "A comparison sort that minimizes the number of array writes, based on the idea that the permutation can be decomposed into cycles.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def cycle_sort(arr):
    n = len(arr)
    for start in range(0, n - 1):
        item = arr[start]
        pos = start
        for i in range(start + 1, n):
            if arr[i] < item: pos += 1
        if pos == start: continue
        while item == arr[pos]: pos += 1
        arr[pos], item = item, arr[pos]
        # cycle rest...`
  },
  librarySort: {
    description: "An insertion sort variant that leaves empty spaces ('gaps') in the array to speed up subsequent insertions.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def library_sort(arr):
    # Insertion sort with empty gaps
    # Rebalancing and spacing...
    pass`
  },
  pancakeSorting: {
    description: "Sorts the array using only prefix reversals (flips), modeled after flipping a stack of pancakes.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def flip(arr, k):
    left = 0
    while left < k:
        arr[left], arr[k] = arr[k], arr[left]
        left += 1; k -= 1

def pancake_sort(arr):
    for size in range(len(arr), 1, -1):
        max_idx = arr.index(max(arr[:size]))
        if max_idx != size - 1:
            flip(arr, max_idx)
            flip(arr, size - 1)`
  },
  wiggleSort: {
    description: "Reorders elements into an alternating wave pattern where a[0] < a[1] > a[2] < a[3].",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def wiggle_sort(arr):
    for i in range(len(arr) - 1):
        if (i % 2 == 0 and arr[i] > arr[i+1]) or (i % 2 == 1 and arr[i] < arr[i+1]):
            arr[i], arr[i+1] = arr[i+1], arr[i]`
  },
  tagSort: {
    description: "Indirectly sorts an array by maintaining and sorting a separate array of tag index pointers.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def tag_sort(arr):
    tags = list(range(len(arr)))
    tags.sort(key=lambda x: arr[x])
    return [arr[idx] for idx in tags]`
  },

  // ==========================================
  // Non-Comparison
  // ==========================================
  radixSort: {
    description: "Sorts integers digit by digit, from the least to the most significant digit, using counting sort as a subroutine.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(D&bull;(N+K))</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(D&bull;(N+K))</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(D&bull;(N+K))</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N+K)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements, D = digits of max value, K = base value range (10))</div>
    `,
    code: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort(arr, exp)
        exp *= 10`
  },
  countingSort: {
    description: "Sorts keys within a specific range by counting the occurrences of each unique value.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N+K)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N+K)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N+K)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(K)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements, K = range range of input keys)</div>
    `,
    code: `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for val in arr: count[val] += 1
    idx = 0
    for val, c in enumerate(count):
        for _ in range(c):
            arr[idx] = val; idx += 1`
  },
  bucketSort: {
    description: "Distributes elements into multiple buckets, sorts each bucket individually, and merges them.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N+K)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N+K)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N+K)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements, K = number of buckets)</div>
    `,
    code: `def bucket_sort(arr):
    buckets = [[] for _ in range(len(arr))]
    for val in arr:
        idx = int(val * len(arr))
        buckets[idx].append(val)
    for b in buckets: b.sort()
    # concatenate buckets...`
  },
  pigeonholeSort: {
    description: "A sorting algorithm suitable for keys whose range is similar to the number of elements, putting each element into its pigeonhole.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N+K)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N+K)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N+K)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N+K)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements, K = range range of input keys)</div>
    `,
    code: `def pigeonhole_sort(arr):
    my_min, my_max = min(arr), max(arr)
    size = my_max - my_min + 1
    holes = [[] for _ in range(size)]
    for x in arr: holes[x - my_min].append(x)
    idx = 0
    for hole in holes:
        for x in hole:
            arr[idx] = x; idx += 1`
  },
  flashsort: {
    description: "A highly efficient distribution sort utilizing classification to assign elements directly to their sorted indices.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def flash_sort(arr):
    # Distribute keys into classes
    # Perform in-place permutation cycles
    # Insertion sort final cleanup...
    pass`
  },
  spreadSort: {
    description: "A hybrid distribution algorithm that combines bucket, radix, and comparison sort concepts.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def spread_sort(arr):
    # Hybrid distribution search sort
    pass`
  },
  beadingSort: {
    description: "Also known as Bead Sort or Gravity Sort; simulates beads sliding down vertical poles under gravity.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(1)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N²)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def bead_sort(arr):
    # Simulates physical gravity bead drops
    # Transposing integer counts
    pass`
  },
  burstSort: {
    description: "A cache-efficient trie-based string or integer sorting algorithm utilizing dynamic bucket bursting.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def burst_sort(arr):
    # Trie burst node evaluations
    pass`
  },
  proxmapSort: {
    description: "A map-based distribution sort that uses proximity keys to place elements into contiguous array regions.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def proxmap_sort(arr):
    # Proximity mapping index computation
    pass`
  },
  postmanSort: {
    description: "A sorting algorithm similar to radix sort used by post offices to sort mail starting from the most significant field.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def postman_sort(arr):
    # Hierarchical field-based bucket sorting
    pass`
  },
  spaghettiSort: {
    description: "A parallel analog sorting method conceptualized by representing numbers as dry spaghetti rods and leveling them.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def spaghetti_sort(arr):
    # Repeatedly retrieve maximum value
    # Lower rod positions...
    pass`
  },
  gravitySort: {
    description: "A natural analog sorting algorithm (Bead Sort) that simulates balls or beads falling under gravity.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(1)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N²)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def gravity_sort(arr):
    # Bead Sort variant
    pass`
  },
  interpolationSort: {
    description: "Inserts elements into their approximate sorted locations by computing position estimates via linear interpolation.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def interpolation_sort(arr):
    # Estimate location = low + (val - min) * range
    # Insertion sort correction...
    pass`
  },

  // ==========================================
  // Hybrid & Advanced
  // ==========================================
  timSort: {
    description: "Python's standard sorting algorithm; finds pre-sorted runs and merges them using merge/insertion steps.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def tim_sort(arr):
    # Split into runs of size 16-64
    # Insertion sort runs
    # Merge runs together...
    pass`
  },
  mergeInsertionSort: {
    description: "The Ford-Johnson algorithm; designed to sort elements using the absolute minimum number of comparison steps.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def ford_johnson_sort(arr):
    # Group into pairs and sort them
    # Insertion of elements in binary insertion order (Jacobsthal numbers)
    pass`
  },
  samplesort: {
    description: "A parallel sorting algorithm that splits the data using a sample set of splitters and sorts buckets concurrently.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def sample_sort(arr):
    # Gather samples
    # Split into buckets based on pivots
    # Quick sort buckets
    pass`
  },
  jSort: {
    description: "A hybrid sorting method that converts the array into a max heap, then performs a highly optimized insertion sort.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def j_sort(arr):
    # Build Heap
    # Insertion Sort...
    pass`
  },

  // ==========================================
  // Esoteric / Impractical
  // ==========================================
  bogoSort: {
    description: "An incredibly inefficient sorting algorithm that repeatedly shuffles the array until it randomly becomes sorted.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N &bull; N!)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(Infinity)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(1)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `import random

def is_sorted(arr):
    return all(arr[i] <= arr[i+1] for i in range(len(arr)-1))

def bogo_sort(arr):
    while not is_sorted(arr):
        random.shuffle(arr)`
  },
  sleepSort: {
    description: "A humorous sorting algorithm where each element is processed in a separate thread that sleeps proportional to its value.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N + max(val))</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N + max(val))</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N + max(val))</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = size, max(val) = time to sleep for maximum value)</div>
    `,
    code: `import time
import threading

def sleep_and_append(val, result):
    time.sleep(val / 1000)
    result.append(val)

def sleep_sort(arr):
    result = []
    threads = [threading.Thread(target=sleep_and_append, args=(x, result)) for x in arr]
    for t in threads: t.start()
    for t in threads: t.join()
    return result`
  },
  stoogeSort: {
    description: "A recursive sorting algorithm that divides the array into thirds, recursively sorting the first 2/3, last 2/3, and first 2/3.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N^2.7)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N^2.7)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N^2.7)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def stooge_sort(arr, l, h):
    if arr[l] > arr[h]:
        arr[l], arr[h] = arr[h], arr[l]
    if h - l + 1 > 2:
        t = (h - l + 1) // 3
        stooge_sort(arr, l, h - t)
        stooge_sort(arr, l + t, h)
        stooge_sort(arr, l, h - t)`
  },
  strandSort: {
    description: "Extracts sorted sublists (strands) from the unsorted array and merges them iteratively into the result.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N²)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N²)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def strand_sort(arr):
    # Extract sorting strands
    # Merge strands recursively...
    pass`
  },
  patienceSorting: {
    description: "Inspired by the Patience card game; places elements into stacks according to rules and merges them.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N)</strong></span>
      </div>
      <div class="complexity-legend">(N = number of elements to sort)</div>
    `,
    code: `def patience_sort(arr):
    # Deal elements into stacks
    # Merge stacks...
    pass`
  },
  bitonicSort: {
    description: "A parallel sorting network that recursively partitions and merges sequences into bitonic (ascending then descending) shapes.",
    complexity: `
      <div class="complexity-row">
        <span class="complexity-badge time-best">Best: <strong>O(N log² N)</strong></span>
        <span class="complexity-badge time-avg">Avg: <strong>O(N log² N)</strong></span>
        <span class="complexity-badge time-worst">Worst: <strong>O(N log² N)</strong></span>
        <span class="complexity-badge space">Space: <strong>O(N log² N)</strong></span>
      </div>
      <div class="complexity-legend">(N = size, requires array size to be a power of 2)</div>
    `,
    code: `def bitonic_sort(arr, low, cnt, direction):
    if cnt > 1:
        k = cnt // 2
        bitonic_sort(arr, low, k, 1)
        bitonic_sort(arr, low + k, k, 0)
        bitonic_merge(arr, low, cnt, direction)`
  }
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
