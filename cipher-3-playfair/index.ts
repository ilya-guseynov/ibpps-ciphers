const ALPHABET: string = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЭЮЯ'

function generateMatrix(key: string): string[][] {
  const matrix: string[][] = [[]]

  key.split("").forEach((keyLetter: string) => {
    if (matrix[matrix.length - 1].length === 6) {
      matrix.push([])
    }

    matrix[matrix.length - 1].push(keyLetter)
  })

  ALPHABET.split("").forEach((alphabetLetter: string) => {
    if (matrix[matrix.length - 1].length === 6) {
      matrix.push([])
    }

    if (key.split("").includes(alphabetLetter)) {
      return
    }

    matrix[matrix.length - 1].push(alphabetLetter)
  })

  return matrix
}

function rotateMatrix(matrix: string[][]): string[][] {
  const rotatedMatrix: string[][] = [[]]

  for (let i: number = 0; i < matrix[0].length; i++) {
    for (let j: number = 0; j < matrix.length; j++) {
      rotatedMatrix[rotatedMatrix.length - 1].push(matrix[j][i])
    }

    if (i !== matrix[0].length - 1) {
      rotatedMatrix.push([])
    }
  }

  return rotatedMatrix
}

function removeWhitespaces(initialString: string): string {
  return initialString.split(" ").join("")
}

function divideIntoTwoLettersList(initialString: string): string[] {
  const twoLettersList: string[] = []
  let selectedLetters: string[] = []

  initialString.split("").forEach((letter: string) => {
    selectedLetters.push(letter)

    if (selectedLetters.length === 2) {
      twoLettersList.push([...selectedLetters].join(""))
      selectedLetters = []
    }
  })

  return twoLettersList
}

function getNextRoundedIndex(listSize: number, index: number): number {
  return index === listSize - 1 ? 0 : index + 1
}

function getPreviousRoundedIndex(listSize: number, index: number): number {
  return index === 0 ? listSize - 1 : index - 1
}

function encodeTwoLettersBlock(twoLetterBlock: string, matrix: string[][]): string {
  const firstLetter: string = twoLetterBlock.split("")[0]
  const secondLetter: string = twoLetterBlock.split("")[1]

  let newFirstLetter: string = '-'
  let newSecondLetter: string = '-'

  matrix.forEach((matrixHorizontalLine: string[]) => {
    if (matrixHorizontalLine.includes(firstLetter) && matrixHorizontalLine.includes(secondLetter)) {
      newFirstLetter = matrixHorizontalLine[getNextRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(firstLetter))]
      newSecondLetter = matrixHorizontalLine[getNextRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(secondLetter))]
    }
  })

  rotateMatrix(matrix).forEach((matrixHorizontalLine: string[]) => {
    if (matrixHorizontalLine.includes(firstLetter) && matrixHorizontalLine.includes(secondLetter)) {
      newFirstLetter = matrixHorizontalLine[getNextRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(firstLetter))]
      newSecondLetter = matrixHorizontalLine[getNextRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(secondLetter))]
    }
  })

  let firstLetterX: number = -1
  let firstLetterY: number = -1
  let secondLetterX: number = -1
  let secondLetterY: number = -1

  matrix.forEach((matrixXLine: string[], matrixY: number) => {
    matrixXLine.forEach((matrixLetter: string, matrixX: number) => {
      if (matrixLetter === firstLetter) {
        firstLetterX = matrixX
        firstLetterY = matrixY
      }

      if (matrixLetter === secondLetter) {
        secondLetterX = matrixX
        secondLetterY = matrixY
      }
    })
  })

  if (newFirstLetter === "-" && newSecondLetter === "-") {
    newFirstLetter = matrix[firstLetterY][secondLetterX]
    newSecondLetter = matrix[secondLetterY][firstLetterX]
  }

  return `${ newFirstLetter }${ newSecondLetter }`
}

