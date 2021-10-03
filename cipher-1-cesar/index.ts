class CesarEncoder {
  private RUSSIAN_ALPHABET: string = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
  private initialString: string
  private step: number

  constructor(initialString: string, step: number) {
    this.initialString = this.prepareInitalString(initialString)
    this.step = step
  }

  encode(): string {
    return this.initialString
      .split("")
      .map((letter: string) => this.getNextLetter(letter))
      .join("")
  }

  decode(): string {
    return this.initialString
      .split("")
      .map((letter: string) => this.getPreviousLetter(letter))
      .join("")
  }

  private getNextLetter(letter: string): string {
    return this.RUSSIAN_ALPHABET[(this.RUSSIAN_ALPHABET.indexOf(letter) + this.step) % this.RUSSIAN_ALPHABET.length]
  }

  private getPreviousLetter(letter: string): string {
    let previousLetterIndex: number = this.RUSSIAN_ALPHABET.indexOf(letter) - this.step

    if (previousLetterIndex < 0) {
      previousLetterIndex = this.RUSSIAN_ALPHABET.length + previousLetterIndex
    }

    return this.RUSSIAN_ALPHABET[previousLetterIndex]
  }

  private prepareInitalString(initialString: string): string {
    return initialString.toUpperCase().split(" ").join("")
  }
}

function mainCesar(): void {
  const initialPhrase: string = "истина не всегда обитает на дне колодца"
  const step: number = 18
  const initialEncodedPhase: string = "ЙШЩЗФЛЗЧЩФВЬСЧПЦЩХКЧЗЫПЮМШСПЬШПШЩМУЗЬПШЦХТГОЪМЩШЖХЛПФПЩХЩНМСТЕЮПЛТЖЯПЫЧХЙЗФПЖПЛТЖЧЗШЯПЫЧХЙСП"

  console.log(`Исходная фраза "${ initialPhrase }"`)

  console.log(`Зашифрованная исходная фраза  "${ new CesarEncoder(initialPhrase, step).encode() }"`)
  console.log(`Расшифрованная исходная фраза "${ new CesarEncoder(new CesarEncoder(initialPhrase, step).encode(), step).decode() }"`)

  console.log("")

  for (let checkStep: number = 0; checkStep <= 31; checkStep++) {
    console.log(`Расшифрованная исходная зашифрованная фраза "${ new CesarEncoder(initialEncodedPhase, checkStep).decode() }"`)
  }
}

mainCesar()
