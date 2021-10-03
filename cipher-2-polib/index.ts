class PolibCipherEncoder {
  private KEY: string[][] = [
    ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
    ['Ё', 'Ж', 'З', 'И', 'Й', 'К'],
    ['Л', 'М', 'Н', 'О', 'П', 'Р'],
    ['С', 'Т', 'У', 'Ф', 'Х', 'Ц'],
    ['Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь'],
    ['Э', 'Ю', 'Я', '_', '-', '='],
  ]
  private initialString: string

  constructor(initialString: string) {
    this.initialString = initialString
  }

  encode1(): string {
    const numbers: string[] = []
    const charStr: string[] = this.initialString.split("")

    charStr.forEach((_, charCount: number) => {
      this.KEY.forEach((_, i: number) => {
        this.KEY[i].forEach((_, j: number) => {
          if (charStr[charCount] === this.KEY[i][j]) {
            numbers.push(`${ i + 1 }${ j }`)
          }
        })
      })
    })

    return this.doEncryption(numbers)
  }

  encode2(): string {
    let horizon: number[] = []
    let vertical: number[] = []
    let numbers: string[] = []
    let rawNum: string = ""
    let charStr: string[] = this.initialString.split("")

    charStr.forEach((_, charCount: number) => {
      this.KEY.forEach((_, i: number) => {
        this.KEY[i].forEach((_, j: number) => {
          if (charStr[charCount] === this.KEY[i][j]) {
            horizon.push(i)
            vertical.push(j)
          }
        })
      })
    })

    horizon.forEach((_, i) => {
      rawNum += horizon[i]
    })

    vertical.forEach((_, i) => {
      rawNum += vertical[i]
    })

    for (let i = 0; i < rawNum.split("").length; i += 2) {
      const s = rawNum.substring(i, i + 2)
      numbers.push(s)
    }

    return this.doEncryption(numbers)
  }

  encode3(): string {
    const horizon: number[] = []
    const vertical: number[] = []
    const numbers: string[] = []
    let rawNum: string = ""
    const charStr: string[] = this.initialString.split("")

    charStr.forEach((_, charCount) => {
      this.KEY.forEach((_, i: number) => {
        this.KEY[i].forEach((_, j: number) => {
          if (charStr[charCount] === this.KEY[i][j]) {
            horizon.push(i)
            vertical.push(j)
          }
        })
      })
    })

    horizon.forEach((_, i) => {
      rawNum += horizon[i]
    })

    vertical.forEach((_, i) => {
      rawNum += vertical[i]
    })

    const ch = rawNum.split("")[0]
    rawNum = `${rawNum.substring(1)}${ch}`

    for (let i = 0; i < rawNum.split("").length; i += 2) {
      const s = rawNum.substring(i, i + 2)
      numbers.push(s)
    }

    return this.doEncryption(numbers)
  }

  decode1(): string {
    const numbers: string[] = []
    const charStr: string[] = this.initialString.split("")

    charStr.forEach((_, charCount) => {
      this.KEY.forEach((_, i: number) => {
        this.KEY[i].forEach((_, j: number) => {
          if (charStr[charCount] === this.KEY[i][j]) {
            let stolb: number

            if (i - 1 === -1) {
              stolb = 5
            } else {
              stolb = i - 1
            }

            numbers.push(`${stolb}${j}`)
          }
        })
      })
    })

    return this.doEncryption(numbers)
  }

  decode2(): string {
    const numbers: string[] = []
    let rawNum: string = ""
    const charStr: string[] = this.initialString.split("")

    charStr.forEach((_, charCount: number) => {
      this.KEY.forEach((_, i: number) => {
        this.KEY[i].forEach((_, j: number) => {
          if (charStr[charCount] === this.KEY[i][j]) {
            rawNum += `${i}${j}`
          }
        })
      })
    })

    const horizon: string[] = rawNum.substring(0, rawNum.split("").length / 2).split("")
    const vertical: string[] = rawNum.substring(rawNum.split("").length / 2).split("")

    horizon.forEach((_, i: number) => {
      const s: string = `${horizon[i]}${vertical[i]}`
      numbers.push(s)
    })

    return this.doEncryption(numbers)
  }

  decode3(): string {
    const numbers: string[] = []
    let rawNum: string = ""
    const charStr: string[] = this.initialString.split("")

    charStr.forEach((_, charCount: number) => {
      this.KEY.forEach((_, i: number) => {
        this.KEY[i].forEach((_, j: number) => {
          if (charStr[charCount] === this.KEY[i][j]) {
            rawNum += `${i}${j}`
          }
        })
      })
    })

    const ch: string = rawNum.split("")[rawNum.split("").length - 1]
    rawNum = `${ch}${rawNum.substring(0, rawNum.split("").length - 1)}`

    const horizon: string[] = rawNum.substring(0, rawNum.split("").length / 2).split("")
    const vertical: string[] = rawNum.substring(rawNum.split("").length / 2).split("")

    horizon.forEach((_, i: number) => {
      const s: string = `${horizon[i]}${vertical[i]}`
      numbers.push(s)
    })

    return this.doEncryption(numbers)
  }

  private doEncryption(numbers: string[]): string {
    let enc: string = ""

    numbers.forEach((number: string) => {
      let i: number = +number.split("")[0]
      let j: number = +number.split("")[1]

      if (i === 6) {
        i = 0
      }

      enc += `${ this.KEY[i][j] }`
    })

    return enc
  }
}

function main(): void {
  const initialPhrase: string = "ОТРАССВЕТАДОЗАКАТА"
  const initialEncodedPharse: string = "НОУЁЗУЪЮГЖХБЛХ_БУБЗ=ВУАСЕНЮ"

  console.log(`Исходная фраза =  ${ initialPhrase }`)
  console.log(`Первый метод   => ${ new PolibCipherEncoder(initialPhrase).encode1() }`)
  console.log(`Второй метод   => ${ new PolibCipherEncoder(initialPhrase).encode2() }`)
  console.log(`Третий метод   => ${ new PolibCipherEncoder(initialPhrase).encode3() }`)

  console.log("")

  console.log(`Исходная зашифрованная фраза =  ${ initialEncodedPharse }`)
  console.log(`Первый метод   => ${ new PolibCipherEncoder(initialEncodedPharse).decode1() }`)
  console.log(`Второй метод   => ${ new PolibCipherEncoder(initialEncodedPharse).decode2() }`)
  console.log(`Третий метод   => ${ new PolibCipherEncoder(initialEncodedPharse).decode3() }`)
}

main()
