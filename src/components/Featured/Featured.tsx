import React from 'react';
import useFetch from '../../hooks/useFetch';
import { CountByCity } from '../../models/CountByCity';
import styles from './Featured.module.scss';

const Featured = () => {
  const { data, loading, error } = useFetch<CountByCity[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/count/byCity?cities=berlin,madrid,london`,
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['featured']}>
      {loading ? (
        'Loading Please wait'
      ) : (
        <>
          <div className={styles['featured__item']}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className={styles['featured__item__img']}
            />
            <div className={styles['featured__item__title']}>
              <h1>Berlin</h1>
              <h2>{data && data[0]} properties</h2>
            </div>
          </div>
          <div className={styles['featured__item']}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className={styles['featured__item__img']}
            />
            <div className={styles['featured__item__title']}>
              <h1>Madrid</h1>
              <h2>{data && data[1]} properties</h2>
            </div>
          </div>
          <div className={styles['featured__item']}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className={styles['featured__item__img']}
            />
            <div className={styles['featured__item__title']}>
              <h1>London</h1>
              <h2>{data && data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
