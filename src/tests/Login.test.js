import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
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
    /* const { history } =  */renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const { nameInput, emailInput, textEntrar } = info();

    userEvent.type(emailInput, emails);
    userEvent.type(nameInput, name);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(emails);
    /* const brasil = await screen.findByText('Dólar Americano/Real Brasileiro'); */

    userEvent.click(textEntrar);
    const named = await screen.findByTestId('header-player-name');
    expect(named).toBeInTheDocument();
    /* const imgD = await screen.findByTestId('header-profile-picture');
    expect(imgD).toBeInTheDocument(); */
  });
  it('Test settings submit', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });  
    const textSetting = screen.getByText('Settings');
    expect(textSetting).toBeInTheDocument();
    userEvent.click(textSetting);

    expect(history.location.pathname).toBe('/settings');
  });
});
