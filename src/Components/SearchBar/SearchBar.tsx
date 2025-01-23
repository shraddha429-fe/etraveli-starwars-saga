import { ReactElement, SyntheticEvent } from "react";
import './SearchBar.css';
import '../../Icons/icomoon.css';

interface Props {
    Icon?: ReactElement,
    searchKey : string,
    handleChange: (e: SyntheticEvent) => void,
    position?: string,
}

const SearchBar = (props: Props) => {
    const { searchKey, handleChange } = props;

    return (
        <div className="search-container">
            
            <input type="search" value={searchKey} onChange={handleChange} />
            <i className="icon-search"/>
        </div>
    )

};

export default SearchBar;