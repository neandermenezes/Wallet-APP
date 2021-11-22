import getCoins from '../services/api';

// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const BEGIN_EDIT = 'BEGIN_EDIT';
export const FINISH_EDIT = 'FINISH_EDIT';

export const actionUserLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

export const actionExpenses = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const actionAddExpense = (obj) => async (dispatch) => {
  const result = await getCoins();
  const finalObject = { ...obj, exchangeRates: result };
  dispatch(actionExpenses(finalObject));
};

export const actionDeleteItem = (id) => ({
  type: DELETE_ITEM,
  id,
});

export const actionBeginEdit = (editId) => ({
  type: BEGIN_EDIT,
  editId,
});

export const actionFinishEdit = (editedObj) => ({
  type: FINISH_EDIT,
  editedObj,
});
