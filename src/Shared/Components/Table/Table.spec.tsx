import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

describe('Table Component', () => {
  const mockOnClick = jest.fn();
  const mockGetRowClass = jest.fn();

  const mockColDef = [
    { headerName: 'ID', key: 'id' },
    { headerName: 'Name', key: 'name' },
  ];

  const mockList = [
    { id: 1, name: 'Luke Skywalker' },
    { id: 2, name: 'Han Solo' },
  ];

  it('Should render table with headers and rows', () => {
    render(
      <Table
        list={mockList}
        colDef={mockColDef}
        onClick={mockOnClick}
        showHeader={true}
      />
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Han Solo')).toBeInTheDocument();
  });

  it('Should trigger onClick when a row is clicked', () => {
    render(
      <Table
        list={mockList}
        colDef={mockColDef}
        onClick={mockOnClick}
        showHeader={true}
      />
    );

    const row = screen.getAllByRole('row')[1];
    fireEvent.click(row);

    expect(mockOnClick).toHaveBeenCalledWith(1);
  });

  it('if getRowClass is supplied, on row click, highligh class should be applied to the row clicked', () => {
    mockGetRowClass.mockReturnValue('highlighted-row');

    render(
      <Table
        list={mockList}
        colDef={mockColDef}
        onClick={mockOnClick}
        showHeader={true}
        getRowClass={mockGetRowClass}
      />
    );

    const row = screen.getAllByRole('row')[1];
    expect(row).toHaveClass('highlighted-row');
  });

  it('if getRowClass not provided, on row click, it should not apply highlight class', () => {
    render(
      <Table
        list={mockList}
        colDef={mockColDef}
        onClick={mockOnClick}
        showHeader={true}
      />
    );

    const row = screen.getAllByRole('row')[1];
    expect(row).not.toHaveClass('highlighted-row');
  });
});
