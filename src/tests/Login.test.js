import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Feedback from "../pages/Feedback";
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testing initial page "Login"', () => {
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
  it('Test rendering and inicial values', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();
    const textEntrar = screen.getByTestId('btn-play');
    expect(textEntrar).toBeInTheDocument();
    const textSetting = screen.getByText('Settings');
    expect(textSetting).toBeInTheDocument();
  });
  it('Test submit values', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const { nameInput, emailInput, textEntrar } = info();

    userEvent.type(emailInput, emails);
    userEvent.type(nameInput, name);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(emails);

    userEvent.click(textEntrar);
    const named = await screen.findByTestId('header-player-name');
    expect(named).toBeInTheDocument();
  });
  it('Test settings submit', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });  
    const textSetting = screen.getByText('Settings');
    expect(textSetting).toBeInTheDocument();
    userEvent.click(textSetting);

    expect(history.location.pathname).toBe('/settings');
  });
  it('Test feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    
    const msgs = screen.getByTestId('feedback-text');
    expect(msgs).toBeInTheDocument();
    expect(msgs).toHaveTextContent('Could be better...');
    const feedbacks = screen.getByTestId('header-player-name');
    expect(feedbacks).toBeInTheDocument();
    
    const totalQuesion = screen.getByTestId('feedback-total-question');
    expect(totalQuesion).toBeInTheDocument();

    const newGames = screen.getByTestId('btn-play-again');
    userEvent.click(newGames);
    expect(history.location.pathname).toEqual('/');
    
  });
  it('Test feedback redirect ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const screenRanking = screen.getByTestId('btn-ranking');
    userEvent.click(screenRanking);
    expect(history.location.pathname).toEqual('/ranking');

    const playerScore = screen.getByTestId('player-score-0');
    expect(playerScore).toBeInTheDocument();
    
    const butonAgain = screen.getByTestId('btn-go-home');
    expect(butonAgain).toBeInTheDocument();
    userEvent.click(butonAgain);
    expect(history.location.pathname).toEqual('/');
    
  });
  it('Testing initial state Feedback', () => {
    const initialState = {
      player: {
        name: 'Reinaldo',
        assertions: 5,
        score: 5,
        gravatarEmail: 'meuemail@gmail.com',
        locale: [],
      }
    }
    renderWithRouterAndRedux(<Feedback />, initialState);
    expect(screen.getByTestId("header-score")).toBeInTheDocument;
  });
  it('Testing initial state Ranking', () => {
    const initialState = {
      player: {
        name: 'Reinaldo',
        assertions: 5,
        score: 235,
        gravatarEmail: 'meuemail@gmail.com',
        locale: [{
          name: 'Reinaldo Santos',
          score: 210,
          url: 'https://www.gravatar.com/avatar/134c8308fa8caadd5a640f47f5e9343a',
        },
          {
            name: 'Reinaldo',
            score: 235,
            url: 'https://www.gravatar.com/avatar/134c8308fa8caadd5a640f47f5e9343a',
        }],
      }
    }
    renderWithRouterAndRedux(<Ranking />, initialState);

    const ranking1 = screen.getByTestId('player-score-0');
    expect(ranking1).toBeInTheDocument();
    const rankingName = screen.getByTestId('player-name-0');
    expect(rankingName).toBeInTheDocument();

    const ranking2 = screen.getByTestId('player-score-1');
    expect(ranking2).toBeInTheDocument();
    const rankingName1 = screen.getByTestId('player-name-1');
    expect(rankingName1).toBeInTheDocument();
  })
});
