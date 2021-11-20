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
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currencies: [],
    };
  }

  componentDidMount() {
    this.fetchCoins();
  }

  async fetchCoins() {
    const coins = await getCoins();
    delete coins.USDT;
    this.setState({ currencies: Object.keys(coins) });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async submitForm() {
    const { id } = this.state;
    const { dispatchExpenses } = this.props;

    let expense = this.state;
    expense = { ...expense, id };
    this.setState((prev) => ({ id: prev.id + 1, value: 0 }));
    dispatchExpenses(expense);
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
        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
            name="currency"
            onChange={ handleChange }
            data-testid="currency-input"
          >
            {currencies.map((curr) => (
              <option key={ curr } data-testid={ curr } value={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
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
  dispatchExpenses: (obj) => dispatch(actionAddExpense(obj)),
});

FormExpenses.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormExpenses);
