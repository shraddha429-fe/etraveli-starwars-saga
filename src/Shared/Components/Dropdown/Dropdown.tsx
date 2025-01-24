import { SyntheticEvent, useState } from 'react';
import './Dropdown.css';

interface MenuItem {
    title: string;
    id: string;
}

interface Props {
    buttonText: string;
    menuItems: MenuItem[];
    onMenuItemClick : (id: string) => void;
}

const Dropdown = (props : Props) => {
    const [open, setOpen] = useState(false);

    const { buttonText, menuItems, onMenuItemClick} = props;
    const [selected, setSelected] = useState();

    const handleMenuChange = (e: SyntheticEvent) => {
        const {id} = e.target;
        setSelected(id);
        onMenuItemClick(id);
        setOpen((open) => !open);
    }

    const handleOpen = () => {
        setOpen((open) => !open);
    }
    return(
        <div className="container">
            <div className='btn-container'>
                <button 
                    className="dropdownBtn" 
                    onClick={handleOpen}
                >
                    {buttonText}
                    <span className={open ? 'icon-cheveron-up': 'icon-cheveron-down'} />
                </button>
                
            </div>
            {open && 
                <div className='menu'>
                    {menuItems.map((item) => {
                        return (
                            <div 
                                id={item.id} 
                                onClick={handleMenuChange} 
                                key={item.id} 
                                className={`menuItem ${selected === item.id ? 'selected' : ''}`}
                            >
                                {item.title}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default Dropdown;