import { useState } from 'react';
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
    const [selected, setSelected] = useState<string>();

    const handleMenuChange = (menuId: string) => {
        setSelected(menuId);
        onMenuItemClick(menuId);
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
                                onClick={()=>handleMenuChange(item.id)} 
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