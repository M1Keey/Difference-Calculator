import yaml from 'js-yaml';

const parseData = (extension, data) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`The extension ${extension} is not supported!`);
  }
};

export default parseData;
