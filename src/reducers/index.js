import { getResult, initialState } from '../utils';
import { expressionReducer } from './expression';
import { inputReducer } from './input';
import { statusReducer } from './status';

/**
 * @param {{expression: string, input: string, status: string}} state
 * @param {{ type: string, payload: string }} action
 * @return {{expression: string, input: string, status: string}}
 */
export function reducer(state, action) {
  switch (action.type) {
    case 'clear':
      return initialState;
    case 'get-result':
      return getResult(state);
    default:
      return {
        expression: expressionReducer(state, action),
        input: inputReducer(state.input, action),
        status: statusReducer(state.status, action),
      };
  }
}
