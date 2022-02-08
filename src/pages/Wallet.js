import React from 'react';

import Header from '../ReactComponents/Header';
import FormExpenses from '../ReactComponents/FormExpenses';
import ExpensesTable from '../ReactComponents/ExpensesTable';
import '../css/wallet.css';

class Wallet extends React.Component {
  render() {
    const display = (
      <div className="container">
        <Header />
        <FormExpenses />
        <ExpensesTable />
      </div>
    );
    return display;
  }
}

export default Wallet;
