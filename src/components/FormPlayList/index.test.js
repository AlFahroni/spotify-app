import { render, screen, cleanup } from '@testing-library/react';
import CreatePlaylistForm from './index';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';

const setup = () => render(
  <Provider store={store}>
    <CreatePlaylistForm />
  </Provider>
);

describe('create playlist component render', () => {
  beforeEach(setup)
  afterEach(cleanup);

  it('Success', () => {
    const titleInputElement = screen.getByPlaceholderText(/Title of playlist/i);
    const descriptionInputElement = screen.getByPlaceholderText(/Description of playlist/i);
    const buttonCreateElement = screen.getByTestId('btn-create-playlist');

    expect(titleInputElement).toBeInTheDocument();
    expect(descriptionInputElement).toBeInTheDocument();
    expect(buttonCreateElement).toBeInTheDocument();
  });

  it('Can type', () => {
    const titleInputElement = screen.getByPlaceholderText(/Title of playlist/i);
    const descriptionInputElement = screen.getByPlaceholderText(/Description of playlist/i);

    userEvent.type(titleInputElement, 'New Playlist');
    userEvent.type(descriptionInputElement, 'New Playlist Description');

    expect(titleInputElement).toHaveValue('New Playlist');
    expect(descriptionInputElement).toHaveValue('New Playlist Description');
  });

  it('error title if is less then 10', () => {
    const titleInputElement = screen.getByPlaceholderText(/Title of playlist/i);
    const descriptionInputElement = screen.getByPlaceholderText(/Description of playlist/i);
    const buttonCreateElement = screen.getByTestId('btn-create-playlist');

    userEvent.type(titleInputElement, 'New');
    userEvent.type(descriptionInputElement, 'New Playlist Description');
    userEvent.click(buttonCreateElement);

    const errorText = screen.getByText(/Title must have more than 10 characters/i);

    expect(errorText).toBeInTheDocument();
  });
});