import yaml from 'js-yaml';

const parseData = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`The format ${format} is not supported!`);
  }
};

export default parseData;
