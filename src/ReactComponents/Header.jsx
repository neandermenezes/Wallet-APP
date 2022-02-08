import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header">
        <div className="header__group">
          <p className="header__identification" data-testid="email-field">
            {email}
          </p>
        </div>
        <div className="header__group">
          <p className="header__total-field" data-testid="total-field">
            {expenses.reduce(
              (acc, curr) => acc
          + Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask),
              0,
            ).toFixed(2)}
          </p>
          <p className="header__currency" data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
