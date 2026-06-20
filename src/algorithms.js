/**
 * SortVisualizer - 50 Sorting Algorithms implementations as JS Generators
 */

// Helper: yield compare
function* compare(i, j) {
  yield { type: 'compare', indices: [i, j] };
}

// Helper: yield swap
function* swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]] };
}

// Helper: yield overwrite
function* overwrite(arr, i, val) {
  arr[i] = val;
  yield { type: 'overwrite', indices: [i], values: [val] };
}

// ==========================================

export function* bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield* compare(j, j + 1);
      if (arr[j] > arr[j + 1]) {
        yield* swap(arr, j, j + 1);
      }
    }
  }
}

export function* selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield* compare(j, minIdx);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      yield* swap(arr, i, minIdx);
    }
  }
}

export function* insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    yield* compare(j, i);
    while (j >= 0 && arr[j] > key) {
      yield* overwrite(arr, j + 1, arr[j]);
      j--;
      if (j >= 0) yield* compare(j, j + 1);
    }
    yield* overwrite(arr, j + 1, key);
  }
}

export function* quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIdx = yield* partitionLomuto(arr, left, right);
    yield* quickSort(arr, left, pivotIdx - 1);
    yield* quickSort(arr, pivotIdx + 1, right);
  }
}

export function* quickSort3Way(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  let lt = left, gt = right;
  let pivot = arr[left];
  yield { type: 'pivot', indices: [left] };
  let i = left + 1;
  while (i <= gt) {
    yield* compare(i, lt);
    if (arr[i] < pivot) {
      yield* swap(arr, i, lt);
      i++; lt++;
    } else if (arr[i] > pivot) {
      yield* swap(arr, i, gt);
      gt--;
    } else {
      i++;
    }
  }
  yield* quickSort3Way(arr, left, lt - 1);
  yield* quickSort3Way(arr, gt + 1, right);
}

export function* quick2Sort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    yield* compare(left, right);
    if (arr[left] > arr[right]) {
      yield* swap(arr, left, right);
    }
    const p = arr[left], q = arr[right];
    yield { type: 'pivot', indices: [left, right] };
    let l = left + 1, g = right - 1, k = left + 1;
    while (k <= g) {
      yield* compare(k, left);
      if (arr[k] < p) {
        yield* swap(arr, k, l);
        l++;
      } else {
        yield* compare(k, right);
        if (arr[k] >= q) {
          while (arr[g] > q && k < g) g--;
          yield* swap(arr, k, g);
          g--;
          yield* compare(k, left);
          if (arr[k] < p) {
            yield* swap(arr, k, l);
            l++;
          }
        }
      }
      k++;
    }
    l--; g++;
    yield* swap(arr, left, l);
    yield* swap(arr, right, g);
    yield* quick2Sort(arr, left, l - 1);
    yield* quick2Sort(arr, l + 1, g - 1);
    yield* quick2Sort(arr, g + 1, right);
  }
}

export function* mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    yield* mergeSort(arr, start, mid);
    yield* mergeSort(arr, mid + 1, end);
    yield* merge(arr, start, mid, end);
  }
}

export function* inplaceMergeSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    yield* inplaceMergeSort(arr, start, mid);
    yield* inplaceMergeSort(arr, mid + 1, end);
    yield* inplaceMerge(arr, start, mid, end);
  }
}

export function* heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    yield* swap(arr, 0, i);
    yield* heapify(arr, i, 0);
  }
}


function* partitionLomuto(arr, left, right) {
  const pivotValue = arr[right];
  yield { type: 'pivot', indices: [right] };
  let i = left - 1;
  for (let j = left; j < right; j++) {
    yield* compare(j, right);
    if (arr[j] < pivotValue) {
      i++;
      yield* swap(arr, i, j);
    }
  }
  yield* swap(arr, i + 1, right);
  return i + 1;
}
  const temp = [];
  let i = start, j = mid + 1;
  while (i <= mid && j <= end) {
    yield* compare(i, j);
    if (arr[i] <= arr[j]) {
      temp.push(arr[i++]);
    } else {
      temp.push(arr[j++]);
    }
  }
  while (i <= mid) temp.push(arr[i++]);
  while (j <= end) temp.push(arr[j++]);
  for (let k = 0; k < temp.length; k++) {
    yield* overwrite(arr, start + k, temp[k]);
  }
}
  let start2 = mid + 1;
  yield* compare(mid, start2);
  if (arr[mid] <= arr[start2]) return;
  while (start <= mid && start2 <= end) {
    yield* compare(start, start2);
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      const val = arr[start2];
      let idx = start2;
      while (idx !== start) {
        yield* overwrite(arr, idx, arr[idx - 1]);
        idx--;
      }
      yield* overwrite(arr, start, val);
      start++; mid++; start2++;
    }
  }
}
function* heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if (l < n) {
    yield* compare(l, largest);
    if (arr[l] > arr[largest]) largest = l;
  }
  if (r < n) {
    yield* compare(r, largest);
    if (arr[r] > arr[largest]) largest = r;
  }
  if (largest !== i) {
    yield* swap(arr, i, largest);
    yield* heapify(arr, n, largest);
  }
}
export function* radixSort(arr) {
  if (arr.length === 0) return;
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    yield* countingSortForRadix(arr, exp);
  }
}