function decodeTwoLettersBlock(twoLetterBlock: string, matrix: string[][]): string {
  const firstLetter: string = twoLetterBlock.split("")[0]
  const secondLetter: string = twoLetterBlock.split("")[1]

  let newFirstLetter: string = '-'
  let newSecondLetter: string = '-'

  matrix.forEach((matrixHorizontalLine: string[]) => {
    if (matrixHorizontalLine.includes(firstLetter) && matrixHorizontalLine.includes(secondLetter)) {
      newFirstLetter = matrixHorizontalLine[getPreviousRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(firstLetter))]
      newSecondLetter = matrixHorizontalLine[getPreviousRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(secondLetter))]
    }
  })

  rotateMatrix(matrix).forEach((matrixHorizontalLine: string[]) => {
    if (matrixHorizontalLine.includes(firstLetter) && matrixHorizontalLine.includes(secondLetter)) {
      newFirstLetter = matrixHorizontalLine[getPreviousRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(firstLetter))]
      newSecondLetter = matrixHorizontalLine[getPreviousRoundedIndex(matrixHorizontalLine.length, matrixHorizontalLine.indexOf(secondLetter))]
    }
  })

  let firstLetterX: number = -1
  let firstLetterY: number = -1
  let secondLetterX: number = -1
  let secondLetterY: number = -1

  matrix.forEach((matrixXLine: string[], matrixY: number) => {
    matrixXLine.forEach((matrixLetter: string, matrixX: number) => {
      if (matrixLetter === firstLetter) {
        firstLetterX = matrixX
        firstLetterY = matrixY
      }

      if (matrixLetter === secondLetter) {
        secondLetterX = matrixX
        secondLetterY = matrixY
      }
    })
  })

  if (newFirstLetter === "-" && newSecondLetter === "-") {
    newFirstLetter = matrix[firstLetterY][secondLetterX]
    newSecondLetter = matrix[secondLetterY][firstLetterX]
  }

  return `${ newFirstLetter }${ newSecondLetter }`
}

function encode(initialString: string, key: string): string {
  return divideIntoTwoLettersList(
    removeWhitespaces(initialString)
      .split("")
        .map((letter: string) => {
          if (letter === "Й") {
            return "И"
          } else if (letter === "Ь") {
            return "Ъ"
          } else if (letter === "Ё") {
            return "Е"
          }
          return letter
        })
        .join("")
    )
    .map(
      (twoLetterBlock: string) => encodeTwoLettersBlock(twoLetterBlock, generateMatrix(key))
    )
    .join("")
}

function decode(initialString: string, key: string): string {
  return divideIntoTwoLettersList(
    removeWhitespaces(initialString)
      .split("")
        .map((letter: string) => {
          if (letter === "Й") {
            return "И"
          } else if (letter === "Ь") {
            return "Ъ"
          } else if (letter === "Ё") {
            return "Е"
          }
          return letter
        })
        .join("")
    )
    .map(
      (twoLetterBlock: string) => decodeTwoLettersBlock(twoLetterBlock, generateMatrix(key))
    )
    .join("")
}

function mainPlayfair(): void {
  const initalPhrase: string = 'ШИФР ПЛЕЙФЕРА ИСПОЛЬЗУЕТ МАТРИЦУ СОДЕРЖАЩУЮ КЛЮЧЕВОЕ СЛОВО'
  const initalEncodedPhrase: string = 'РСЕЭЖРТРЦЕГМИВДБЩЗЖРЛИМАОГЗЫЖБЗГЗСКЮОГЛИРЖИБГТГЖПЛОНВБОФЖЯ'
  const key: string = 'ЗАМОК'

  console.log(`Ключ                        = ${ key }`)

  console.log('')

  console.log(`Исходная фраза              = ${ initalPhrase }`)
  console.log(`Зашифрованная               = ${ encode(initalPhrase, key) }`)
  console.log(`Расшифрованная обратно      = ${ decode(encode(initalPhrase, key), key) }`)

  console.log('')

  console.log(`Исходная зашифрованая фраза = ${ initalEncodedPhrase }`)
  console.log(`Расшифрованная              = ${ decode(initalEncodedPhrase, key) }`)
  console.log(`Зашифрованная обратно       = ${ encode(decode(initalEncodedPhrase, key), key) }`)
}

mainPlayfair()