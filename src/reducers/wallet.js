// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, expenses }) => {
  switch (type) {
  case ADD_EXPENSE:
    delete expenses.currencies;
    return { ...state, expenses: [...state.expenses, expenses] };
  default:
    return state;
  }
};

export default wallet;
