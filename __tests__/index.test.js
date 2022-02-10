import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/diff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFicturePath = (fixtureName) => path.join(__dirname, '..', '__fixtures__', fixtureName);
const getFictureData = (fixtureName) => readFileSync(`${getFicturePath(fixtureName)}`, 'utf-8');

const testsData = [
  ['file1.json', 'file2.json', 'expected_result1.txt'],
];

describe('check for correct diff', () => {
  test.each(testsData)('Common test', (fixture1, fixture2, correctResult) => {
    const correcDiffResult = getFictureData(correctResult);
    const actualDiffResult = genDiff(fixture1, fixture2);
    expect(actualDiffResult).toEqual(correcDiffResult);
  });
});
