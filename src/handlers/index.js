import handleClear from './handleClear';
import handleDelete from './handleDelete';
import handleEquals from './handleEquals';
import handleOperator from './handleOperator';
import handleDecimal from './handleDecimal';
import handleDigit from './handleDigit';
import { key } from '../utils';

/**
 * @param {{expression: string, input: string, status: string}} state
 * @param {string} value
 * @returns {{expression: string, input: string, status: string}}
 */
export function selectHandler(state, value) {
  switch (value) {
    case key.CLEAR:
      return handleClear();
    case key.DELETE:
      return handleDelete(state);
    case key.EQUALS:
      return handleEquals(state, value);
    case key.ADD:
    case key.SUBTRACT:
    case key.MULTIPLY:
    case key.DIVIDE:
      return handleOperator(state, value);
    case key.DECIMAL:
      return handleDecimal(state, value);
    default:
      return handleDigit(state, value);
  }
}
