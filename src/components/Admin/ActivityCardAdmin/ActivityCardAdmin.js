import React from 'react';
import './ActivityCardAdmin.scss';

export const ActivityCardAdmin = ({ event }) => {
  const { evenTitle, date } = event;

  return (
    <div className='ActivityCard-admin'>
      <div className='ActivityCard-content-admin'>
        <div className='Activity-info-admin'>
          <div className='date-admin'>
            <h3>{date.month}</h3>
            <h3>{date.day}</h3>
          </div>
          <div className='name-admin'>
            <h4>{evenTitle}</h4>
          </div>
        </div>
      </div>
      <div className='inscription-button-admin'>
        <h2>Inscribete</h2>
      </div>
    </div>
  );
};
