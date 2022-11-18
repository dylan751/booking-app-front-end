import React from 'react';
import useFetch from '../../hooks/useFetch';
import { CountByCity } from '../../models/CountByCity';
import FeaturedSkeleton from '../LoadingSkeleton/FeaturedSkeleton';
import styles from './Featured.module.scss';

const Featured = () => {
  const { data, loading, error } = useFetch<CountByCity[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/count/byCity?cities=Krakow,Budapest,Madrid`,
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  const dummy_featured = [
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=',
      city: 'Krakow',
      propertyCount: data && data[0],
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=',
      city: 'Budapest',
      propertyCount: data && data[1],
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=',
      city: 'Madrid',
      propertyCount: data && data[2],
    },
  ];

  return (
    <div className={styles['featured']}>
      {loading ? (
        // <FeaturedSkeleton />
        'Loading Please wait...'
      ) : (
        <>
          {dummy_featured.map((featured, index) => (
            <div className={styles['featured__item']} key={index}>
              <img
                src={featured.src}
                alt=""
                className={styles['featured__item__img']}
              />
              <div className={styles['featured__item__title']}>
                <h1>{featured.city}</h1>
                <h2>{featured.propertyCount} properties</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Featured;
