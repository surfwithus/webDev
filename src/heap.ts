export class Heap<T> {
  private items: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.items = [];
    this.comparator = comparator;
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  push(data: T): void {
    this.items.push(data);
    this.siftUp();
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Heap is empty");
    }

    const top = this.items[0];

    const last = this.items.pop();
    if (last === undefined) {
      return top;
    }

    if (!this.isEmpty()) {
      this.items[0] = last;
      this.siftDown();
    }

    return top;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Heap is empty");
    }
    return this.items[0];
  }

  private siftUp(): void {
    let idx = this.items.length - 1;

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);

      if (this.comparator(this.items[idx], this.items[parentIdx]) >= 0) {
        break;
      }

      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }

  private siftDown(): void {
    let idx = 0;
    const length = this.items.length;

    while (true) {
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;
      let smallest = idx;

      if (left < length && this.comparator(this.items[left], this.items[smallest]) < 0) {
        smallest = left;
      }

      if (right < length && this.comparator(this.items[right], this.items[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === idx) break;

      this.swap(idx, smallest);
      idx = smallest;
    }
  }

  private swap(i: number, j: number) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }
}
  