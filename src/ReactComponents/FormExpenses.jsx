/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAddExpense, actionFinishEdit } from '../actions';
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
        <label className="form-expenses__label" htmlFor="value">
          Valor
          <input
            id="value"
            type="number"
            placeholder="valor"
            className="form-expenses__input"
            name="value"
            value={ value }
            onChange={ handleChange }
            data-testid="value-input"
          />
        </label>
        <label className="form-expenses__label" htmlFor="description">
          Descrição
          <input
            id="description"
            type="text"
            placeholder="descrição"
            className="form-expenses__input"
            value={ description }
            onChange={ handleChange }
            name="description"
            data-testid="description-input"
          />
        </label>
        {currencies.length && (
          <label className="form-expenses__label" htmlFor="moeda">
            Moeda
            <select
              className="form-expenses__select"
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
        )}
      </>
    );
  }

  render() {
    const { method, tag } = this.state;
    const { isEditing, finishEdit } = this.props;
    const { handleChange, submitForm } = this;
    return (
      <form className="form-expenses">
        {this.display()}
        <label className="form-expenses__label" htmlFor="method">
          Método
          <select
            htmlFor="method"
            className="form-expenses__select"
            value={ method }
            name="method"
            onChange={ handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label className="form-expenses__label" htmlFor="tag">
          Destino
          <select
            htmlFor="tag"
            className="form-expenses__select"
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
        </label>
        {isEditing ? (
          <button
            className="form-expenses__btn"
            type="button"
            onClick={ () => finishEdit(this.state) }
          >
            Editar despesa
          </button>
        ) : (
          <button className="form-expenses__btn" type="button" onClick={ submitForm }>
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
  editTarget: state.wallet.editTarget,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (obj) => dispatch(actionAddExpense(obj)),
  finishEdit: (obj) => dispatch(actionFinishEdit(obj)),
});

FormExpenses.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  finishEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
