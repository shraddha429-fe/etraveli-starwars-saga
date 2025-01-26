import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  it('Should render the loader with passed color and size', () => {
    const color = 'red';
    const size = '15px';

    render(<Loader color={color} size={size} />);

    expect(screen.getByText('Loading')).toBeInTheDocument();

    const loader = screen.getByTestId('beat-loader');
    expect(loader).toBeInTheDocument();
  });
});
