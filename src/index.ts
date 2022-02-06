import { parseInput, printStandardOutput } from './util';
import { minDistanceToTarget } from './solver';

const matrices = parseInput('./input.txt');
for (const matrix of matrices) {
  const solution = minDistanceToTarget(matrix);
  printStandardOutput(solution);
}
