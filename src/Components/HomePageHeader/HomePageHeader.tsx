import { SyntheticEvent, useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import Dropdown from "../../Shared/Components/Dropdown/Dropdown";
import SearchBar from "../../Shared/Components/SearchBar/SearchBar";

const HomePageHeader = () => {
    const [searchKey, setSearchKey] = useState('');
  const debounceKey = useDebounce(searchKey, 2000);

  useEffect(() => {
    console.log('>> debounceKey: ', debounceKey);
  }, [debounceKey]);

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

    const searchPlaceholder = "Type to search...";

  const handleChange = (e: SyntheticEvent) => {
    setSearchKey(e.target.value);
  };

  const onMenuItemClick = (id: string) => {
    console.log('>> id: ', id);
  };

    return (
        < >
            <div className="sort-container" >
            <Dropdown
                onMenuItemClick={onMenuItemClick}
                menuItems={menuItems}
                buttonText={buttonText}
            />
            </div>
            <div className="search-container" >
                <SearchBar 
                    searchKey={searchKey} 
                    handleChange={handleChange} 
                    placeholder={searchPlaceholder}
                /> 
            </div>
            
        </>
    )
};

export default HomePageHeader;