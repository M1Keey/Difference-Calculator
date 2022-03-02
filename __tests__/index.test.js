import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFicturePath = (fixtureName) => path.join(__dirname, '..', '__fixtures__', fixtureName);
const getFictureData = (fixtureName) => readFileSync(`${getFicturePath(fixtureName)}`, 'utf-8');

const testsData = [
  ['file1.json', 'file2.json', 'expected_result_stylish.txt', 'stylish'],
  ['file1.json', 'file2.yaml', 'expected_result_stylish.txt', 'stylish'],
  ['file1.json', 'file2.yml', 'expected_result_stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expected_result_plain.txt', 'plain'],
  ['file1.json', 'file2.yaml', 'expected_result_plain.txt', 'plain'],
  ['file1.json', 'file2.yml', 'expected_result_plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expected_result_json.txt', 'json'],
  ['file1.json', 'file2.yaml', 'expected_result_json.txt', 'json'],
  ['file1.json', 'file2.yml', 'expected_result_json.txt', 'json'],
];

describe('check for correct diff', () => {
  test.each(testsData)('Common test', (fixture1, fixture2, correctResult, format) => {
    const correctDiffResult = getFictureData(correctResult);
    const firstFicturePath = getFicturePath(fixture1);
    const secondFicturePath = getFicturePath(fixture2);
    const actualDiffResult = genDiff(firstFicturePath, secondFicturePath, format);
    expect(actualDiffResult).toEqual(correctDiffResult);
  });
  test('plain test error', () => {
    const tree = [{ action: 'badAction', key: 'test', value: 'test' }];
    expect(() => {
      plain(tree);
    }).toThrow('There is no such action: badAction');
  });
  test('stylish test error', () => {
    const tree = [{ action: 'badAction', key: 'test', value: 'test' }];
    expect(() => {
      stylish(tree);
    }).toThrow('There is no such action: badAction');
  });
  test('formatter non-existent format test error', () => {
    expect(() => {
      genDiff(getFicturePath('file1.json'), getFicturePath('file2.json'), 'badFormat');
    }).toThrow('The format badFormat is not supported!');
  });
  test('parcer non-existent format test error', () => {
    expect(() => {
      genDiff(getFicturePath('file1.json'), getFicturePath('badExtension.txt'));
    }).toThrow('The format txt is not supported!');
  });
});
