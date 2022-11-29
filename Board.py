from tabulate import tabulate
import math, random

class Board:
    def __init__(self, size):
        # only allow boards with size indicating perfect square
        sqrt = math.sqrt(size)
        if (sqrt - int(sqrt)) != 0:
            raise ValueError("size of board must be perfect square")
        self.size = size
        self.grid = [[0] * self.size for _ in range(self.size)]
        self.nums = [0] * self.size * self.size
        self.indices = list(range(0, len(self.nums)))

    def clear(self):
        self.empty = True
        self.nums = []
        self.reset()

    def reset(self):
        self.empty = True
        self.nums = [0] * self.size * self.size

    def importNums(self, nums):
        if len(nums) != self.size * self.size:
            raise ValueError("imported nums list is not correct length")
        self.nums = nums
        self.getGrid()

    def getGrid(self):
        for idx, _ in enumerate(self.nums):
            self.grid[math.floor(idx / self.size)][idx % self.size] = self.nums[idx]
        print(tabulate(self.grid, tablefmt='fancy_grid'))
        return self.grid

    def randomly_populate(self):
            self.nums = []
            for _ in range(0, self.size * self.size):
                self.nums.append(random.randint(1, 9))
            self.empty = False

    def checkRows(self):
        if not self.empty:
            for idx, num in enumerate(self.nums):
                curr_row = set()
                if idx % self.size != 0:
                    curr_row.add(num)
                else:
                    if len(curr_row) != self.size:
                        return False
        return True

    def checkCols(self):
        if not self.empty:
            for x in range(0, self.size):
                curr_col = set([self.nums[i] for i in self.indices if i % self.size == x])
                if len(curr_col) != self.size:
                    return False
        return True

    def checkGrids(self):
        self.getGrid()
        grid_size = int(math.sqrt(self.size))
        grids = {}

        for i in range(0, len(self.nums), grid_size):
            group = math.floor(math.floor(i / self.size) / grid_size)
            col = i % self.size
            key = f"{group}{col}"
            if key not in grids:
                grids[key] = []
        
            grids[key] += self.nums[i:i+grid_size]
            
        for _, curr_grid in grids.items():
            if len(set(curr_grid)) != self.size:
                return False
        return True

    def checkBoard(self):
        return self.checkRows() and self.checkCols() and self.checkGrids()
