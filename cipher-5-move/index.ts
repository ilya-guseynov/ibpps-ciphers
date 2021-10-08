class DoubleMoveEncoder {
  private EMPTY: string = "EMPTY"
  private initialString: string
  private horizontalKey: string
  private verticalKey: string
  private horizontalSize: number
  private verticalSize: number

  constructor (initialString: string, horizontalKey: string, verticalKey: string) {
    this.initialString = this.prepareString(initialString)
    this.horizontalKey = horizontalKey
    this.horizontalSize = this.horizontalKey.split("").length
    this.verticalKey = verticalKey
    this.verticalSize = this.verticalKey.split("").length
  }

  encode(): string {
    const matrix: string[][] = this.createMatrixFromString(
      this.initialString,
      this.horizontalSize,
      this.verticalSize,
    )

    const movedMatrix: string[][] = this.moveMatrix(
      matrix,
      this.horizontalKey,
      this.horizontalSize,
      this.verticalKey,
      this.verticalSize,
    )

    return this.createStringFromMatrix(movedMatrix)
  }

  decode(): string {
    const matrix: string[][] = this.createMatrixFromString(
      this.initialString,
      this.horizontalSize,
      this.verticalSize,
    )

    const movedBackMatrix: string[][] = this.moveMatrixBack(
      matrix,
      this.horizontalKey,
      this.horizontalSize,
      this.verticalKey,
      this.verticalSize,
    )

    return this.createStringFromMatrix(movedBackMatrix)
  }

  private createMatrixFromString(initialString: string, horizontalSize: number, verticalSize: number): string[][] {
    const matrix: string[][] = []
    const initialStringLetters: string[] = [...initialString.split("").reverse()]

    for (let verticalIndex: number = 0; verticalIndex < verticalSize; verticalIndex++) {
      matrix.push([])
      for (let horizontalIndex: number = 0; horizontalIndex < horizontalSize; horizontalIndex++) {
        const nextLetter: string | undefined = initialStringLetters.pop()
        if (nextLetter === undefined) {
          matrix[matrix.length - 1].push(this.EMPTY)
        } else {
          matrix[matrix.length - 1].push(nextLetter)
        }
      }
    }

    return matrix
  }

  private createStringFromMatrix(matrix: string[][]): string {
    let createdString: string = ""

    matrix.forEach((horizontalLine: string[]) => {
      horizontalLine
        .map((letter: string) => {
          return letter === this.EMPTY ? "_" : letter
        })
        .forEach((letter: string) => {
          createdString += letter
        })
    })

    return createdString
  }

  private moveMatrix(matrix: string[][], horizontalKey: string, horizontalSize: number, verticalKey: string, verticalSize: number): string[][] {
    let movedMatrix: string[][] = [...matrix]

    movedMatrix = movedMatrix.map((horizontalLine: string[]) => {
      const newHorizontalLine: string[] = []

      horizontalKey.split("").map((numberLetter: string) => Number(numberLetter)).forEach((horizontalIndex: number) => {
        newHorizontalLine.push(horizontalLine[horizontalIndex - 1])
      })

      return newHorizontalLine
    })

    const newMovedMatrix: string[][] = []

    verticalKey.split("").map((numberLetter: string) => Number(numberLetter)).forEach((verticalIndex: number) => {
      newMovedMatrix.push(movedMatrix[verticalIndex - 1])
    })

    return newMovedMatrix
  }

  private moveMatrixBack(matrix: string[][], horizontalKey: string, horizontalSize: number, verticalKey: string, verticalSize: number): string[][] {
    let movedMatrix: string[][] = []

    verticalKey.split("").map((numberLetter: string) => Number(numberLetter)).forEach((verticalIndex: number, index: number) => {
      movedMatrix[verticalIndex - 1] = matrix[index]
    })

    movedMatrix = movedMatrix.map((horizontalLine: string[]) => {
      const newHorizontalLine: string[] = []

      horizontalKey.split("").map((numberLetter: string) => Number(numberLetter)).forEach((horizontalIndex: number, index) => {
        newHorizontalLine[horizontalIndex] = horizontalLine[index]
      })

      return newHorizontalLine
    })

    return movedMatrix
  }

  private prepareString(initialString: string): string {
    return initialString.
      split("")
      .map((letter: string) => {
        if (letter === " ") {
          return "_"
        } else {
          return letter
        }
      })
      .join("")
  }
}

function mainMove(): void {
  const horizontalKey: string = "14523"
  const verticalKey: string = "52431"

  const initialString: string = "от заката до рассвета"
  const initialStringEncoded: string = new DoubleMoveEncoder(initialString, horizontalKey, verticalKey).encode()
  const initialStringEncodedDecoded: string = new DoubleMoveEncoder(new DoubleMoveEncoder(initialString, horizontalKey, verticalKey).encode(), horizontalKey, verticalKey).decode()

  const initialEncodedString: string = "тенелйри_пазирам_зерДноур"
  const initialEncodedStringDecoded: string = new DoubleMoveEncoder(initialEncodedString, horizontalKey, verticalKey).decode()
  const initialEncodedStringDecodedEncoded: string = new DoubleMoveEncoder(new DoubleMoveEncoder(initialEncodedString, horizontalKey, verticalKey).decode(), horizontalKey, verticalKey).encode()


  console.log(`Ключ для столбцов = ${ verticalKey }`)
  console.log(`Ключ для строк = ${ horizontalKey }`)
  console.log(`Исходная фраза = "${ initialString }", Зашифрованная = "${ initialStringEncoded }", Расшифрованная = "${ initialStringEncodedDecoded }"`)
  console.log(`Исходная фраза = "${ initialEncodedString }", Расшифрованная = "${ initialEncodedStringDecoded }", Зашифрованная = "${ initialEncodedStringDecodedEncoded }"`)
}

mainMove()