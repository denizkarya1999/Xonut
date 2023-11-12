import React from 'react';
import '../Styles/DonutList.css';

const DonutList = ({ donuts }) => {
  return (
    <div className="donut-list">
      <div className='donut-title-box'>
        <h2>Donut Orders</h2>
      </div> 
      <ul className='donut-main-box'>
        {donuts.map((donut) => (
          <li key={donut.id}>
            <span>&nbsp;{donut.name}</span>
            <span> | </span>
            <span><sub><em>{donut.description}</em></sub></span>
            <span> | </span>
            <span><sub>${donut.price}&nbsp;</sub></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutList;