import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { invalidTokenQuestionsResponse, questionsResponse } from './helpers/questions';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const mockToken = () => Promise.resolve({
  json: () => Promise.resolve(invalidTokenQuestionsResponse),
});
describe('Testing screen Home', () => {
  const info = () => {
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const textEntrar = screen.getByTestId('btn-play');
    return {
      nameInput, emailInput, textEntrar,
    };
  };
    const name = 'escolatrybe';
    const emails = 'trybe@trybe.com.br';
    const mockFetch = () => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    });
  it('Testing invalid token', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockToken);
    const { history } = renderWithRouterAndRedux(<App />);
    
    
    const { nameInput, emailInput, textEntrar } = info();

    userEvent.type(emailInput, emails);
    userEvent.type(nameInput, name);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(emails);
    
    userEvent.click(textEntrar);
    
    
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/');
    
    global.fetch.mockClear();
  });
  it('Testing o mock question', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouterAndRedux(<App />);
    
    
    const { nameInput, emailInput, textEntrar } = info();

    userEvent.type(emailInput, emails);
    userEvent.type(nameInput, name);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(emails);
    
    userEvent.click(textEntrar);
    
    
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/home'); 
    
    const question1 = screen.getByTestId('question-category');
    expect(question1).toBeInTheDocument();
    expect(question1).toHaveTextContent('Geography');

    const butons = screen.queryAllByTestId(/wrong-answer/i);
    expect(butons[0]).toBeInTheDocument();
    userEvent.click(butons[0]); 
    const scoreValue = screen.getByTestId('header-score');
    expect(scoreValue).toBeInTheDocument();
    expect(scoreValue).toHaveTextContent('0'); 
    
    
    
    await waitFor(() => {
      const next = screen.getByTestId('btn-next');
      expect(next).toBeInTheDocument();
      userEvent.click(next);
    })
    
    

    const question2 = screen.getByTestId('question-category');
    expect(question2).toBeInTheDocument();
    expect(question2).toHaveTextContent('Science & Nature');

    const butons1 = screen.queryAllByTestId(/wrong-answer/i);
    expect(butons1[0]).toBeInTheDocument();
    /* await new Promise((r) => setTimeout(r, 1000)); */
    userEvent.click(butons1[0]); 
    const scoreValues = screen.getByTestId('header-score');
    expect(scoreValues).toBeInTheDocument();
    expect(scoreValues).toHaveTextContent('0'); 
    
    
    await waitFor(() => {
      const next1 = screen.getByTestId('btn-next');
      expect(next1).toBeInTheDocument();
      userEvent.click(next1);
    })


    const question3 = screen.getByTestId('question-category');
    expect(question3).toBeInTheDocument();
    expect(question3).toHaveTextContent('Science: Computers');

    const butons2 = screen.getByTestId('correct-answer');
    expect(butons2).toBeInTheDocument();
    
    userEvent.click(butons2); 
    const scoreValues1 = screen.getByTestId('header-score');
    expect(scoreValues1).toBeInTheDocument();
    expect(scoreValues1).toHaveTextContent('0'); 
    
    
    await waitFor(() => {
      const next2 = screen.getByTestId('btn-next');
      expect(next2).toBeInTheDocument();
      userEvent.click(next2);
    })


    const question4 = screen.getByTestId('question-category');
    expect(question4).toBeInTheDocument();
    expect(question4).toHaveTextContent('Entertainment: Video Games');

    const butons3 = screen.getByTestId('correct-answer');
    expect(butons3).toBeInTheDocument();
    
    userEvent.click(butons3); 
    const scoreValues2 = screen.getByTestId('header-score');
    expect(scoreValues2).toBeInTheDocument();
    expect(scoreValues2).toHaveTextContent('110'); 
    
    
    await waitFor(() => {
      const next3 = screen.getByTestId('btn-next');
      expect(next3).toBeInTheDocument();
      userEvent.click(next3);
    })

    const question5 = screen.getByTestId('question-category');
    expect(question5).toBeInTheDocument();
    expect(question5).toHaveTextContent('Entertainment: Japanese Anime & Manga');

    const butons4 = screen.getByTestId('correct-answer');
    expect(butons4).toBeInTheDocument();
    
    userEvent.click(butons4); 
    const scoreValues3 = screen.getByTestId('header-score');
    expect(scoreValues3).toBeInTheDocument();
    expect(scoreValues3).toHaveTextContent('0'); 
    
    
    await waitFor(() => {
      const next4 = screen.getByTestId('btn-next');
      expect(next4).toBeInTheDocument();
      userEvent.click(next4);
    })

    expect(history.location.pathname).toEqual('/feedback'); 
    
    global.fetch.mockClear();
  }, 10000);
});