import fs from 'fs';

import { InputProblem } from './types';
const TARGET = 1;

/**
 * parse input problem
 * build the input matices
 **/
export function parseInput(filename: string) {
  const lines = fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n');
  const totalCases = stringToNumber(lines[0]);
  const cases: InputProblem[] = [];

  let lineIndex = 1;
  for (let i = 0; i < totalCases; i++) {
    const [rows, cols] = lines[lineIndex++].split(' ').map(stringToNumber);
    const matrix = [];
    for (let j = 0; j < rows; j++) {
      const row = lines[lineIndex++].split('').map(stringToNumber);
      matrix.push(row);
    }
    cases.push({ rows, cols, matrix, target: TARGET });
  }

  return cases;
}

function stringToNumber(num: string) {
  return parseInt(num, 10);
}

export function printStandardOutput(solution: number[][]) {
  for (const row of solution) {
    console.log(row.join(' '));
  }
}
