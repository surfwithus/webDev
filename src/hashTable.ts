 export class HashTable<K extends string | number, V> {
    private tables: Array<Node<K, V> | null>;
    private size: number;
  
    constructor(size: number = 32) {
      this.size = size;
      this.tables = new Array(size).fill(null);
    }
  
    // hash
    hash(key: K): number {
      if (typeof key === "number") return key % this.size;
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i) * i) % this.size;
      }
      return hash;
    }

    // set
    set(key: K, value: V): void {
      const index = this.hash(key);
      let node = this.tables[index];
  
      if (!node) {
        this.tables[index] = new Node(key, value);
        return;
      }
  
      let prev = null;
      while (node) {
        if (node.key === key) {
          node.value = value;
          return;
        }
        prev = node;
        node = node.next;
      }
  
      prev!.next = new Node(key, value);
    }
  
    // get
    get(key: K): V | undefined {
      const index = this.hash(key);
      let node = this.tables[index];
  
      while (node) {
        if (node.key === key) {
            return node.value;
        }
        node = node.next;
      }
      return undefined;
    }
  
    // has
    has(key: K): boolean {
      return this.get(key) !== undefined;
    }
  
    // entries
    entries(): [K, V][] {
      const result: [K, V][] = [];
      for (const table of this.tables) {
        let node = table;
        while (node) {
          result.push([node.key, node.value]);
          node = node.next;
        }
      }
      return result;
    }
  
    // clear
    clear(): void {
      this.tables = new Array(this.size).fill(null);
    }
}

class Node<K, V> {
    public key: K;
    public value: V;
    public next: Node<K, V> | null = null;
  
    constructor(key: K, value: V) {
      this.key = key;
      this.value = value;
    }
}  