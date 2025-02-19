// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MainCard from '../components/MainCard'
import './index.css'

const HomePage: React.FC = () => {
  return (
    <div>
      <div className='main-section'>
        <MainCard></MainCard>
      </div>
      <div>
        <img src="./../../assets/home.png" alt="img" />
      </div>
    </div>
  );
};

export default HomePage;
