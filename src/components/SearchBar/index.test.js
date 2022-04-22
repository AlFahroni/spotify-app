import { render, screen, cleanup } from '@testing-library/react';
import SearchBar from './index';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';

const setup = () => render(
  <Provider store={store}>
    <SearchBar />
  </Provider>
);

describe('Search bar component render', () => {
  beforeEach(setup)
  afterEach(cleanup);

  it('Success', () => {
    const searchInputElement = screen.getByPlaceholderText(/Search.../i);
    const buttonSearchElement = screen.getByRole('button', { name: /search/i });

    expect(searchInputElement).toBeInTheDocument();
    expect(buttonSearchElement).toBeInTheDocument();
  });

  it('Can type & button clickable', () => {
    const searchInputElement = screen.getByPlaceholderText(/Search.../i);
    userEvent.type(searchInputElement, 'test');

    expect(searchInputElement).toHaveValue('test');
  });

});