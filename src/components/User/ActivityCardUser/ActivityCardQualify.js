import React from 'react';
import './ActivityCardQualify.scss';
import { Link } from 'react-router-dom';

export const ActivityCardQualify = ({ event }) => {
  if (!event) return null; // Si event no está definido, retorna null o algún otro componente de carga

  const { evenTitle, date, image } = event;
  const imageUrl = `http://localhost:3200/api/v1/events/images/${image}`;

  return (
    <div className='ActivityCard-qualify'>
      <div className='ActivityCard-content-qualify'>
      <img src={imageUrl} alt={evenTitle} className='event-image-qualify' />
        <div className='Activity-info-qualify'>
          <div className='date-qualify'>
            {date && (
              <>
                <h3>{date.month}</h3>
                <h3>{date.day}</h3>
              </>
            )}
          </div>
          <div className='name-qualify'>
            <h4>{evenTitle}</h4>
          </div>
        </div>
      </div>
      <div className='inscription-button-qualify'>
        <Link style={{textDecoration: "none", color:"inherit"}} to={`/qualify/${event._id}`}>
          <h2>Calificar</h2>
        </Link>
      </div>
    </div>
  );
};