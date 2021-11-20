import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const QUATRO_FOUR_1234 = 4;

class ExpensesTable extends React.Component {
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
                    * Number(exchangeRates[currency].ask).toFixed(
                      QUATRO_FOUR_1234,
                    )}
                </td>
                <td>Real Brasileiro</td>
                <td>
                  <button type="button" data-testid="delete-btn">
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

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
