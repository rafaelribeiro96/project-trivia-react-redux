import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/action';
import FetchApi from '../services/FetchApi';

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
      <div>
        <form>
          <input
            type="text"
            name="name"
            onChange={ this.handleChange }
            value={ name }
            data-testid="input-player-name"
          />
          <input
            type="email"
            name="email"
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
          type="button"
          data-testid="btn-settings"
          onClick={ this.rendSettings }
        >
          Settings
        </button>
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
