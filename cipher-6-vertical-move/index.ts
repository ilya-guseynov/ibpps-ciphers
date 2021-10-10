class VercticalMoveCipherEncoder {
  private initialString: string
  private key: string

  constructor(initialString: string, key: string) {
    this.initialString = initialString
    this.key = key
  }

  encode(): string {
    return this.encodeStringFromMatrix(
      this.encodeMatrix(
        this.createMatrixFromString(this.initialString, this.key),
        this.key,
      )
    )
  }

  decode(): string {
    return this.decodeStringFromMatrix(
      this.decodeMatrix(
        this.createMatrixFromString2(this.initialString, this.key),
        this.key,
      )
    )
  }

  private encodeMatrix(matrix: string[][], key: string): string[][] {
    const newMatrix: string[][] = []

    matrix.forEach((horizontalLine: string[]) => {
      const newHorizontalLine: string[] = []

      key.split("").map((numberLetter: string) => Number(numberLetter)).forEach((horizontalIndex: number, index: number) => {
        newHorizontalLine[horizontalIndex] = horizontalLine[index]
      })

      newMatrix.push(newHorizontalLine)
    })

    return newMatrix
  }

  private decodeMatrix(matrix: string[][], key: string): string[][] {
    const newMatrix: string[][] = []

    matrix.forEach((horizontalLine: string[]) => {
      const newHorizontalLine: string[] = []

      key.split("").map((numberLetter: string) => Number(numberLetter)).forEach((horizontalIndex: number, index: number) => {
        newHorizontalLine[index] = horizontalLine[horizontalIndex]
      })

      newMatrix.push(newHorizontalLine)
    })

    return newMatrix
  }

  private createMatrixFromString(initialString: string, key: string): string[][] {
    let matrix: string[][] = [[]]

    initialString.split("").forEach((letter: string) => {
      if (matrix[matrix.length - 1].length === key.split("").length) {
        matrix.push([])
      }

      matrix[matrix.length - 1].push(letter)
    })

    while (matrix[matrix.length - 1].length < key.split("").length) {
      matrix[matrix.length - 1].push("_")
    }

    return matrix
  }

  private createMatrixFromString2(initialString: string, key: string): string[][] {
    let matrix: string[][] = [[],[],[]]

    let step = 0
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 3; y++) {
        matrix[y][x] = initialString.charAt(step)
        step++
      }
    }

    return matrix
  }

  private encodeStringFromMatrix(matrix: string[][]): string {
    let createdString: string = ""

    for (let x = 0; x < matrix[0].length; x++) {
      for (let y = 0; y < matrix.length; y++) {
        createdString += matrix[y][x]
      }
    }

    return createdString
  }

  private decodeStringFromMatrix(matrix: string[][]): string {
    let createdString: string = ""

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
          createdString += matrix[y][x]
      }
    }

    return createdString
  }
}

function mainVerticalMove(): void {
  const key: string = "87643521"
  const key2: string = "76532410"
  const phrase: string = "ЭтоОченьСложныйШифр"

  const encoded: string = new VercticalMoveCipherEncoder(phrase, key2).encode()
  const decoded: string = new VercticalMoveCipherEncoder(encoded, key2).decode()

  console.log(`Ключ "${ key }"`)
  console.log(`Фраза "${ phrase }"`)
  console.log(`Зашифровано "${ encoded }"`)
  console.log(`Расшифровано "${ decoded }"`)
}
mainVerticalMove()