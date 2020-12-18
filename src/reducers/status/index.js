/**
 * @param {string} status
 * @param {{ type: string, payload: string }} action
 * @return {string}
 */
export function statusReducer(status, action) {
  switch (action.type) {
    case 'operator-result':
    case 'operator-negative':
    case 'operator-operator':
    case 'operator-default':
      return 'OPERATOR';
    case 'operator-operator-negate':
      return 'NEGATIVE';
    case 'equals-negative':
    case 'equals-operator':
    case 'equals-default':
      return 'EQUALS';
    case 'digit-result':
    case 'digit-negative':
    case 'digit-operator':
    case 'digit-default-zero':
    case 'digit-default':
      return '';
    default:
      return status;
  }
}
