/** BinaryTreeNode: node for a general tree. */
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (!this.root) {
      return 0;
    }

    function calculateMinDepth(node) {
      if (!node) {
        return 0;
      }

      const leftDepth = calculateMinDepth(node.left);
      const rightDepth = calculateMinDepth(node.right);

      if (leftDepth === 0 || rightDepth === 0) {
        return leftDepth + rightDepth + 1;
      }

      return Math.min(leftDepth, rightDepth) + 1;
    }

    return calculateMinDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    if (!this.root) {
      return 0;
    }

    function calculateMaxDepth(node) {
      if (!node) {
        return 0;
      }

      const leftDepth = calculateMaxDepth(node.left);
      const rightDepth = calculateMaxDepth(node.right);

      return Math.max(leftDepth, rightDepth) + 1;
    }

    return calculateMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    if (!this.root) {
      return 0;
    }

    let maxSum = Number.MIN_SAFE_INTEGER;

    function calculateMaxSum(node) {
      if (!node) {
        return 0;
      }

      const leftSum = Math.max(0, calculateMaxSum(node.left));
      const rightSum = Math.max(0, calculateMaxSum(node.right));

      maxSum = Math.max(maxSum, leftSum + rightSum + node.val);

      return Math.max(leftSum, rightSum) + node.val;
    }

    calculateMaxSum(this.root);

    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }

    let nextLargerValue = null;

    function findNextLarger(node) {
      if (!node) {
        return;
      }

      if (node.val > lowerBound) {
        if (nextLargerValue === null || node.val < nextLargerValue) {
          nextLargerValue = node.val;
        }
      }

      findNextLarger(node.left);
      findNextLarger(node.right);
    }

    findNextLarger(this.root);

    return nextLargerValue;
  }

  /** areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */
  areCousins(node1, node2) {
    function getNodeLevel(root, target, level) {
      if (!root) {
        return 0;
      }

      if (root.val === target) {
        return level;
      }

      const leftLevel = getNodeLevel(root.left, target, level + 1);
      const rightLevel = getNodeLevel(root.right, target, level + 1);

      return leftLevel || rightLevel;
    }

    function areSiblings(root, a, b) {
      if (!root) {
        return false;
      }

      const areSiblingsOnLeft = (root.left && root.left.val === a && root.right && root.right.val === b);
      const areSiblingsOnRight = (root.left && root.left.val === b && root.right && root.right.val === a);

      return areSiblingsOnLeft || areSiblingsOnRight ||
        areSiblings(root.left, a, b) ||
        areSiblings(root.right, a, b);
    }

    const level1 = getNodeLevel(this.root, node1, 1);
    const level2 = getNodeLevel(this.root, node2, 1);

    return level1 === level2 && !areSiblings(this.root, node1, node2);
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    function serializeNode(node) {
      if (!node) {
        return 'null';
      }

      const leftSerialized = serializeNode(node.left);
      const rightSerialized = serializeNode(node.right);

      return `${node.val},${leftSerialized},${rightSerialized}`;
    }

    return serializeNode(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(stringTree) {
    function deserializeNode(nodes) {
      const val = nodes.shift();

      if (val === 'null') {
        return null;
      }

      const node = new BinaryTreeNode(parseInt(val, 10));
      node.left = deserializeNode(nodes);
      node.right = deserializeNode(nodes);

      return node;
    }

    const nodes = stringTree.split(',');
    return new BinaryTree(deserializeNode(nodes));
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    function findLowestCommonAncestor(root, p, q) {
      if (!root || root.val === p || root.val === q) {
        return root;
      }

      const left = findLowestCommonAncestor(root.left, p, q);
      const right = findLowestCommonAncestor(root.right, p, q);

      if (left && right) {
        return root;
      }

      return left || right;
    }

    return findLowestCommonAncestor(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
