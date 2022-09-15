import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newGame } from '../redux/actions/action';
import './Ranking.css';

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
      <div className="player-ranking" key={ index }>
        <img src={ item.url } alt="imagem" />
        <h4 data-testid={ `player-score-${index}` }>
          Score:
          {' '}
          {item.score}
        </h4>
        <h4 data-testid={ `player-name-${index}` }>
          Player:
          {' '}
          {item.name}
        </h4>
      </div>
    )));

  render() {
    const { ranking } = this.state;
    return (
      <div data-testid="ranking-title" className="geral-page-ranking">
        <h1>
          Ranking
        </h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.playAgain }
        >
          PLAY AGAIN
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
