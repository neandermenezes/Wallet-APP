import React from 'react';

import Header from '../ReactComponents/Header';
import FormExpenses from '../ReactComponents/FormExpenses';
import ExpensesTable from '../ReactComponents/ExpensesTable';

class Wallet extends React.Component {
  render() {
    const display = (
      <>
        <Header />
        <FormExpenses />
        <ExpensesTable />
      </>
    );
    return display;
  }
}

export default Wallet;
