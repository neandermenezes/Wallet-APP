import getCoins from '../services/api';

// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';

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
