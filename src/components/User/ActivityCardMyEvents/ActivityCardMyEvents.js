import React from 'react';
import './ActivityCardMyEvents.scss';
import { Link } from 'react-router-dom';

export const ActivityCardMyEvents = ({ event }) => {
  const { evenTitle, date, image } = event;
  const imageUrl = `http://localhost:3200/api/v1/events/images/${image}`;

  return (
    <div className='ActivityCard-myevent'>
      <div className='ActivityCard-content-myevent'>
      <img src={imageUrl} alt={evenTitle} className='event-image-myevent' />
        <div className='Activity-info-myevent'>
          <div className='date-myevent'>
            <h3>{date.month}</h3>
            <h3>{date.day}</h3>
          </div>
          <div className='name-myevent'>
            <h4>{evenTitle}</h4>
          </div>
        </div>
      </div>
      {/* <div className='inscription-button-myevent'>
        <Link style={{textDecoration: "none", color:"inherit"}} to={`/inscribeFormUser/${event._id}`}>
          <h2>Desinscribete</h2>
        </Link>
      </div> */}
    </div>
  );
};