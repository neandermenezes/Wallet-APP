import React from 'react';
import Header from '../ReactComponents/Header';
import FormExpenses from '../ReactComponents/FormExpenses';

class Wallet extends React.Component {
  render() {
    const display = (
      <>
        <Header />
        <FormExpenses />
      </>
    );
    return display;
  }
}

export default Wallet;