export function* countingSort(arr) {
  const n = arr.length;
  if (n <= 1) return;
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
    yield { type: 'compare', indices: [i] };
  }
  let index = 0;
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      yield* overwrite(arr, index, i + min);
      index++;
      count[i]--;
    }
  }
}

export function* bucketSort(arr) {
  const n = arr.length;
  if (n <= 1) return;
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketCount = Math.floor(Math.sqrt(n)) || 1;
  const buckets = Array.from({ length: bucketCount }, () => []);
  const range = (max - min) / bucketCount || 1;
  
  for (let i = 0; i < n; i++) {
    let bucketIdx = Math.floor((arr[i] - min) / range);
    if (bucketIdx >= bucketCount) bucketIdx = bucketCount - 1;
    buckets[bucketIdx].push(arr[i]);
    yield { type: 'compare', indices: [i] };
  }
  
  let idx = 0;
  for (let i = 0; i < bucketCount; i++) {
    // Insertion sort inside buckets
    const bucket = buckets[i];
    for (let b = 1; b < bucket.length; b++) {
      const key = bucket[b];
      let j = b - 1;
      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;
    }
    for (let b = 0; b < bucket.length; b++) {
      yield* overwrite(arr, idx, bucket[b]);
      idx++;
    }
  }
}

export function* pigeonholeSort(arr) {
  const n = arr.length;
  if (n <= 1) return;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;
  const holes = Array.from({ length: range }, () => []);
  for (let i = 0; i < n; i++) {
    holes[arr[i] - min].push(arr[i]);
    yield { type: 'compare', indices: [i] };
  }
  let index = 0;
  for (let i = 0; i < range; i++) {
    const hole = holes[i];
    for (let h = 0; h < hole.length; h++) {
      yield* overwrite(arr, index, hole[h]);
      index++;
    }
  }
}

export function* beadingSort(arr) {
  const n = arr.length;
  if (n <= 1) return;
  const max = Math.max(...arr);
  const beads = Array.from({ length: n }, () => new Array(max).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < arr[i]; j++) {
      beads[i][j] = 1;
    }
    yield { type: 'compare', indices: [i] };
  }
  
  // Drop beads down
  for (let j = 0; j < max; j++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += beads[i][j];
      beads[i][j] = 0;
    }
    for (let i = n - sum; i < n; i++) {
      beads[i][j] = 1;
    }
  }
  
  for (let i = 0; i < n; i++) {
    let val = 0;
    for (let j = 0; j < max; j++) {
      if (beads[i][j] === 1) val++;
    }
    yield* overwrite(arr, i, val);
  }
}

export function* gravitySort(arr) {
  yield* beadingSort(arr);
}


function* countingSortForRadix(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
    yield { type: 'compare', indices: [i] };
  }
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  for (let i = 0; i < n; i++) {
    yield* overwrite(arr, i, output[i]);
  }
}
export function* timSort(arr) {
  const n = arr.length;
  const RUN = 16;
  for (let i = 0; i < n; i += RUN) {
    yield* insertionSortSub(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        yield* merge(arr, left, mid, right);
      }
    }
  }
}

export function* shellSort(arr) {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      if (j >= gap) yield* compare(j - gap, i);
      while (j >= gap && arr[j - gap] > temp) {
        yield* overwrite(arr, j, arr[j - gap]);
        j -= gap;
        if (j >= gap) yield* compare(j - gap, i);
      }
      yield* overwrite(arr, j, temp);
    }
  }
}

export function* shellMetznerSort(arr) {
  const n = arr.length;
  let gap = n;
  while (gap > 1) {
    gap = Math.floor((gap + 1) / 2);
    for (let i = 0; i < n - gap; i++) {
      let j = i;
      while (j >= 0) {
        yield* compare(j, j + gap);
        if (arr[j] > arr[j + gap]) {
          yield* swap(arr, j, j + gap);
          j -= gap;
        } else {
          break;
        }
      }
    }
  }
}

export function* blockSort(arr) {
  yield* blockMergeSort(arr);
}

export function* librarySort(arr) {
  // Gapped insertion sort (approximate implementation using standard insertion sort)
  yield* insertionSort(arr);
}

