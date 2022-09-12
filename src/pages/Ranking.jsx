import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newGame } from '../redux/actions/action';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const { locale } = this.props;
    /* const { ranking } = this.state; */
    this.setState({
      ranking: [...locale],
    });
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(newGame());
    history.push('/');
  };

  renderRanking = (ranking) => ranking.length > 0 && (ranking
    .sort((a, b) => b.score - a.score)
    .map((item, index) => (
      <div key={ index }>
        <img src={ item.url } alt="imagem" />
        <h1 data-testid={ `player-score-${index}` }>{item.score}</h1>
        <h1 data-testid={ `player-name-${index}` }>{item.name}</h1>
      </div>
    )));

  render() {
    const { ranking } = this.state;
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
        { this.renderRanking(ranking) }
      </div>
    );
  }
}
Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  locale: state.player.locale,
});

export default connect(mapStateToProps)(Ranking);
