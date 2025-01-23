import { SyntheticEvent, useState, useEffect } from 'react';
import Dropdown from './Components/Dropdown/Dropdown';
import SearchBar from './Components/SearchBar/SearchBar';
import useDebounce from './hooks/useDebounce';
import './App.css';
import './Icons/icomoon.css';

function App() {

  const [searchKey, setSearchKey] = useState("");
  const debounceKey = useDebounce(searchKey, 2000);

  useEffect(()=>{console.log(">> debounceKey: ", debounceKey)},[debounceKey]);

  const handleChange = (e: SyntheticEvent) => {
    setSearchKey(e.target.value);
  };

  const onMenuItemClick = (id: string) => {
    console.log(">> id: ", id);
  }

  const menuItems = [
    {
      title: "Sort by episode, asc",
      id: "1",
    },
    {
      title: "Sort by episode, desc",
      id: "2",
    },
    {
      title: "Sort by year, asc",
      id: "3"
    },
    {
      title: "Sort by year, desc",
      id: "4"
    }
  ];

  const buttonText = "Sort By";
  return (
    <>
      <SearchBar
        searchKey={searchKey}
        handleChange={handleChange}
      />
      <br/>
      <br/>
      <Dropdown 
        onMenuItemClick={onMenuItemClick}
        menuItems={menuItems}
        buttonText={buttonText}
      />
    </>
  )
}

export default App
