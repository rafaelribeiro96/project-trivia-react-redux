import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import question from './helpers/questions';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

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
      json: () => Promise.resolve(question),
    });
  it('Home', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    
    const { nameInput, emailInput, textEntrar } = info();

    userEvent.type(emailInput, emails);
    userEvent.type(nameInput, name);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(emails);
    
    userEvent.click(textEntrar);
    expect(history.location.pathname).toBe('/home');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled()); 
    const named = await screen.findByTestId('question-category');
    expect(named).toBeInTheDocument();
  })
});