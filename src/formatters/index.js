import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`The format ${formatType} is not supported!`);
  }
};
export default format;
