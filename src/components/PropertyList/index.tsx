import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { CountByType } from '../../models/CountByType';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './PropertyList.module.scss';
import { useNavigate } from 'react-router-dom';
import PropertyListSkeleton from '../LoadingSkeleton/PropertyListSkeleton';

const PropertyList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<CountByType[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/count/byType`,
  );

  const images = [
    'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg',
  ];

  const [slidesNumber, setSlidesNumber] = useState(
    window.innerWidth > 1024
      ? 4
      : window.innerWidth > 768
      ? 3
      : window.innerWidth > 480
      ? 2
      : 1,
  );
  useEffect(() => {
    const handleResize = () => {
      setSlidesNumber(
        window.innerWidth > 1024
          ? 4
          : window.innerWidth > 768
          ? 3
          : window.innerWidth > 480
          ? 2
          : 1,
      );
    };

    window.addEventListener('resize', handleResize);
  }, [window.innerWidth]);

  const handleClick = (propertyType: string) => {
    navigate(`/all-${propertyType}`);
    location.reload();
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['property-list']}>
      {loading ? (
        <PropertyListSkeleton count={slidesNumber} />
      ) : (
        <Swiper spaceBetween={10} slidesPerView={slidesNumber}>
          {data &&
            images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className={styles['property-list']}>
                  <div className={styles['property-list__item']}>
                    <img
                      src={img}
                      alt=""
                      className={styles['property-list__item__img']}
                      onClick={() => handleClick(data[index]?.type)}
                    />
                    <div className={styles['property-list__item__title']}>
                      <h1>{data[index]?.type}</h1>
                      <h2>{`${data[index]?.count} ${data[index]?.type}`}</h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default PropertyList;
