import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../__mocks__/store';
import HomePageHeader from './HomePageHeader';
import { useAppDispatch } from '../../hooks';
import { setSearchKey, setSortId } from '../../Reducers/HomePageSlice';

jest.mock('../../hooks');

describe('HomePageHeader', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    require('../../hooks').useAppDispatch.mockImplementation(() => dispatch);
    require('../../hooks').useAppSelector.mockImplementation((f) =>
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
  it('renders search bar and dropdown correctly', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <HomePageHeader />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText('Type to search...')
    ).toBeInTheDocument();
    expect(screen.getByText('Sort By')).toBeInTheDocument();
  });

  it('dispatches setSearchKey action when typing in the search bar', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <HomePageHeader />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(
      'Type to search...'
    ) as HTMLInputElement;
    await fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(useAppDispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setSearchKey('test search'));
  });

  it('dispatches setSortId action when a sort option is selected', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <HomePageHeader />
      </Provider>
    );

    await fireEvent.click(screen.getByText('Sort By'));
    const option = screen.queryByText('Sort by episode, asc') as HTMLElement;
    await fireEvent.click(option);
    expect(useAppDispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setSortId('1'));
  });
});
