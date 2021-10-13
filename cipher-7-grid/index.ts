const EMPTY_GRID_CELL: string = '0'
const FULLY_GRID_CELL: string = '_'

type Grid = string[][]
type Position = { x: number, y: number }

class GridCipherEncoder {
  private initialString: string
  private grid: Grid
  private width: number
  private height: number

  constructor(initialString: string, grid: Grid, width: number = 4, heidth: number = 4) {
    this.initialString = initialString
    this.grid = grid
    this.width = width
    this.height = heidth
  }

  encode(): string {
    const letterGrid: Grid = this.createEmptyGrid()

    this.getAllZeroPositions().forEach((position: Position, index: number) => {
      letterGrid[position.y][position.x] = this.initialString.charAt(index)
    })

    return this.getStringFromGrid(letterGrid)
  }

  decode(): string {
    const letterGrid: Grid = this.getGridFromString(this.initialString)
    let newString: string = ''

    this.getAllZeroPositions().forEach((position: Position) => {
      newString += letterGrid[position.y][position.x]
    })

    return newString
  }

  private getAllZeroPositions(): Position[] {
    const grid1: Grid = [...this.grid]
    const grid2: Grid = this.getVerticalMirrorOfGrid(grid1)
    const grid3: Grid = this.getHorizontalMirrorOfGrid(grid2)
    const grid4: Grid = this.getVerticalMirrorOfGrid(grid3)

    return [
      ...this.getPositionsOfZerosInGrid(grid1),
      ...this.getPositionsOfZerosInGrid(grid2),
      ...this.getPositionsOfZerosInGrid(grid3),
      ...this.getPositionsOfZerosInGrid(grid4),
    ]
  }

  private getVerticalMirrorOfGrid(grid: Grid): Grid {
    const mirror: Grid = this.createEmptyGrid()

    for (let y: number = 0; y < this.height; y++) {
      for (let x: number = 0; x < this.width; x++) {
        mirror[y][x] = grid[y][this.width - 1 - x]
      }
    }

    return mirror
  }

  private getHorizontalMirrorOfGrid(grid: Grid): Grid {
    const mirror: Grid = this.createEmptyGrid()

    for (let y: number = 0; y < this.height; y++) {
      for (let x: number = 0; x < this.width; x++) {
        mirror[y][x] = grid[this.height - 1 - y][x]
      }
    }

    return mirror
  }

  private getPositionsOfZerosInGrid(grid: Grid): Position[] {
    const positions: Position[] = []

    for (let y: number = 0; y < this.height; y++) {
      for (let x: number = 0; x < this.width; x++) {
        if (grid[y][x] === EMPTY_GRID_CELL) {
          positions.push({ x, y })
        }
      }
    }

    return positions
  }

  private getStringFromGrid(grid: Grid): string {
    let buildedString: string = ''

    grid.forEach((line: string[]) => line.forEach((letter: string) => {
      buildedString += letter
    }))

    return buildedString
  }

  private getGridFromString(initialString: string): Grid {
    const newGrid: Grid = this.createEmptyGrid()

    let step: number = 0

    for (let y: number = 0; y < this.height; y++) {
      for (let x: number = 0; x < this.width; x++) {
        newGrid[y][x] = initialString.charAt(step)
        step += 1
      }
    }

    return newGrid
  }

  private createEmptyGrid(): Grid {
    const newGrid: Grid = []

    for (let y: number = 0; y < this.height; y++) {
      newGrid.push([])
      for (let x: number = 0; x < this.width; x++) {
        newGrid[y].push('')
      }
    }

    return newGrid
  }
}

function mainGrid(): void {
  const grid: Grid = [
    [FULLY_GRID_CELL, EMPTY_GRID_CELL, FULLY_GRID_CELL, FULLY_GRID_CELL],
    [EMPTY_GRID_CELL, FULLY_GRID_CELL, FULLY_GRID_CELL, FULLY_GRID_CELL],
    [FULLY_GRID_CELL, EMPTY_GRID_CELL, FULLY_GRID_CELL, FULLY_GRID_CELL],
    [FULLY_GRID_CELL, FULLY_GRID_CELL, FULLY_GRID_CELL, EMPTY_GRID_CELL],
  ]

  const encodedWords: string[] = [
    // 'еаутберрлаождьаж',
		// 'раетбьовсбивияар',
		// 'памтбиликднаоасо',
		// 'варибйаисервояшр',
		// 'таребсрокемиеичр',
		// 'оаребспокесикичр',
		// 'тагсбкиеиинчейео',
		'оакшбивтслиарьва',
		// 'наисбкициоисойтл',
		// 'вадибйаисорвояшр',
		// 'ватибйаисррвояшю',
		// 'ыапнвншритолмкео',
		// 'ларввщиеитгрукоо',
		// 'карнвнцеытдиуйоо',
  ]

  encodedWords.forEach((encodedWord: string) => {
    const decoded: string = new GridCipherEncoder(encodedWord, grid).decode()
    const encoded: string = new GridCipherEncoder(decoded, grid).encode()

    console.log('Решетка')
    console.log('')
    console.log(grid)
    console.log('')
    console.log(`Исходная фраза '${ encodedWord }'`)
    console.log('')
    console.log(`Расшифровка    '${ decoded }'`)
    console.log('')
    console.log(`Проверка       '${ encoded }'`)
  })
}

mainGrid()
