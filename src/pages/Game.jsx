import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { assertionValue, scoreValue } from '../redux/actions/action';
import TriviaApi from '../services/TriviaApi';
import './Game.css';

const order = [Math.random(), Math.random(), Math.random(),
  Math.random(), Math.random()];
/* let assertion = 0; */
class Game extends Component {
  state = {
    trivia: [],
    indice: 0,
    clicked: false,
    isDisabled: false,
    timer: 30,
    asserts: 0,
  };

  async componentDidMount() {
    const response = await TriviaApi();
    /* console.log(response); */
    if (response.response_code === 0) {
      this.setState({
        trivia: response.results,
      }, () => {
        this.contTimer();
      });
    } else {
      this.setState({
        trivia: [],
      }, () => {
        const { history } = this.props;
        history.push('/');
      });
    }
  }

  contTimer = () => {
    const num = 1000;
    const intervalue = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      if (timer === 0) {
        this.setState({
          isDisabled: true,
        }, () => clearInterval(intervalue));
      }
    }, num);
  };

  showAnswer = (item) => {
    this.setState({ clicked: true });
    const multiplic = 10;
    const numberHard = 3;
    const numberEasy = 1;
    const numberMedium = 2;
    let dificultyValue = 0;
    const { trivia, timer } = this.state;
    if (typeof item !== 'undefined') {
      /* assertion += 1; */
      this.setState((state) => ({ asserts: state.asserts + 1 }));
      const dificulty = trivia[item].difficulty;
      if (dificulty === 'hard') {
        dificultyValue = multiplic + (timer * numberHard);
      } else if (dificulty === 'medium') {
        dificultyValue = multiplic + (timer * numberMedium);
      } else {
        dificultyValue = multiplic + (timer * numberEasy);
      }
    }
    const { dispatch } = this.props;
    dispatch(scoreValue(dificultyValue));
    this.setState({
      timer: 0,
    });
  };

  nextButon = () => {
    const { indice } = this.state;
    const fiveIndice = 4;
    const control = indice < fiveIndice ? indice + 1 : indice;
    this.setState({
      timer: 30,
      isDisabled: false,
      clicked: false,
      indice: control,
    }, () => {
      this.contTimer();
    });
    if (indice >= fiveIndice) {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  habilityButon = () => {
    const { isDisabled } = this.state;
    if (isDisabled) {
      return (
        <button
          className="button-next"
          type="button"
          data-testid="btn-next"
          onClick={ this.nextButon }
        >
          Next
        </button>
      );
    }
  };

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  renderQuestion = (indice, trivia) => {
    const { clicked, isDisabled } = this.state;
    const num = 0.5;
    const result = [trivia[indice].correct_answer, ...trivia[indice].incorrect_answers]
      .sort(() => order[indice] - num);
    return (
      <div className="content-question-game">
        <div className="quest-game">
          <h3 data-testid="question-category">{trivia[indice].category}</h3>
          <h3 data-testid="question-text">
            {this
              .decodeEntity(trivia[indice].question)}

          </h3>
        </div>
        <div data-testid="answer-options" className="answer-options">
          {result.map((item, index) => (
            item === trivia[indice].correct_answer
              ? (
                <button
                  key={ index }
                  type="button"
                  name="correct"
                  disabled={ isDisabled }
                  className={ clicked ? 'correct' : 'button' }
                  data-testid="correct-answer"
                  onClick={ () => this.showAnswer(indice) }
                >
                  {item}
                </button>
              )
              : (
                <button
                  key={ index }
                  type="button"
                  name="incorrect"
                  disabled={ isDisabled }
                  className={ clicked ? 'incorrect' : 'button' }
                  onClick={ () => this.showAnswer() }
                  data-testid={ `wrong-answer-${index}` }
                >
                  {item}
                </button>
              )
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { trivia, indice, timer, asserts } = this.state;
    const { dispatch } = this.props;
    dispatch(assertionValue(asserts));
    let result = [];
    if (trivia.length > 0) {
      result = this.renderQuestion(indice, trivia);
    } else {
      result = [];
    }
    return (
      <div className="geral-page-game">
        <Header />
        <div className="content-page-game">
          <h3>
            Time to answer:
            {' '}
            {timer}
          </h3>
          <h2>{result}</h2>
          {this.habilityButon()}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
