class VigenureCipherEncoder {
  private RUSSIAN_ALPHABET: string = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
  private initialString: string
  private key: string
  private initialStringKeyTransformed: string
  private vigenureMatrix: string[][]

  constructor(initialString: string, key: string) {
    this.initialString = this.prepareInitialString(initialString)
    this.key = this.prepareInitialString(key)
    this.initialStringKeyTransformed = this.createKeyTranformedString(this.initialString, this.key)
    this.vigenureMatrix = this.createVigenureMatrix(this.key)
  }

  encode(): string {
    let encodedString: string = ""

    this.initialString.split("").forEach((initialStringLetter: string, initialStringIndex: number) => {
      const horizontalIndex: number = this.RUSSIAN_ALPHABET.indexOf(initialStringLetter)
      const verticalIndex: number = this.initialStringKeyTransformed.indexOf(this.initialStringKeyTransformed[initialStringIndex]) + 1

      encodedString += this.vigenureMatrix[verticalIndex][horizontalIndex]
    })

    return encodedString
  }

  decode(): string {
    let encodedString: string = ""

    this.initialString.split("").forEach((initialStringLetter: string, initialStringIndex: number) => {
      const verticalIndex: number = this.initialStringKeyTransformed.indexOf(this.initialStringKeyTransformed[initialStringIndex]) + 1
      const horizontalIndex: number = this.vigenureMatrix[verticalIndex].indexOf(initialStringLetter)

      encodedString += this.vigenureMatrix[0][horizontalIndex]
    })

    return encodedString
  }

  private prepareInitialString(initialString: string): string {
    return initialString
      .toUpperCase()
      .split(" ")
      .map((letter: string) => letter === "Ё" ? "" : letter)
      .join("")
  }

  private createKeyTranformedString(initialString: string, key: string): string {
    let keyTransformedString: string = ""

    initialString.split("").forEach((_, initialStringLetterIndex: number) => {
      keyTransformedString += key.split("")[initialStringLetterIndex % key.length]
    })

    return keyTransformedString
  }

  private createVigenureMatrix(key: string): string[][] {
    const vigenureMatrix: string[][] = [[]]
    const horizontalLength = this.RUSSIAN_ALPHABET.length

    this.RUSSIAN_ALPHABET.split("").forEach((russianLetter: string) => {
      vigenureMatrix[0].push(russianLetter)
    })

    key.split("").forEach((keyLetter: string) => {
      vigenureMatrix.push([])
      vigenureMatrix[vigenureMatrix.length - 1].push(keyLetter)

      for (
        let russianLetterIndexWithOffset = this.RUSSIAN_ALPHABET.indexOf(keyLetter) + 1;
        russianLetterIndexWithOffset < this.RUSSIAN_ALPHABET.indexOf(keyLetter) + horizontalLength;
        russianLetterIndexWithOffset ++
      ) {
        vigenureMatrix[vigenureMatrix.length - 1].push(this.RUSSIAN_ALPHABET[russianLetterIndexWithOffset % this.RUSSIAN_ALPHABET.length])
      }
    })

    return vigenureMatrix
  }
}

function main(): void {
  const key: string = "Ницше"
  const initialPhrase: string = "от добра добра не ищут"
  const initialEncodedPhase: string = "ЪНИ ЗХТТЖШЦЪЦЯ ЗУПНЖНТЫЩИА ЖТП ЙЮЕЮХДБ ИШЫЧАТИ"

  console.log(`Ключ                                        "${ key }"`)

  console.log("")

  console.log(`Исходная фраза                              "${ initialPhrase }"`)
  console.log(`Зашифрованная исходная фраза                "${ new VigenureCipherEncoder(initialPhrase, key).encode() }"`)
  console.log(`Исходная фраза расшифрованная обратно       "${ new VigenureCipherEncoder(new VigenureCipherEncoder(initialPhrase, key).encode(), key).decode() }"`)

  console.log("")

  console.log(`Исходная зашифрованная фраза                "${ initialEncodedPhase }"`)
  console.log(`Зашифрованная исходная фраза расшифрованная "${ new VigenureCipherEncoder(initialEncodedPhase, key).decode() }"`)
  console.log(`Зашифрованная исходная фраза обратно        "${ new VigenureCipherEncoder(new VigenureCipherEncoder(initialEncodedPhase, key).decode(), key).encode() }"`)
}

main()