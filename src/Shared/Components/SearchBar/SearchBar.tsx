import { ReactElement, ChangeEvent } from "react";
import './SearchBar.css';
import '../../../Icons/icomoon.css';

interface Props {
    Icon?: ReactElement,
    searchKey : string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    position?: string,
    placeholder?: string,
}

const SearchBar = (props: Props) => {
    const { searchKey, handleChange, placeholder } = props;

    return (
        <div className="search-container">
            <input 
                type="search" 
                value={searchKey} 
                onChange={handleChange} 
                placeholder={placeholder}
            />
            <span className="icon-search"></span>
        </div>
    )

};

export default SearchBar;