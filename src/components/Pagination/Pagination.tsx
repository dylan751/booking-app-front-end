import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../hooks/usePagination';
import './Pagination.scss';

interface PaginationProps {
  onPageChange: any;
  totalCount?: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
}

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange as any).length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = (paginationRange as any)[
    (paginationRange as any).length - 1
  ];

  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange?.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
