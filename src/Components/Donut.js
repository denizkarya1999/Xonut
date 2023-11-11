import React from 'react';
import '../Styles/Donut.css';

const Donut = ({ name, description, price }) => {
  return (
    <div className="donut">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Donut;