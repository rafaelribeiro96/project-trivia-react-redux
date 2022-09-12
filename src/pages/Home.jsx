import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { assertionValue, scoreValue } from '../redux/actions/action';
import TriviaApi from '../services/TriviaApi';

const order = [Math.random(), Math.random(), Math.random(),
  Math.random(), Math.random()];
/* let assertion = 0; */
class Home extends Component {
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
    /* const { clicked, isDisabled } = this.state; */
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
    /* console.log(asserts); */
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
          type="button"
          data-testid="btn-next"
          onClick={ this.nextButon }
        >
          Next
        </button>
      );
    }
  };

  renderQuestion = (indice, trivia) => {
    const { clicked, isDisabled } = this.state;
    const num = 0.5;
    const result = [trivia[indice].correct_answer, ...trivia[indice].incorrect_answers]
      .sort(() => order[indice] - num);
    return (
      <div>
        <h3 data-testid="question-category">{trivia[indice].category}</h3>
        <h3 data-testid="question-text">{trivia[indice].question}</h3>
        <div data-testid="answer-options">
          {result.map((item, index) => (
            item === trivia[indice].correct_answer
              ? (
                <button
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
      <div>
        <Header />
        <h4>{timer}</h4>
        {result}
        {this.habilityButon()}
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Home);
