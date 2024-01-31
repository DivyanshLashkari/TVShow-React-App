import React, { useState, useEffect } from 'react';

const ShowDetails = ({ showId, onBack }) => {
  const [show, setShow] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [showId]);

  const handleBookTicket = () => {
    setIsBookingModalOpen(true);
  };

  const handleModalClose = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingFormSubmit = (event) => {
    event.preventDefault();
    setIsBookingModalOpen(false);
  };

  return (
    <div className="container mt-5">
      {show && (
        <div className="card">
          <img src={show.image && show.image.medium} alt={show.name} className="card-img-top" />
          <div className="card-body">
            <h1 className="card-title">{show.name}</h1>
            <p className="card-text">{show.summary.replace(/<[^>]*>/g, '')}</p>
            <p className="card-text"><strong>Genres:</strong> {show.genres.join(', ')}</p>
            <p className="card-text"><strong>Premiered:</strong> {show.premiered}</p>
            <p className="card-text"><strong>Language:</strong> {show.language}</p>
            <p className="card-text"><strong>Rating:</strong> {show.rating.average}</p>
            <button onClick={handleBookTicket} className="btn btn-primary">
              Book Movie Ticket
            </button>
            <button onClick={onBack} className="btn btn-secondary ml-2">
              Back to Show List
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Movie Ticket</h5>
                <button type="button" className="close" onClick={handleModalClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Booking Form */}
                <form onSubmit={handleBookingFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="seat">Seat Number</label>
                    <input type="text" className="form-control" id="seat" required />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
