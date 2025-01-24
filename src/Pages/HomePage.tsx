import HomePageHeader from '../Components/HomePageHeader/HomePageHeader';
import MovieList from '../Components/MovieList/MovieList';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="main-container">
            <div className="header">
                <HomePageHeader/>
            </div>
            <div className="content">
                <div className="content-list">
                    <MovieList/>
                </div>
                <div className="divider" />
                <div className="content-details">
                    <div>Content-details</div>
                </div>
            </div>
            
        </div>
    )
};


export default HomePage;