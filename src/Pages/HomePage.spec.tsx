import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../src/__mocks__/store';
import HomePage from './HomePage';
import { setSelectedMovieId } from '../Reducers/HomePageSlice';
import { useAppDispatch } from '../hooks';
import { toRoman } from '../Utility';

jest.mock('../hooks');

describe('HomePage', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    require('../hooks').useAppDispatch.mockImplementation(() => dispatch);
    require('../hooks').useAppSelector.mockImplementation((f) =>
      f({
        homePage: {
          sortId: '',
          movieId: null,
          searchKey: '',
          movie: null,
          isMovieListLoading: false,
          isMovieListError: null,
          movieList: [],
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should display Loader initially', () => {
    const store = createMockStore();
    require('../hooks').useAppSelector.mockReturnValue({
      sortId: '',
      movieId: null,
      searchKey: '',
      movie: null,
      isMovieListLoading: true,
      isMovieListError: null,
      movieList: [],
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByTestId('beat-loader')).toBeInTheDocument();
  });

  it('Should display movie names if movieList is available', async () => {
    const store = createMockStore();
    require('../hooks').useAppSelector.mockReturnValueOnce({
      movieList: [
        { episode_id: 1, title: 'Test Movie', release_date: '2025-01-01' },
      ],
      searchKey: '',
      sortId: '1',
      movie: null,
      movieId: null,
      isMovieListLoading: false,
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const movieTitles = screen.getAllByText(/Episode/);
    expect(movieTitles.length).toBeGreaterThan(1);
  });

  it('Should filter movie list based on search input', async () => {
    const store = createMockStore();
    const movieList = [
      { episode_id: 1, title: 'Test Movie 1', release_date: '2025-01-01' },
      { episode_id: 2, title: 'Test Movie 2', release_date: '2025-01-02' },
    ];

    require('../hooks').useAppSelector.mockReturnValueOnce({
      movieList,
      searchKey: '1',
      sortId: '1',
      movie: null,
      movieId: null,
      isMovieListLoading: false,
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText(/Test Movie 1/)).toBeInTheDocument();
    expect(screen.queryByText(/Test Movie 2/)).not.toBeInTheDocument();
  });

  it('Dispatches setSelectedMovieId when a movie is clicked', async () => {
    const store = createMockStore();
    const movieList = [
      { episode_id: 1, title: 'Test Movie 1', release_date: '2025-01-01' },
    ];

    require('../hooks').useAppSelector.mockReturnValueOnce({
      movieList,
      searchKey: '',
      sortId: '1',
      movie: null,
      movieId: null,
      isMovieListLoading: false,
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Test Movie 1/));

    expect(dispatch).toHaveBeenCalledWith(setSelectedMovieId(1));
  });

  it('Displays movie details when a movie is selected', async () => {
    const store = createMockStore();
    const movieList = [
      {
        title: 'Return of the Jedi',
        episode_id: 6,
        opening_crawl:
          'Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...',
        director: 'George Lucas',
        producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
        release_date: '1983-05-25',
        characters: [
          'https://swapi.dev/api/people/1/',
          'https://swapi.dev/api/people/2/',
        ],
        planets: [
          'https://swapi.dev/api/planets/1/',
          'https://swapi.dev/api/planets/5/',
        ],
        starships: [
          'https://swapi.dev/api/starships/2/',
          'https://swapi.dev/api/starships/3/',
        ],
        vehicles: ['https://swapi.dev/api/vehicles/8/'],
        species: ['https://swapi.dev/api/species/1/'],
        created: '2014-12-18T10:39:33.255000Z',
        edited: '2014-12-20T09:48:37.462000Z',
        url: 'https://swapi.dev/api/films/3/',
      },
    ];

    require('../hooks').useAppSelector.mockReturnValue({
      movieList,
      movie: {
        ...movieList[0],
        id: movieList[0].episode_id,
        episode: `Episode ${movieList[0].episode_id}`,
        title: `Episode ${toRoman(movieList[0].episode_id)} - ${
          movieList[0].title
        }`,
      },
      searchKey: '',
      sortId: '1',
      movieId: 6,
      isMovieListLoading: false,
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    const row = screen.getByRole('row');
    waitFor(() => {
      fireEvent.click(row);
    });
    expect(useAppDispatch).toHaveBeenCalled();
    expect(screen.getByText(/George/)).toBeInTheDocument();
  });
});
