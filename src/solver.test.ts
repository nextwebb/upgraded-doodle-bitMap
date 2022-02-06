import {
  createMatrix,
  distanceDiff,
  findNeighbors,
  setPositionsToValue,
  findAllPositionsWithValue,
  minDistanceToTarget,
} from './solver';
import { InputProblem } from './types';

describe(' Compute #' + minDistanceToTarget.name, () => {
  it('should find all min distance of each position to closest one with a white value', () => {
    const target = 1;
    const problem: InputProblem = {
      cols: 3,
      rows: 3,
      matrix: [
        [0, 0, 0],
        [0, target, 0],
        [0, 0, 0],
      ],
      target,
    };
    const solution = minDistanceToTarget(problem);
    expect(solution).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          1,
          2,
        ],
        Array [
          1,
          0,
          1,
        ],
        Array [
          2,
          1,
          2,
        ],
      ]
    `);
  });

  it(' should find all positions that are already target value *  ', () => {
    const target = 1;
    const problem: InputProblem = {
      cols: 2,
      rows: 2,
      matrix: [
        [target, target],
        [target, target],
      ],
      target,
    };
    const solution = minDistanceToTarget(problem);
    expect(solution).toMatchInlineSnapshot(`
Array [
  Array [
    0,
    0,
  ],
  Array [
    0,
    0,
  ],
]
`);
  });

  it('should get all rows = 1', () => {
    const target = 1;
    const problem: InputProblem = {
      cols: 6,
      rows: 1,
      matrix: [[0, 0, 0, 0, 0, target]],
      target,
    };
    const solution = minDistanceToTarget(problem);
    expect(solution).toMatchInlineSnapshot(`
Array [
  Array [
    5,
    4,
    3,
    2,
    1,
    0,
  ],
]
`);
  });

  it('cols = 1', () => {
    const target = 1;
    const problem: InputProblem = {
      cols: 1,
      rows: 6,
      matrix: [[0], [0], [0], [0], [0], [target]],
      target,
    };
    const solution = minDistanceToTarget(problem);
    expect(solution).toMatchInlineSnapshot(`
Array [
  Array [
    5,
  ],
  Array [
    4,
  ],
  Array [
    3,
  ],
  Array [
    2,
  ],
  Array [
    1,
  ],
  Array [
    0,
  ],
]
`);
  });

  it('BIG rows = 182, cols = 182', () => {
    const target = 1;
    const rows = 182;
    const cols = 182;
    const matrix = createMatrix(rows, cols, 0);
    const problem: InputProblem = {
      cols,
      rows,
      matrix,
      target,
    };
    matrix[0][0] = target;
    matrix[0][cols - 1] = target;
    matrix[rows - 1][0] = target;
    matrix[rows - 1][cols - 1] = target;
    const solution = minDistanceToTarget(problem);
    expect(solution).toMatchSnapshot();
  });
});

describe('helperFunctions # ' + createMatrix.name, () => {
  it(' should create rows x cols matrix initialized to specified value', () => {
    const rows = 2;
    const cols = 2;
    const matrix = createMatrix(rows, cols, 0);
    expect(matrix).toMatchInlineSnapshot(`
      Array [
        Array [
          0,
          0,
        ],
        Array [
          0,
          0,
        ],
      ]
    `);
  });

  it('should support rows !== cols', () => {
    const rows = 3;
    const cols = 2;
    const matrix = createMatrix(rows, cols, 0);
    expect(matrix).toMatchInlineSnapshot(`
Array [
  Array [
    0,
    0,
  ],
  Array [
    0,
    0,
  ],
  Array [
    0,
    0,
  ],
]
`);
  });
});

describe('helperFunctions # ' + distanceDiff.name, () => {
  it('should return the difference distance between two points', () => {
    const p1 = { row: 0, col: 0 };
    const p2 = { row: 1, col: 1 };
    expect(distanceDiff(p1, p2)).toEqual(2);
  });
  it('should order of points does not affect result', () => {
    const p1 = { row: 0, col: 0 };
    const p2 = { row: 1, col: 1 };
    expect(distanceDiff(p2, p1)).toEqual(2);
  });
  it('should return when p1 === p2', () => {
    const p1 = { row: 0, col: 0 };
    const p2 = p1;
    expect(distanceDiff(p1, p2)).toEqual(0);
  });
});

describe('helperFunctions # ' + findNeighbors.name, () => {
  it('should return neighbors to a matrix position', () => {
    const rows = 3;
    const cols = 3;
    const position = { row: 1, col: 1 };
    const neighbors = findNeighbors(rows, cols, position);
    expect(neighbors).toMatchInlineSnapshot(`
Array [
  Object {
    "col": 0,
    "row": 0,
  },
  Object {
    "col": 1,
    "row": 0,
  },
  Object {
    "col": 2,
    "row": 0,
  },
  Object {
    "col": 0,
    "row": 1,
  },
  Object {
    "col": 2,
    "row": 1,
  },
  Object {
    "col": 0,
    "row": 2,
  },
  Object {
    "col": 1,
    "row": 2,
  },
  Object {
    "col": 2,
    "row": 2,
  },
]
`);
  });

  it('self is not neighbor of self', () => {
    const rows = 3;
    const cols = 3;
    const position = { row: 1, col: 1 };
    const neighbors = findNeighbors(rows, cols, position);
    const selfInNeighbors = neighbors.find((n) => {
      return n.row === position.row && n.col === position.col;
    });
    expect(selfInNeighbors).toBeUndefined();
  });

  it('out of bounds positions are not returned', () => {
    const rows = 1;
    const cols = 1;
    const position = { row: 0, col: 0 };
    const neighbors = findNeighbors(rows, cols, position);
    expect(neighbors).toHaveLength(0);
  });
});

describe('helperFunctions # ' + setPositionsToValue.name, () => {
  it('should set the positions in matrix to value', () => {
    const matrix = [
      [0, 0],
      [0, 0],
    ];
    const positions = [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
    ];
    const value = 10;
    setPositionsToValue(matrix, positions, value);
    expect(matrix).toMatchInlineSnapshot(`
Array [
  Array [
    10,
    0,
  ],
  Array [
    0,
    10,
  ],
]
`);
  });
});

describe('helperFunctions # ' + findAllPositionsWithValue.name, () => {
  it('should returns all positions with value inside matrix', () => {
    const value = 1;
    const matrix = [
      [value, 0],
      [0, value],
    ];
    const positions = findAllPositionsWithValue(matrix, value);
    expect(positions).toMatchInlineSnapshot(`
Array [
  Object {
    "col": 0,
    "row": 0,
  },
  Object {
    "col": 1,
    "row": 1,
  },
]
`);
  });

  it('should return empty array if value is not found', () => {
    const value = 1;
    const matrix = [
      [0, 0],
      [0, 0],
    ];
    const positions = findAllPositionsWithValue(matrix, value);
    expect(positions).toHaveLength(0);
  });
});
