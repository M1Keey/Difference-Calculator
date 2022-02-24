import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFicturePath = (fixtureName) => path.join(__dirname, '..', '__fixtures__', fixtureName);
const getFictureData = (fixtureName) => readFileSync(`${getFicturePath(fixtureName)}`, 'utf-8');

const testsData = [
  ['file1.json', 'file2.json', 'expected_result1.txt'],
  ['file1.yaml', 'file2.yaml', 'expected_result1.txt'],
  ['file1.yml', 'file2.yml', 'expected_result1.txt'],
  ['file1.yml', 'file2.json', 'expected_result1.txt'],
  ['file1.json', 'file2.yaml', 'expected_result1.txt'],
];

describe('check for correct diff', () => {
  test.each(testsData)('Common test', (fixture1, fixture2, correctResult) => {
    const correctDiffResult = getFictureData(correctResult);
    const actualDiffResult = genDiff(fixture1, fixture2);
    expect(actualDiffResult).toEqual(correctDiffResult);
  });
});
