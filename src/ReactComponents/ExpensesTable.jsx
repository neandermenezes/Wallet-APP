import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteItem } from '../actions';

const QUATRO_FOUR_1234 = 4;

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const { expenses, dispatchDeleteItem } = this.props;
    console.log(expenses, id);
    const newExpenses = expenses.filter((elem) => elem.id !== id);
    console.log(newExpenses);
    dispatchDeleteItem(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.map(
          ({ description, tag, method, currency, exchangeRates, value, id }) => (
            <tbody key={ id }>
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>Real</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {Number(value)
                    * Number(exchangeRates[currency].ask).toFixed(QUATRO_FOUR_1234)}
                </td>
                <td>Real Brasileiro</td>
                <td>
                  <button
                    onClick={ () => this.handleDelete(id) }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ),
        )}
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteItem: (obj) => dispatch(actionDeleteItem(obj)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
