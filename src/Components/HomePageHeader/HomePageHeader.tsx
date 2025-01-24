import { SyntheticEvent} from 'react';
import Dropdown from "../../Shared/Components/Dropdown/Dropdown";
import SearchBar from "../../Shared/Components/SearchBar/SearchBar";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchKey, setSortId } from '../../Reducers/HomePageSlice';

const HomePageHeader = () => {

    const dispatch = useAppDispatch();
        const { searchKey } = useAppSelector((state)=> state.homePage);

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
    dispatch(setSearchKey(e.target.value));
  };

  const onMenuItemClick = (id: string) => {
    dispatch(setSortId(id));
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