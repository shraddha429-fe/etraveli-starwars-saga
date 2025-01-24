import './MovieDetail.css';

const MovieDetail = (props) => {
    const {movie} = props;
    const selectedMovie = movie[0];
    return (
        <div >
            {movie[0] ? (
                <div className="detail-container" >
                    <h4>{selectedMovie.title}</h4>
                    <p>{selectedMovie.opening_crawl}</p>
                    <p>{`Directed by: ${selectedMovie.director}`}</p>
                </div>
            ) :
            (
                <div className="default-container">
                    <h3>Click on a movie to view it's details</h3>
                </div>
            )}
            
        </div>
    )
};

export default MovieDetail;