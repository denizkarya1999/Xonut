import React, { useState, useEffect } from 'react';
import DonutList from '../Components/DonutList';
import '../Styles/Home.css';
import pinkDonutImage from '../Images/pinkDonut.png';
import blackDonutImage from '../Images/blackDonut.png';
import strawberryDonutImage from '../Images/strawberryDonut.png';
import DonutsImage from '../Images/donuts.png';

const currentYear = new Date().getFullYear();

const Home = () => {
  const [donuts, setDonuts] = useState([]);

  useEffect(() => {
    document.title = 'Xonut: Donut Shop by X-27 (Staff Mode)';
    fetch('http://localhost:8080/projects/donutAPI/')
    .then(response => response.json())
    .then(json => {
      setDonuts(json);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
  <div className='home'>
    <header>
     <div className='title-box'>
       <h1>Xonut - Staff Edition</h1>
     </div>
    </header>
    <main className="container">
      <div className='main-box'>
         <DonutList donuts={donuts} />
      </div>
      <div className='image-box'>
      <img src={pinkDonutImage} />
      <img src={blackDonutImage} />
      <img src={strawberryDonutImage} />
      <img src={DonutsImage} />
      </div>
    </main>
    <footer>
      <div className='footer-box'>
        <p>&copy; {currentYear} Deniz K Acikbas, All rights are reserved.</p>
      </div>
    </footer>
  </div>
  );
};

export default Home;