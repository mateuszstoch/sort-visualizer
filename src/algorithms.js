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

