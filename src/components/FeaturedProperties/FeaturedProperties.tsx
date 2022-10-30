import React from 'react';
import styles from './FeaturedProperties.module.scss';

const FeaturedProperties = () => {
  return (
    <div className={styles['featured-properties']}>
      <div className={styles['featured-properties__item']}>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className={styles['featured-properties__item__img']}
        />
        <span className={styles['featured-properties__item__name']}>
          Aparthotel Stare Miasto
        </span>
        <span className={styles['featured-properties__item__city']}>
          Madrid
        </span>
        <span className={styles['featured-properties__item__price']}>
          Starting from $120
        </span>
        <div className={styles['featured-properties__item__rating']}>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className={styles['featured-properties__item']}>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className={styles['featured-properties__item__img']}
        />
        <span className={styles['featured-properties__item__name']}>
          Aparthotel Stare Miasto
        </span>
        <span className={styles['featured-properties__item__city']}>
          Madrid
        </span>
        <span className={styles['featured-properties__item__price']}>
          Starting from $120
        </span>
        <div className={styles['featured-properties__item__rating']}>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className={styles['featured-properties__item']}>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className={styles['featured-properties__item__img']}
        />
        <span className={styles['featured-properties__item__name']}>
          Aparthotel Stare Miasto
        </span>
        <span className={styles['featured-properties__item__city']}>
          Madrid
        </span>
        <span className={styles['featured-properties__item__price']}>
          Starting from $120
        </span>
        <div className={styles['featured-properties__item__rating']}>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className={styles['featured-properties__item']}>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className={styles['featured-properties__item__img']}
        />
        <span className={styles['featured-properties__item__name']}>
          Aparthotel Stare Miasto
        </span>
        <span className={styles['featured-properties__item__city']}>
          Madrid
        </span>
        <span className={styles['featured-properties__item__price']}>
          Starting from $120
        </span>
        <div className={styles['featured-properties__item__rating']}>
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
