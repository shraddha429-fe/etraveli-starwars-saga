import './MovieDetail.css';
import '../../Shared/Components/Icon/Icon.css';
import { Film } from '../../types/movieTypes';

interface Props {
  movie: Film;
}

const MovieDetail = (props: Props) => {
  const { movie } = props;
  return (
    <div className="detail-container">
      <h4>{movie?.title}</h4>
      <p>{movie?.opening_crawl}</p>
      <p>{`Directed by: ${movie?.director}`}</p>
    </div>
  );
};

export default MovieDetail;
