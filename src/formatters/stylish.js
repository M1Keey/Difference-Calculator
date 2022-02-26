const indent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);
const stringify = (data, treeDepth) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) {
    return null;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`);
  return ['{', ...lines, `${indent(treeDepth)}  }`].join('\n');
};

const stylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, action) => `${indent(depth)}${action} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.action) {
      case 'add':
        return getValue(node.value, '+');
      case 'remove':
        return getValue(node.value, '-');
      case 'nothing':
        return getValue(node.value, ' ');
      case 'duplicate':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      case 'recursion':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`There is no such action: ${node.action}`);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
