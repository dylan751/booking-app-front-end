import React from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['header__list']}>
        <div className={styles['header__list__item']}></div>
      </div>
    </div>
  );
};
