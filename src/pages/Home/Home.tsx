import React from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;