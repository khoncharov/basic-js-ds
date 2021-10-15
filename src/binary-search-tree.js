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

// Node.prototype.hasNode = function (data) {
//   if (data === this.data) {
//     return true;
//   } else {
//     if (data < this.data) {
//       if (this.left === null) {
//         return false;
//       } else {
//         return this.left.hasNode(data);
//       }
//     } else if (data > this.data) {
//       if (this.right === null) {
//         return false;
//       } else {
//         return this.right.hasNode(data);
//       }
//     }
//   }
// };

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

// Node.prototype.minValue = function () {
//   if (this.left === null) {
//     return this.data;
//   } else {
//     return this.left.minValue();
//   }
// };

// Node.prototype.maxValue = function () {
//   if (this.right === null) {
//     return this.data;
//   } else {
//     return this.right.maxValue();
//   }
// };

Node.prototype.minmax = function (branch) {
  if (this[branch] === null) {
    return this.data;
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
    this.tree.removeNode(data);
  }

  min() {
    // return this.tree.minValue();
    return this.tree.minmax("left");
  }

  max() {
    // return this.tree.maxValue();
    return this.tree.minmax("right");
  }
};

// let x = new BinarySearchTree();
// x.add(27);
// x.add(35);
// x.add(31);
// x.add(45);
// x.add(14);
// x.add(19);
// x.add(10);

// console.log(JSON.stringify(x.root()));
// console.log(x.root());
// console.log(x.min(), x.max());
