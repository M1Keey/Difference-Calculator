import fs from 'fs';
import path from 'path';
import parseData from './parcers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const genDiff = (firstFilePath, secondFilePath, formatType = 'stylish') => {
  const takeDataFromJson = (file) => {
    const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), '__fixtures__', file);
    const fileData = fs.readFileSync(`${filePath}`, 'utf-8');
    const fileFormat = path.extname(file).slice(1);
    console.log(fileFormat)
    const parcedData = parseData(fileFormat, fileData);
    return parcedData;
  };

  const firstFileData = takeDataFromJson(firstFilePath);
  const secondFileData = takeDataFromJson(secondFilePath);
  const innerTree = buildTree(firstFileData, secondFileData);
  return format(innerTree, formatType);
};

export default genDiff;
