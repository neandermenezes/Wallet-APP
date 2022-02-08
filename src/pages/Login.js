import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { actionUserLogin } from '../actions/index';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.auth = this.auth.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
      redirect: false,
    };
  }

  onButtonClick() {
    const { email } = this.state;
    const { dispatchEmail } = this.props;
    dispatchEmail(email);
    this.setState({ redirect: true });
  }

  auth() {
    const { email, password } = this.state;
    const minPasswordLength = 6;

    if (password.length >= minPasswordLength && email.includes('@' && '.com')) {
      this.setState({ isButtonDisabled: false });
    } else this.setState({ isButtonDisabled: true });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.auth);
  }

  render() {
    const { email, password, isButtonDisabled, redirect } = this.state;
    const display = (
      <div className="container">
        <form action="#" className="form">
          <h1 className="heading-primary">Trybe Wallet</h1>
          <div className="form__group u-margin-top-big">
            <input
              placeholder="Email"
              data-testid="email-input"
              type="email"
              className="form__input"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </div>
          <div className="form__group">
            <input
              placeholder="Password"
              data-testid="password-input"
              type="password"
              className="form__input"
              onChange={ this.handleChange }
              name="password"
              value={ password }
            />
          </div>
          <div className="form__group">
            <button
              type="button"
              disabled={ isButtonDisabled }
              className={ isButtonDisabled ? 'btn btn--white' : 'btn btn--green' }
              onClick={ this.onButtonClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
    if (redirect) return <Redirect to="/carteira" />;
    return display;
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(actionUserLogin(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
