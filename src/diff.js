import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';


const genDiff = (firstFilePath, secondFilePath) => {

  const takeDataFromJson = (file) => {
    const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(),'__fixtures__', file);
    const fileData = readFileSync(`${filePath}`, 'utf-8');
    const parcedData = JSON.parse(fileData);
    return parcedData;
  };
  
  const firstFileData = takeDataFromJson(firstFilePath);
  const secondFileData = takeDataFromJson(secondFilePath);
  
  const result = [];

  const getObjectDiff = (obj1, obj2) => {
    const firstFileKeys = Object.keys(obj1);
    const secondFileKeys = Object.keys(obj2);

    const bothFilesKeys = _.union(firstFileKeys, secondFileKeys).sort()

    bothFilesKeys.map((key) => {
      const keyInFirst = firstFileData[key];
      const keyInSecond = secondFileData[key];
      
      if(keyInFirst === keyInSecond) {
        result.push(`\n   ${key}:${keyInFirst}`)
      }
      if (keyInFirst !== keyInSecond) {
        if (keyInFirst === undefined && keyInSecond !== undefined) { 
        result.push(`\n  +${key}:${keyInSecond}`);
        }
        else if (keyInFirst !== undefined && keyInSecond === undefined) { 
          result.push(`\n  -${key}:${keyInFirst}`);
        } else {
          result.push(`\n  -${key}:${keyInFirst}`);
          result.push(`\n  +${key}:${keyInSecond}`);
          }
      }
    });
  }
  getObjectDiff(firstFileData, secondFileData);
  return `{${String(result.join(''))}\n}`;
}

export default genDiff;
