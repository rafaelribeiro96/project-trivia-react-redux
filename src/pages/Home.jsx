import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import TriviaApi from '../services/TriviaApi';

export default class Home extends Component {
  state = {
    trivia: [],
    indice: 0,
    clicked: false,
  };

  async componentDidMount() {
    const response = await TriviaApi();
    if (response.response_code === 0) {
      this.setState({
        trivia: response.results,
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

  showAnswer = () => {
    this.setState({ clicked: true });
  };

  renderQuestion = (indice, trivia) => {
    const { clicked } = this.state;
    const num = 0.5;
    const result = [trivia[indice].correct_answer, ...trivia[indice].incorrect_answers]
      .sort(() => Math.random() - num);
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
                  className={ clicked ? 'correct' : 'button' }
                  data-testid="correct-answer"
                  onClick={ this.showAnswer }
                >
                  {item}
                </button>
              )
              : (
                <button
                  type="button"
                  name="incorrect"
                  className={ clicked ? 'incorrect' : 'button' }
                  onClick={ this.showAnswer }
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
    const { trivia, indice } = this.state;
    let result = [];
    if (trivia.length > 0) {
      result = this.renderQuestion(indice, trivia);
    } else {
      result = [];
    }
    return (
      <div>
        <Header />
        {result}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
