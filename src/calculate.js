/*
This code has been adapted with only minor changes from:
    Bjarne Stroustrup, "Programming: Principles and Practice Using C++"
    Second Edition (Pearson Education, Inc., 2014).

The grammar for input is:

Expression:
  Term
  Expression + Term
  Expression - Term
Term:
  Primary
  Term * Primary
  Term / Primary
Primary:
  Number
  - Primary
Number:
  floating-point-literal
 */

export default function calculate (expressionString) {
  let tokenArray = expressionString
    .split(/((?<!e)[+\-*/=])/)
    .filter(elem => elem !== '')

  const result = expression()

  return setPrecision(result, 10)

  function setPrecision (number, significantDigits) {
    const precise = number.toPrecision(significantDigits)

    if ((-1e10 < number) && (number < 1e10)) {
      return Number(precise).toString()
    } else {
      return precise
    }
  }

  // deal with + and -
  function expression () {
    let left = term()
    let token = tokenArray.shift()

    while (true) {
      switch (token) {
        case '+':
          left += term()
          token = tokenArray.shift()
          break
        case '-':
          left -= term()
          token = tokenArray.shift()
          break
        case '=':
          return left
        default:
          throw new Error('expression error')
      }
    }
  }

  // deal with * and /
  function term () {
    let left = primary()
    let token = tokenArray.shift()

    while (true) {
      switch (token) {
        case '*':
          left *= primary()
          token = tokenArray.shift()
          break
        case '/': {
          let d = primary()
          if (d === 0) {
            throw new Error('divide by zero')
          }
          left /= d
          token = tokenArray.shift()
          break
        }
        default:
          tokenArray.unshift(token)
          return left
      }
    }
  }

  // deal with numbers and unary minus
  function primary () {
    let token = tokenArray.shift()
    if (token === '-') {
      return -primary()
    } else if (!Number.isNaN(token)) {
      return Number(token)
    } else {
      throw new Error('primary expected')
    }
  }
}
