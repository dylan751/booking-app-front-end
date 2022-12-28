import React from 'react';
import FeaturedCity from '../../components/FeaturedCity';
import FeaturedProperties from '../../components/FeaturedProperties';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MailList from '../../components/MailList';
import Navbar from '../../components/Navbar';
import PropertyList from '../../components/PropertyList';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className={styles['home-page__container']}>
        <div className={styles['home-page__container__property-list']}>
          <h1 className={styles['home-page__container__property-list__title']}>
            Browse by property type
          </h1>
          <PropertyList />
        </div>
        <FeaturedCity />
        <div className={styles['home-page__container__featured-properties']}>
          <h1
            className={
              styles['home-page__container__featured-properties__title']
            }
          >
            Stay at our top unique properties
          </h1>
          <span>
            {`From castles and villas to boats and igloos, we've got it all`}
          </span>
          <FeaturedProperties type="Apartment" />
        </div>
        <div className={styles['home-page__container__featured-properties']}>
          <h1
            className={
              styles['home-page__container__featured-properties__title']
            }
          >
            Home guests love
          </h1>
          <FeaturedProperties type="Hotel" />
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
