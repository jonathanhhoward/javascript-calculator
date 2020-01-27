export default function calculate (expressionString) {
  const reNumberOrOperator = /(?:\d+(?:\.\d*)?(?:e[-+]\d+)?)|[-+*/=]/g
  const tokenArray = expressionString.match(reNumberOrOperator)

  return expression()

  /*
  The following code has been adapted with only minor changes from:
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

  function primary () {
    const token = tokenArray.shift()

    if (token === '-') return -primary()

    if (!Number.isNaN(token)) return Number(token)

    throw new Error('primary expected')
  }
}
