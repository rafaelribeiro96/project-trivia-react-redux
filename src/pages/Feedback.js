import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newGame, saveLocale } from '../redux/actions/action';
import './Feedback.css';

class Feedback extends Component {
  state = {
    nameLocale: '',
    urlLocale: '',
    scoreLocale: 0,
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    const { name, score, dispatch } = this.props;
    dispatch(saveLocale({ name, score, url }));
    localStorage.setItem('ranking', JSON.stringify([{ name, score, url }]));
    this.getLocale();
  }

  getLocale = () => {
    const result = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      urlLocale: result[0].url,
      nameLocale: result[0].name,
      scoreLocale: result[0].score,
    });
  };

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(newGame());
    history.push('/');
  };

  Ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { urlLocale, nameLocale, scoreLocale } = this.state;
    const { assertions } = this.props;
    const tree = 3;
    let msg = '';
    if (assertions < tree) {
      msg = 'Could be better...';
    }
    if (assertions >= tree) {
      msg = 'Well Done!';
    }
    return (
      <div className="geral-page-feedback">
        <img src={ urlLocale } alt="img" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ nameLocale }</h3>
        <h3 className="none-display" data-testid="header-score">{scoreLocale}</h3>
        <h3 data-testid="feedback-text">{msg}</h3>
        <h4 className="none-display">Seu desempenho!</h4>
        <h4 data-testid="feedback-total-score">
          Score:
          {' '}
          {scoreLocale}
        </h4>
        <h4 data-testid="feedback-total-question">
          Assertions:
          {' '}
          {assertions}
        </h4>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.Ranking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
