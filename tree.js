/** TreeNode: node for a general tree. */
class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    function calculateSum(node) {
      if (!node) {
        return 0;
      }

      let sum = node.val;
      for (const child of node.children) {
        sum += calculateSum(child);
      }

      return sum;
    }

    return calculateSum(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    function countEvenNodes(node) {
      if (!node) {
        return 0;
      }

      let count = node.val % 2 === 0 ? 1 : 0;
      for (const child of node.children) {
        count += countEvenNodes(child);
      }

      return count;
    }

    return countEvenNodes(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    function countNodesGreaterThan(node, lowerBound) {
      if (!node) {
        return 0;
      }

      let count = node.val > lowerBound ? 1 : 0;
      for (const child of node.children) {
        count += countNodesGreaterThan(child, lowerBound);
      }

      return count;
    }

    return countNodesGreaterThan(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
