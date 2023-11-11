import React from 'react';
import '../Styles/DonutList.css';

const DonutList = ({ donuts }) => {
  return (
    <div className="donut-list">
      <div className='donut-title-box'>
        <h2>List of Donuts</h2>
      </div> 
      <ul className='donut-main-box'>
        {donuts.map((donut) => (
          <li key={donut.id}>
            <span>{donut.name}</span>
            <span>{donut.description}</span>
            <span>{donut.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutList;