import React from 'react';
import './ActivityCardUser.scss';

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
        <h2>Inscribete</h2>
      </div>
    </div>
  );
};
