import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error('Формат не поддерживается!');
  }
};
export default format;
