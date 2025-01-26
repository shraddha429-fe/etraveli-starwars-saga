import { ColumnDefItem } from '../../../types/movieTypes';
// import './Table.css';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[];
  colDef: ColumnDefItem[];
  onClick: (id: number) => void;
  showHeader?: boolean;
  selected?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowClass?: (row: any) => void;
}

const Table = (props: Props) => {
  const { list, colDef, onClick, showHeader = false, getRowClass } = props;
  const handleClick = (id: number) => {
    onClick(id);
  };

  const displayTable = () => {
    return (
      <div className="table-container">
        <table className="table">
          {showHeader && (
            <thead>
              <tr>
                {colDef.map((col, index) => (
                  <th key={index}>{col.headerName}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {list.map((row) => {
              return (
                <tr
                  key={row.id}
                  onClick={() => {
                    handleClick(row.id);
                  }}
                  className={`table-row ${getRowClass ? getRowClass(row) : ''}`}
                >
                  {colDef.map((col, index) => (
                    <td key={index} className="table-cell">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return <>{displayTable()}</>;
};

export default Table;
