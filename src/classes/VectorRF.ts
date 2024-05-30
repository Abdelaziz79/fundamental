export default class VectorRF<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // Add an item to the vector
  push_back(item: T): void {
    this.items.push(item);
  }

  pop_back(): T | undefined {
    if (this.items.length > 0) {
      return this.items.pop();
    }
    return undefined;
  }

  // Get an item at a specific index
  get(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
    return undefined;
  }

  // Get the size of the vector
  size(): number {
    return this.items.length;
  }

  // Check if the vector is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Clear all items in the vector
  clear(): void {
    this.items = [];
  }

  // Convert vector to an array
  toArray(): T[] {
    return this.items.slice();
  }
}