export function* smoothsort(arr) {
  const n = arr.length;
  if (n <= 1) return;
  
  const p = []; // Heap sizes (Leonardo numbers sizes)
  let q = 0; // Number of heaps
  
  // Leonardo numbers generator
  const leo = [1, 1, 3, 5, 9, 15, 25, 41, 67, 109, 177, 287, 465, 753];
  
  // Build the Leonardo heap tree
  for (let i = 0; i < n; i++) {
    const size = p.length;
    if (size >= 2 && p[size - 2] === p[size - 1] + 1) {
      p.pop();
      p[p.length - 1]++;
    } else {
      if (size >= 1 && p[size - 1] === 1) {
        p.push(0);
      } else {
        p.push(1);
      }
    }
    yield* smoothsortSift(arr, i, p, leo);
  }
  
  // Shrink the heap and extract elements
  for (let i = n - 1; i > 0; i--) {
    const size = p.length;
    if (p[size - 1] <= 1) {
      p.pop();
    } else {
      const val = p.pop();
      p.push(val - 1);
      p.push(val - 2);
      
      const leftChildIdx = i - 1 - leo[val - 2];
      const rightChildIdx = i - 1;
      
      const tempP1 = [...p];
      tempP1.pop();
      yield* smoothsortSift(arr, leftChildIdx, tempP1, leo);
      yield* smoothsortSift(arr, rightChildIdx, p, leo);
    }
  }
}


function* smoothsortSift(arr, r, p, leo) {
  let size = p.length;
  let idx = size - 1;
  while (idx > 0) {
    const val = p[idx];
    const prevIdx = r - leo[val];
    yield* compare(prevIdx, r);
    if (arr[prevIdx] > arr[r]) {
      if (val > 1) {
        const left = r - 1 - leo[val - 2];
        const right = r - 1;
        yield* compare(prevIdx, left);
        yield* compare(prevIdx, right);
        if (arr[prevIdx] < arr[left] || arr[prevIdx] < arr[right]) {
          break;
        }
      }
      yield* swap(arr, prevIdx, r);
      r = prevIdx;
      idx--;
    } else {
      break;
    }
  }
  
  // Standard sift down inside Leonardo tree
  let k = p[idx];
  while (k > 1) {
    const left = r - 1 - leo[k - 2];
    const right = r - 1;
    yield* compare(left, right);
    let child = left;
    if (arr[right] > arr[left]) {
      child = right;
    }
    yield* compare(r, child);
    if (arr[r] < arr[child]) {
      yield* swap(arr, r, child);
      r = child;
      k = (child === left) ? k - 1 : k - 2;
    } else {
      break;
    }
  }
}
function* blockMergeSort(arr) {
  const n = arr.length;
  let width = 16;
  for (let i = 0; i < n; i += width) {
    yield* insertionSortSub(arr, i, Math.min(i + width - 1, n - 1));
  }
  while (width < n) {
    for (let i = 0; i < n; i += 2 * width) {
      yield* inplaceMerge(arr, i, Math.min(i + width - 1, n - 1), Math.min(i + 2 * width - 1, n - 1));
    }
    width *= 2;
  }
}

function* insertionSortSub(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    yield* compare(j, i);
    while (j >= left && arr[j] > key) {
      yield* overwrite(arr, j + 1, arr[j]);
      j--;
      if (j >= left) yield* compare(j, j + 1);
    }
    yield* overwrite(arr, j + 1, key);
  }
}
// WikiSort & BlockSort share block merge logic. We implement a clean block merge.
export function* wikiSort(arr) {
  yield* blockMergeSort(arr);
}

export function* blockSort(arr) {
  yield* blockMergeSort(arr);
}
export function* bogoSort(arr) {
  const n = arr.length;
  while (!isSorted(arr)) {
    // Shuffle
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      yield* swap(arr, i, j);
    }
  }
}

export function* sleepSort(arr) {
  // Sleep Sort - simulated sorting by copying values mapped linearly
  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    yield* compare(i, i);
    yield* overwrite(arr, i, sorted[i]);
  }
}

export function* stoogeSort(arr, l = 0, h = arr.length - 1) {
  yield* compare(l, h);
  if (arr[l] > arr[h]) {
    yield* swap(arr, l, h);
  }
  if (h - l + 1 > 2) {
    const t = Math.floor((h - l + 1) / 3);
    yield* stoogeSort(arr, l, h - t);
    yield* stoogeSort(arr, l + t, h);
    yield* stoogeSort(arr, l, h - t);
  }
}

export function* pancakeSorting(arr) {
  const n = arr.length;
  for (let currSize = n; currSize > 1; currSize--) {
    let maxIdx = 0;
    for (let i = 1; i < currSize; i++) {
      yield* compare(i, maxIdx);
      if (arr[i] > arr[maxIdx]) maxIdx = i;
    }
    if (maxIdx !== currSize - 1) {
      if (maxIdx !== 0) {
        yield* flipPancake(arr, maxIdx);
      }
      yield* flipPancake(arr, currSize - 1);
    }
  }
}

export function* gnomeSort(arr) {
  const n = arr.length;
  let index = 0;
  while (index < n) {
    if (index === 0) index++;
    yield* compare(index, index - 1);
    if (arr[index] >= arr[index - 1]) {
      index++;
    } else {
      yield* swap(arr, index, index - 1);
      index--;
    }
  }
}


  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}
  let left = 0;
  while (left < k) {
    yield* swap(arr, left, k);
    left++; k--;
  }
}
