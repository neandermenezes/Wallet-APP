import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.calculateExpenses = this.calculateExpenses.bind(this);

    this.state = {
      expenses: 0,
    };
  }

  componentDidUpdate() {
    this.calculateExpenses();
  }

  calculateExpenses() {
    const { totalMoney } = this.props;
    const { expenses } = this.state;
    const newExpenses = totalMoney.reduce(
      (acc, curr) => parseInt(curr.value, 10) + acc,
      0,
    );
    if (expenses !== newExpenses) this.setState({ expenses: newExpenses });
  }

  render() {
    const {
      props: { email },
      state: { expenses },
    } = this;

    return (
      <div className="header">
        <div className="header__group">
          <p className="header__identification" data-testid="email-field">
            {email}
          </p>
        </div>
        <div className="header__group">
          <p className="header__total-field " data-testid="total-field">
            {expenses}
          </p>
        </div>
        <div className="header__group">
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
  totalMoney: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalMoney: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
