// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, DELETE_ITEM } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, expenses, id }) => {
  switch (type) {
  case ADD_EXPENSE:
    delete expenses.currencies;
    return { ...state, expenses: [...state.expenses, expenses] };
  case DELETE_ITEM:
    return { ...state, expenses: state.expenses.filter((curr) => curr.id !== id) };
  default:
    return state;
  }
};

export default wallet;
