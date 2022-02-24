import stylish from './stylish.js';

const format = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error('Формат не поддерживается!');
  }
};
export default format;
