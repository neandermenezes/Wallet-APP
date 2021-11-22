import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteItem, actionBeginEdit } from '../actions';

class ExpensesTable extends React.Component {
  constructor() {
    super();
    this.renderTable = this.renderTable.bind(this);
  }

  renderTable() {
    return (
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
    );
  }

  render() {
    const { expenses, dispatchDeleteItem, beginEdit } = this.props;
    return (
      <table>
        { this.renderTable() }
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
                  {(Number(value)
                    * Number(exchangeRates[currency].ask)).toFixed(2)}
                </td>
                <td>Real Brasileiro</td>
                <td>
                  <button
                    onClick={ () => beginEdit(id) }
                    type="button"
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={ () => dispatchDeleteItem(id) }
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
  dispatchDeleteItem: (id) => dispatch(actionDeleteItem(id)),
  beginEdit: (id) => dispatch(actionBeginEdit(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatchDeleteItem: PropTypes.func.isRequired,
  beginEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
