import React, { useState, useEffect } from 'react';
import ShowDetails from './ShowDetails';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  const handleBackToShowList = () => {
    setSelectedShowId(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Show List</h1>
      {selectedShowId ? (
        <ShowDetails showId={selectedShowId} onBack={handleBackToShowList} />
      ) : (
        <div className="row">
          {shows.map((show) => (
            <div key={show.show.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={show.show.image && show.show.image.medium} alt={show.show.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{show.show.name}</h5>
                  <p className="card-text">{show.show.summary.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                  <button onClick={() => handleShowClick(show.show.id)} className="btn btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowList;
