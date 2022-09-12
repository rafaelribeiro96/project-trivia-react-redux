import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div data-testid="ranking-title">
        <h1>
          Ranking
        </h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.playAgain }
        >
          playAgain
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
