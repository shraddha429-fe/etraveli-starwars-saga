import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockHandleChange = jest.fn();

  it('should render SearchBar with input field and icon', () => {
    render(
      <SearchBar
        searchKey=""
        handleChange={mockHandleChange}
        placeholder="Search..."
      />
    );

    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();

    const iconElement = screen.getByTestId('icon-search');
    expect(iconElement).toBeInTheDocument();
  });

  it('handleChange function should be called when user starts typing in the input', () => {
    render(
      <SearchBar
        searchKey=""
        handleChange={mockHandleChange}
        placeholder="Search..."
      />
    );

    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('Should display the user input value in the input field', () => {
    render(
      <SearchBar
        searchKey="test"
        handleChange={mockHandleChange}
        placeholder="Search..."
      />
    );

    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toHaveValue('test');
  });
});
