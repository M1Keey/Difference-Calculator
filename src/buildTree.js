import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const valueOfKeyInFirstObj = obj1[key];
    const valueOfKeyInSecondObj = obj2[key];

    if (!_.has(obj1, key)) {
      return { action: 'add', key, value: valueOfKeyInSecondObj };
    }
    if (!_.has(obj2, key)) {
      return { action: 'remove', key, value: valueOfKeyInFirstObj };
    }
    if (_.isPlainObject(valueOfKeyInFirstObj) && _.isPlainObject(valueOfKeyInSecondObj)) {
      return { action: 'recursion', key, children: buildTree(valueOfKeyInFirstObj, valueOfKeyInSecondObj) };
    }
    if (!_.isEqual(valueOfKeyInFirstObj, valueOfKeyInSecondObj)) {
      return {
        action: 'duplicate', key, value1: valueOfKeyInFirstObj, value2: valueOfKeyInSecondObj,
      };
    }
    return { action: 'nothing', key, value: valueOfKeyInFirstObj };
  });
};

export default buildTree;
