export interface InputProblem {
  rows: number;
  cols: number;
  matrix: number[][];
  target: number;
}

/**
 * Represents a specific position in a two-dimensional matrix.
 */
export interface MatrixPosition {
  row: number;
  col: number;
}
