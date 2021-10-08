class VercticalMoveCipherEncoder {
  private initialString: string
  private key: string

  constructor(initialString: string, key: string) {
    this.initialString = initialString
    this.key = key
  }

  encode(): string {
    return this.createStringFromMatrix(
      this.encodeMatrix(
        this.createMatrixFromString(this.initialString, this.key),
        this.key,
      )
    )
  }

  decode(): string {
    return this.createStringFromMatrix(
      this.decodeMatrix(
        this.createMatrixFromString(this.initialString, this.key),
        this.key,
      )
    )
  }

  private encodeMatrix(matrix: string[][], key: string): string[][] {
    const newMatrix: string[][] = []

    matrix.forEach((horizontalLine: string[]) => {
      const newHorizontalLine: string[] = []

      key.split("").map((numberLetter: string) => Number(numberLetter)).forEach((horizontalIndex: number, index: number) => {
        newHorizontalLine[index] = horizontalLine[horizontalIndex - 1]
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
        newHorizontalLine[horizontalIndex - 1] = horizontalLine[index]
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

  private createStringFromMatrix(matrix: string[][]): string {
    let createdString: string = ""

    matrix.forEach((horizontalLine: string[]) => {
      horizontalLine.forEach((letter: string) => {
        createdString += letter
      })
    })

    return createdString
  }
}

function mainVerticalMove(): void {
  const key: string = "87643521"
  const phrase: string = "ЭтоОченьСложныйШифр"

  const encoded: string = new VercticalMoveCipherEncoder(phrase, key).encode()
  const decoded: string = new VercticalMoveCipherEncoder(encoded, key).decode()

  console.log(`Ключ "${ key }"`)
  console.log(`Фраза "${ phrase }"`)
  console.log(`Зашифровано "${ encoded }"`)
  console.log(`Расшифровано "${ decoded }"`)
}
mainVerticalMove()