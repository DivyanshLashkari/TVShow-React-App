import React, { useState } from 'react';
import ShowList from './ShowList';
import ShowDetails from './ShowDetails';

const App = () => {
  const [selectedShowId, setSelectedShowId] = useState(null);

  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  const handleBackButtonClick = () => {
    setSelectedShowId(null);
  };

  return (
    <div>
      {selectedShowId ? (
        <div>
          <button onClick={handleBackButtonClick}>Back to Show List</button>
          <ShowDetails showId={selectedShowId} />
        </div>
      ) : (
        <ShowList onShowClick={handleShowClick} />
      )}
    </div>
  );
};

export default App;
