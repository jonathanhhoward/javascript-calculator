import handleCLear from './handle-clear'
import handleDelete from './handle-delete'
import handleEquals from './handle-equals'
import handleOperator from './handle-operator'
import handleDecimal from './handle-decimal'
import handleDigit from './handle-digit'

export default function selectHandler (state, value) {
  switch (value) {
    case 'AC':
      return handleCLear()
    case 'C':
      return handleDelete(state)
    case '=':
      return handleEquals(state, value)
    case '+':
    case '-':
    case '*':
    case '/':
      return handleOperator(state, value)
    case '.':
      return handleDecimal(state, value)
    default:
      return handleDigit(state, value)
  }
}
