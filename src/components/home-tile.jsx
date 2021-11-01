import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './style.css'

const HomeTile = ({title, navigate}) => {

    const history = useHistory();

    return (
       <div className="tile-container" onClick={() => history.push(`${navigate}`)}>
           <h3>{title}</h3>
       </div>
    )
}

export default HomeTile
