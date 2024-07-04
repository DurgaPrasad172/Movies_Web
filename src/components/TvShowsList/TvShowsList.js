import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { fetchGenresList } from '../../redux/filtersSlice';
import './TvShowsList.css';

const TvShowsList = () => {
  const dispatch = useDispatch();
  console.log('TvShowsList.js Running');
  const tvShows = useSelector((state) => state.tvShows.list);
  const status = useSelector((state) => state.tvShows.status);
  const error = useSelector((state) => state.tvShows.error);

  const genresList = useSelector((state) => state.genres.genresList); 
  const filters=useSelector((state)=>state.genres);

  useEffect(() => {
    dispatch(fetchGenresList());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="Loading">
        <TailSpin type="Oval" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="tv-shows-container">
      <div className="tv-shows-grid">
        {tvShows && (
          tvShows.map((show) => (
            <div key={show.id} className="tv-show-card">
              <img
                className="tv-show-img"
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
               <p className='tv-show-title'>{show.name}</p>
          <p className='movie-info'>
               {show.genre_ids.length > 0 && genresList.length > 0 && (
                  <>{genresList.find((g) => g.id === show.genre_ids[0])?.name}</>
                )}{', '}
                {show.first_air_date.slice(0, 4)}
          </p>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        <ul>
          {/* Pagination logic can be implemented here */}
        </ul>
      </div>
    </div>
  );
};

export default TvShowsList;
