import handleClear from "./handle-clear";
import handleDelete from "./handle-delete";
import handleEquals from "./handle-equals";
import handleOperator from "./handle-operator";
import handleDecimal from "./handle-decimal";
import handleDigit from "./handle-digit";
import * as KEY from "../modules/key-constants";

export default function selectHandler(state, value) {
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
