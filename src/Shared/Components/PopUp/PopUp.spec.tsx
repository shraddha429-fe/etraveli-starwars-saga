import { render, screen, fireEvent } from '@testing-library/react';
import PopUp from './PopUp';

describe('PopUp Component', () => {
  it('Should render the PopUp Component when isOpen prop is false', () => {
    render(
      <PopUp isOpen={false} onClose={() => {}} width="400px" height="300px">
        Content
      </PopUp>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('Should render the PopUp Component when isOpen is true', () => {
    render(
      <PopUp isOpen={true} onClose={() => {}} width="400px" height="300px">
        Content
      </PopUp>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('onClose function to be called when close icon is clicked', () => {
    const onCloseMock = jest.fn();
    render(
      <PopUp isOpen={true} onClose={onCloseMock} width="400px" height="300px">
        Content
      </PopUp>
    );
    const closeIcon = screen.getByTestId('icon-close-outline');
    fireEvent.click(closeIcon);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('Should not render close icon when showCloseIcon is false', () => {
    render(
      <PopUp
        isOpen={true}
        onClose={() => {}}
        width="400px"
        height="300px"
        showCloseIcon={false}
      >
        Content
      </PopUp>
    );
    expect(screen.queryByTestId('icon-close-outline')).not.toBeInTheDocument();
  });

  it('Should render the close icon when showCloseIcon is true', () => {
    render(
      <PopUp
        isOpen={true}
        onClose={() => {}}
        width="400px"
        height="300px"
        showCloseIcon={true}
      >
        Content
      </PopUp>
    );
    expect(screen.queryByTestId('icon-close-outline')).toBeInTheDocument();
  });
});
