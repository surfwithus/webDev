export class BinaryTree<T> {
    root: Node<T> | null = null;

    inOrderTraversal(): T[] {
        const result: T[] = [];
        const traverse = (node: Node<T> | null) => {
            if (!node) return;
            traverse(node.left);
            result.push(node.data);
            traverse(node.right);
        };
        traverse(this.root);
        return result;
    }
    preOrderTraversal(): T[] {
        const result: T[] = [];
        const traverse = (node: Node<T> | null) => {
            if (!node) return;
            result.push(node.data);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
        return result;
    }
    postOrderTraversal(): T[] {
        const result: T[] = [];
        const traverse = (node: Node<T> | null) => {
        if (!node) return;
            traverse(node.left);
            traverse(node.right);
            result.push(node.data);
        };
        traverse(this.root);
        return result;
    }
    levelOrderTraversal(): T[] {
        const result: T[] = [];
        if (!this.root) return result;
        const queue: Node<T>[] = [this.root];

        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(node.data);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    insert(data: T): void {
        const newNode = new Node(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (data < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    // 오른쪽 서브트리의 최솟값을 옮기는 것으로 가정
    remove(data: T): void {
        const findMinData = (node: Node<T>): Node<T> => {
            while (node.left)
                node = node.left;
            return node;
        };

        const removeNode = (node: Node<T> | null, data: T): Node<T> | null => {
            if (!node) return null;

            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            }
            else if (data > node.data) {
                node.right = removeNode(node.right, data);
                return node;
            }
            else {
                if (!node.left && !node.right) return null;
                if (!node.left) return node.right;
                if (!node.right) return node.left;

                const minData = findMinData(node.right);
                node.data = minData.data;
                node.right = removeNode(node.right, minData.data);
                return node;
            }
        };

        this.root = removeNode(this.root, data);
    }

    search(data: T): T | null {
        let current = this.root;
        while (current) {
            if (data === current.data)
                return current.data;
            if (data < current.data)
                current = current.left;
            else current = current.right;
        }
        return null;
    }
}

class Node<T> {
    public left: Node<T> | null = null;
    public right: Node<T> | null = null;
    public data: T;

    constructor(data: T) {
        this.data = data;
    }
}