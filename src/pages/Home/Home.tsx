import React from 'react';
import Featured from '../../components/Featured/Featured';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className={styles['home__container']}>
        <Featured />
        <h1 className={styles['home__container__title']}>
          Browse by property type
        </h1>
      </div>
    </div>
  );
};

export default Home;