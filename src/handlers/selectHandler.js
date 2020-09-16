import handleClear from './handleClear';
import handleDelete from './handleDelete';
import handleEquals from './handleEquals';
import handleOperator from './handleOperator';
import handleDecimal from './handleDecimal';
import handleDigit from './handleDigit';
import * as KEY from '../modules/key-constants';

function selectHandler(state, value) {
  switch (value) {
    case KEY.CLEAR:
      return handleClear();
    case KEY.DELETE:
      return handleDelete(state);
    case KEY.EQUALS:
      return handleEquals(state, value);
    case KEY.ADD:
    case KEY.SUBTRACT:
    case KEY.MULTIPLY:
    case KEY.DIVIDE:
      return handleOperator(state, value);
    case KEY.DECIMAL:
      return handleDecimal(state, value);
    default:
      return handleDigit(state, value);
  }
}

export default selectHandler;
