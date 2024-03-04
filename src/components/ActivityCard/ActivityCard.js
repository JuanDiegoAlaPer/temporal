import React from 'react';
import './ActivityCard.scss';

export const ActivityCard = ({ event }) => {
  const { eventTitle, date } = event;

  return (
    <div className='ActivityCard'>
      <div className='ActivityCard-content'>
        <div className='Activity-info'>
          <div className='date'>
            <h3>{date.month}</h3>
            <h3>{date.day}</h3>
          </div>
          <div className='name'>
            <h4>{eventTitle}</h4>
          </div>
        </div>
      </div>
      <div className='inscription-button'>
        <h2>Inscribete</h2>
      </div>
    </div>
  );
};
