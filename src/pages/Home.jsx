import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import TriviaApi from '../services/TriviaApi';

export default class Home extends Component {
  state = {
    trivia: [],
    indice: 0,
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

  renderQuestion = (indice, trivia) => {
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
                  data-testid="correct-answer"
                >
                  {item}
                </button>
              )
              : (
                <button
                  type="button"
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
