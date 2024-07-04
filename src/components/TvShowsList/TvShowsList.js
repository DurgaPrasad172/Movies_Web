import React from 'react';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import './TvShowsList.css';

const TvShowsList = () => {
  console.log('TvShowsList.js Running');
  const tvShows = useSelector((state) => state.tvShows.list);
  const status = useSelector((state) => state.tvShows.status);
  const error = useSelector((state) => state.tvShows.error);

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
              <div>
                <p className="tv-show-info">{show.name}</p>
                <p className="tv-show-info">{show.genre_ids[0]},{show.first_air_date.slice(0, 4)}</p>
              </div>
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
