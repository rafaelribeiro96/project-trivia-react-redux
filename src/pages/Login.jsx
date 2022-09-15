import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/action';
import FetchApi from '../services/FetchApi';
import './Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validationButon();
    });
  };

  validationButon = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  handleClick = async () => {
    const { name, email } = this.state;
    const { dispatch, history } = this.props;
    const resultApi = await FetchApi();
    localStorage.setItem('token', resultApi);
    dispatch(login({ name, email }));
    /* console.log(history); */
    history.push('/home');
  };

  rendSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div className="geral-page-login">
        <div className="content-page-login">

          <form className="form-page-login">
            <input
              type="text"
              name="name"
              placeholder="Nome de usuário"
              onChange={ this.handleChange }
              value={ name }
              data-testid="input-player-name"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={ this.handleChange }
              value={ email }
              data-testid="input-gravatar-email"
            />
            <button
              type="button"
              name="botao"
              onClick={ this.handleClick }
              disabled={ isDisable }
              data-testid="btn-play"
            >
              Play
            </button>
          </form>
          <button
            className="button-page-login"
            type="button"
            data-testid="btn-settings"
            onClick={ this.rendSettings }
          >
            Settings
          </button>

        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
