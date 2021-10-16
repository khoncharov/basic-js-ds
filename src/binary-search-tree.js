// const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

Node.prototype.addNode = function (data) {
  if (data < this.data) {
    if (this.left === null) {
      this.left = new Node(data);
    } else {
      this.left.addNode(data);
    }
  } else if (data > this.data) {
    if (this.right === null) {
      this.right = new Node(data);
    } else {
      this.right.addNode(data);
    }
  }
};

Node.prototype.findNode = function (data) {
  if (data === this.data) {
    return this;
  } else {
    if (data < this.data) {
      if (this.left === null) {
        return null;
      } else {
        return this.left.findNode(data);
      }
    } else if (data > this.data) {
      if (this.right === null) {
        return null;
      } else {
        return this.right.findNode(data);
      }
    }
  }
};

Node.prototype.findParent = function (childNode) {
  if (childNode === this) {
    return null;
  }
  if (childNode === this.left || childNode === this.right) {
    return this;
  } else {
    if (childNode.data < this.data) {
      return this.left.findParent(childNode);
    } else if (childNode.data > this.data) {
      return this.right.findParent(childNode);
    }
  }
};

Node.prototype.removeChild = function (node) {
  if (node.left === null && node.right === null) {
    // 1. no child nodes
    if (node === this.left) {
      this.left = null;
    } else if (node === this.right) {
      this.right = null;
    }
  } else if (node.left !== null && node.right === null) {
    // 2. only left child exists
    const subTree = node.left;
    if (node === this.left) {
      this.left = subTree;
    } else if (node === this.right) {
      this.right = subTree;
    }
  } else if (node.left === null && node.right !== null) {
    // 3. only right child exists
    const subTree = node.right;
    if (node === this.left) {
      this.left = subTree;
    } else if (node === this.right) {
      this.right = subTree;
    }
  } else {
    // 4. both children exist
    // 4.1 right child has no subchild
    if (node.right.left === null && node.right.right === null) {
      node.data = node.right.data;
      node.right = null;
    } else if (node.right.left === null && node.right.right !== null) {
      // 4.1 right child has only right subchild
      node.data = node.right.data;
      const subTree = node.right.right;
      node.right = subTree;
    } else if (node.right.left !== null) {
      // 4.2 right child has left subchild
      const rightSubTree = node.right;
      const leftmostNode = rightSubTree.minmax("left");
      node.data = leftmostNode.data;
      return rightSubTree.removeChild(leftmostNode);
    }
  }
};

Node.prototype.minmax = function (branch) {
  if (this[branch] === null) {
    return this;
  } else {
    return this[branch].minmax(branch);
  }
};

module.exports = class BinarySearchTree {
  // class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    if (this.tree === null) {
      this.tree = new Node(data);
    } else {
      this.tree.addNode(data);
    }
  }

  has(data) {
    return !!this.tree.findNode(data);
  }

  find(data) {
    return this.tree.findNode(data);
  }

  remove(data) {
    if (this.tree === null) {
      return;
    }

    const node = this.tree.findNode(data);
    if (node === null) {
      return;
    }

    const parent = this.tree.findParent(node);
    if (parent === null) {
      this.tree.removeChild(node);
    } else {
      parent.removeChild(node);
    }
  }

  min() {
    return this.tree.minmax("left").data;
  }

  max() {
    return this.tree.minmax("right").data;
  }
};

// let x = new BinarySearchTree();
// x.add(27);
// x.add(35);
// x.add(31);
// x.add(42);
// x.add(14);
// x.add(19);
// x.add(10);
// // x.add(17);
// // x.add(21);
// // x.add(18);
// // x.add(16);

// console.log("TREE before >>>>>");
// console.log(x.root());
// // console.log(x.root().left.right);
// x.remove(27);
// console.log("TREE after <<<<<");
// console.log(x.root());
// // console.log(x.root().left.right);
// // console.log(x.min(), x.max());
