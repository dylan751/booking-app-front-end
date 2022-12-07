import React from 'react';
import { Hotel } from '../../models/Hotel';
import styles from './AllHotelList.module.scss';
import AllHotelListItem from './AllHotelListItem';

const dummyHotel: Hotel[] = [
  {
    _id: 1,
    name: 'Smarana Hanoi Heritage',
    type: 'Hotel',
    city: 'Hanoi',
    address: 'Cau Giay, Hanoi',
    distance: '30',
    photos: [
      'https://cf.bstatic.com/xdata/images/hotel/square200/410277300.webp?k=7d88e6bcd3df515b96a6afd8f6dc689529fd215ceaf437e0b8a24fb66c5a4081&o=',
    ],
    title: 'Smarana Hanoi Heritage title',
    description: 'Description',
    rating: 9.9,
    rooms: [],
    cheapestPrice: 50,
    featured: false,
  },
  {
    _id: 2,
    name: 'Smarana Hanoi Heritage 2',
    type: 'Hotel',
    city: 'Hanoi',
    address: 'Cau Giay, Hanoi',
    distance: '30',
    photos: [
      'https://cf.bstatic.com/xdata/images/hotel/square200/410277300.webp?k=7d88e6bcd3df515b96a6afd8f6dc689529fd215ceaf437e0b8a24fb66c5a4081&o=',
    ],
    title: 'Smarana Hanoi Heritage title',
    description: 'Description',
    rating: 9.9,
    rooms: [],
    cheapestPrice: 50,
    featured: false,
  },
  {
    _id: 3,
    name: 'Smarana Hanoi Heritage 3',
    type: 'Hotel',
    city: 'Hanoi',
    address: 'Cau Giay, Hanoi',
    distance: '30',
    photos: [
      'https://cf.bstatic.com/xdata/images/hotel/square200/410277300.webp?k=7d88e6bcd3df515b96a6afd8f6dc689529fd215ceaf437e0b8a24fb66c5a4081&o=',
    ],
    title: 'Smarana Hanoi Heritage title',
    description: 'Description',
    rating: 9.9,
    rooms: [],
    cheapestPrice: 50,
    featured: false,
  },
];

const AllHotelList = () => {
  return (
    <div className={styles['hotel-list']}>
      <div className={styles['hotel-list__container']}>
        <div className={styles['hotel-list__container__header']}>
          <h3>Last minute hotels near you</h3>
          <p>Find a great deal on a hotel for tonight or an upcoming trip</p>
        </div>
        <div className={styles['hotel-list__container__items']}>
          {dummyHotel.map((hotel) => (
            <AllHotelListItem key={hotel._id} item={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllHotelList;
