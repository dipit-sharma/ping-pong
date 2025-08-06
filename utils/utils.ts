import { Cell } from "@/class/Cell";

// Create a single global generator instance
const globalIdGenerator = (function* () {
  let id = 1;
  while (true) {
    yield id++;
  }
})();

export function* yieldId() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

// Function to get next ID from global generator
export function getNextId(): number {
  return globalIdGenerator.next().value ?? 0;
}

export function traverseEdge({
  grid,
  startX,
  startY,
  id,
  exclude,
}: {
  grid: Cell[][];
  startX: number;
  startY: number;
  id: number;
  exclude: { x: number; y: number };
}) {
  const rows = grid.length;
  const cols = grid[0].length;
  let i = startX;
  let j = startY;

  const direction = {
    h: 1,
    v: 1,
  };

  while (true) {
    if (i == 0 && j == 0) {
      direction.h = 1;
      direction.v = 0;
    }
    if (i == 0 && j == cols - 1) {
      direction.h = 0;
      direction.v = 1;
    }
    if (i == rows - 1 && j == 0) {
      direction.h = 0;
      direction.v = -1;
    }
    if (i == rows - 1 && j == cols - 1) {
      direction.h = -1;
      direction.v = 0;
    }

    if (i == exclude.x && j == exclude.y) {
    } else {
      grid[i][j].setId(id);
      id++;
    }

    i += direction.v;
    j += direction.h;

    if (i == startX && j == startY) {
      break;
    }
  }
  return id;
}
