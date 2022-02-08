/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-curly-spacing */
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
      <thead className="table__header">
        <tr>
          <th className="table__item">Descrição</th>
          <th className="table__item">Tag</th>
          <th className="table__item">Método de pagamento</th>
          <th className="table__item">Valor</th>
          <th className="table__item">Moeda</th>
          <th className="table__item">Câmbio utilizado</th>
          <th className="table__item">Valor de conversão</th>
          <th className="table__item">Valor convertido</th>
          <th className="table__item">Moeda de conversão</th>
          <th className="table__item">Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  render() {
    const { expenses, dispatchDeleteItem, beginEdit } = this.props;
    return (
      <div className="table-container">
        <table className="table">
          {this.renderTable()}
          {expenses.map(
            ({
              description,
              tag,
              method,
              currency,
              exchangeRates,
              value,
              id,
            }) => (
              <tbody key={id}>
                <tr className="table__row">
                  <td className="table__expense">{description}</td>
                  <td className="table__expense">{tag}</td>
                  <td className="table__expense">{method}</td>
                  <td className="table__expense">{value}</td>
                  <td className="table__expense">
                    {exchangeRates[currency].name}
                  </td>
                  <td className="table__expense">Real</td>
                  <td className="table__expense">
                    {Number(exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td className="table__expense">
                    {(
                      Number(value) * Number(exchangeRates[currency].ask)
                    ).toFixed(2)}
                  </td>
                  <td className="table__expense">Real Brasileiro</td>
                  <td className="table__expense">
                    <button
                      className="table-btn"
                      onClick={() => beginEdit(id)}
                      type="button"
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      className="table-btn"
                      onClick={() => dispatchDeleteItem(id)}
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
      </div>
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
