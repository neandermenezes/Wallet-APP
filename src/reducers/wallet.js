// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, BEGIN_EDIT, DELETE_ITEM, FINISH_EDIT } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  isEditing: false,
  editTarget: {},
  editingId: -1,
};

const wallet = (
  state = INITIAL_STATE,
  { type, expenses, id, editId, editedObj },
) => {
  switch (type) {
  case ADD_EXPENSE:
    delete expenses.currencies;
    return { ...state, expenses: [...state.expenses, expenses] };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: state.expenses.filter((curr) => curr.id !== id),
    };
  case BEGIN_EDIT:
    return {
      ...state,
      isEditing: true,
      editTarget: state.expenses.find((expense) => expense.id === editId),
      editingId: editId,
    };
  case FINISH_EDIT: {
    const updateObj = {
      ...editedObj,
      id: state.editingId,
      exchangeRates: state.expenses[state.editingId].exchangeRates,
    };
    delete updateObj.currencies;
    const newExpenses = state.expenses
      .map((expense) => (expense.id === updateObj.id ? updateObj : expense));
    return {
      ...state,
      expenses: newExpenses,
      editTarget: {},
      isEditing: false,
      editingId: -1,
    };
  }
  default:
    return state;
  }
};

export default wallet;
