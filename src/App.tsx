import { SyntheticEvent, useState, useEffect } from 'react';
import Dropdown from './Shared/Components/Dropdown/Dropdown';
import SearchBar from './Shared/Components/SearchBar/SearchBar';
import useDebounce from './hooks/useDebounce';
import './App.css';
import './Shared/Components/Icon/Icon.css';
import HomePage from './Pages/HomePage';

function App() {
  const [searchKey, setSearchKey] = useState('');
  const debounceKey = useDebounce(searchKey, 2000);

  useEffect(() => {
    console.log('>> debounceKey: ', debounceKey);
  }, [debounceKey]);

  const handleChange = (e: SyntheticEvent) => {
    setSearchKey(e.target.value);
  };

  const onMenuItemClick = (id: string) => {
    console.log('>> id: ', id);
  };

  const menuItems = [
    {
      title: 'Sort by episode, asc',
      id: '1',
    },
    {
      title: 'Sort by episode, desc',
      id: '2',
    },
    {
      title: 'Sort by year, asc',
      id: '3',
    },
    {
      title: 'Sort by year, desc',
      id: '4',
    },
  ];

  const buttonText = 'Sort By';
  return (
    <div>
      <HomePage/>
      {/* <div>
        <Dropdown
          onMenuItemClick={onMenuItemClick}
          menuItems={menuItems}
          buttonText={buttonText}
        />
      </div>
      <SearchBar searchKey={searchKey} handleChange={handleChange} /> */}
    </div>
  );
}

export default App;
