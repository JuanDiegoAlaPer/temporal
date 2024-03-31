import React from 'react';
import './ActivityCardUser.scss';
import { Link } from 'react-router-dom';

export const ActivityCardUser = ({ event }) => {
  const { evenTitle, date } = event;

  return (
    <div className='ActivityCard-user'>
      <div className='ActivityCard-content-user'>
        <div className='Activity-info-user'>
          <div className='date-user'>
            <h3>{date.month}</h3>
            <h3>{date.day}</h3>
          </div>
          <div className='name-user'>
            <h4>{evenTitle}</h4>
          </div>
        </div>
      </div>
      <div className='inscription-button-user'>
        <Link style={{textDecoration: "none", color:"inherit"}} to={`/inscribeFormUser/${event._id}`}>
          <h2>Inscribete</h2>
        </Link>
      </div>
    </div>
  );
};
