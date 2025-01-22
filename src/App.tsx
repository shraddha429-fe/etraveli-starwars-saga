import Dropdown from './Components/Dropdown/Dropdown'
import './App.css'

function App() {
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
      <Dropdown 
        onMenuItemClick={onMenuItemClick}
        menuItems={menuItems}
        buttonText={buttonText}
      />
    </>
  )
}

export default App
