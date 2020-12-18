/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {{ type: string, payload: string }} action
 * @return {string}
 */
export function expressionReducer(state, action) {
  const { expression, input } = state;

  switch (action.type) {
    case 'operator-operator-negate':
    case 'operator-default':
    case 'equals-default':
    case 'digit-negative':
    case 'digit-operator':
    case 'digit-default':
      return expression + action.payload;
    case 'operator-negative':
    case 'equals-negative':
      return expression.slice(0, -2) + action.payload;
    case 'operator-operator':
    case 'equals-operator':
    case 'digit-default-zero':
      return expression.slice(0, -1) + action.payload;
    case 'delete':
      return expression.slice(0, -input.length) + action.payload;
    case 'operator-result':
      return input + action.payload;
    case 'digit-result':
      return action.payload;
    default:
      return expression;
  }
}
