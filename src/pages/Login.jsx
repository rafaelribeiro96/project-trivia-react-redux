import React, { Component } from 'react';

export default class Login extends Component {
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
            onClick={ this.validationButon }
            disabled={ isDisable }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
