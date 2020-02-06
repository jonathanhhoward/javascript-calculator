export default function calculate (expressionString) {
  const reNumberOrOperator = /(?:\d+(?:\.\d*)?(?:e[-+]\d+)?)|[-+*/=]/g
  const tokenArray = expressionString.match(reNumberOrOperator)

  return expression()

  /*
  The following code has been adapted for JavaScript from:
      Bjarne Stroustrup, "Programming: Principles and Practice Using C++"
      Second Edition (Pearson Education, Inc., 2014).
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
        case '/':
          const d = primary()
          if (d === 0) throw new Error('divide by zero')
          left /= d
          token = tokenArray.shift()
          break
        default:
          tokenArray.unshift(token)
          return left
      }
    }
  }

  function primary () {
    const token = tokenArray.shift()
    if (token === '-') return -primary()

    const result = Number(token)
    if (Number.isNaN(result)) throw new Error('primary expected')

    return result
  }
}
