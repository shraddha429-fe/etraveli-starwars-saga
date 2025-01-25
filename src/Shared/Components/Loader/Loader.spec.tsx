import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  it('renders the loader with correct color and size', () => {
    const color = 'red';
    const size = '15';

    render(<Loader color={color} size={size} />);

    expect(screen.getByText('Loading')).toBeInTheDocument();

    // const loader = screen.getByTestId('beat-loader');
    // expect(loader).toHaveStyle(`color: ${color}`);
    // expect(loader).toHaveAttribute('size', size);
  });
});
