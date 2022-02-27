const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (data === null) {
    return null;
  }
  if (typeof data === 'object') {
    return '[complex value]';
  }
  return String(data);
};

const plain = (innerTree) => {
  const iter = (tree, currentNode) => tree
    .filter((node) => node.action !== 'nothing')
    .map((node) => {
      const property = currentNode ? `${currentNode}.${node.key}` : node.key;
      switch (node.action) {
        case 'add':
          return `Property '${property}' was added with value: ${stringify(node.value)}`;
        case 'remove':
          return `Property '${property}' was removed`;
        case 'recursion':
          return iter(node.children, property);
        case 'duplicate':
          return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        default:
          throw new Error(`There is no such action: ${node.action}`);
      }
    }).join('\n');
  return iter(innerTree, 0);
};

export default plain;
