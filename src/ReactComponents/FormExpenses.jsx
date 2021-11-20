import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAddExpense } from '../actions';
import getCoins from '../services/api';

class FormExpenses extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.fetchCoins = this.fetchCoins.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      currencies: ['USD'],
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount() {
    this.fetchCoins();
  }

  async fetchCoins() {
    const coins = await getCoins();
    this.setState({ currencies: Object.keys(coins) });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async submitForm() {
    const { id } = this.state;
    const { expenses } = this.props;
    let expense = this.state;
    expense = { ...expense, id };
    this.setState((prev) => ({ id: prev.id + 1 }));
    expenses(expense);
  }

  display() {
    const { value, description, currencies } = this.state;
    const { handleChange } = this;
    return (
      <>
        <input
          type="number"
          placeholder="valor"
          name="value"
          value={ value }
          onChange={ handleChange }
          data-testid="value-input"
        />
        <input
          type="text"
          placeholder="descrição"
          value={ description }
          onChange={ handleChange }
          name="description"
          data-testid="description-input"
        />
        <select
          placeholder="moeda"
          name="currency"
          onChange={ handleChange }
          data-testid="currency-input"
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>
              {curr}
            </option>
          ))}
        </select>
      </>
    );
  }

  render() {
    const { method, tag } = this.state;
    const { handleChange, submitForm } = this;
    return (
      <form>
        { this.display() }
        <select
          value={ method }
          name="method"
          onChange={ handleChange }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          value={ tag }
          name="tag"
          onChange={ handleChange }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ submitForm }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenses: (obj) => dispatch(actionAddExpense(obj)),
});

FormExpenses.propTypes = {
  expenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormExpenses);
