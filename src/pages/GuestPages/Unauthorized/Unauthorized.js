import React from 'react'
import { Link } from 'react-router-dom';
import './Unauthorized.scss'

export const Unauthorized = () => {
  return (
    <div className="content-unauthorized">
      <div className="card-unauthorized">
        <h2>401</h2>
        <h4>No permitido</h4>
        <Link to="/">
            <button type="button">Regresar</button>
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized;