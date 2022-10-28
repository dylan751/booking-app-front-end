import React from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './List.module.scss';

const List = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
    </div>
  );
};

export default List;
