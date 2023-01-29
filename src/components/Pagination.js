import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../utils/usePagination';

import s from './Pagination.scss';

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className, arrowsSpacing } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames(s.Pagination__container, { [className]: className })}
      style={{ paddingInlineStart: '0px' }}
    >
      {/* Left navigation arrow */}
      <li
        key={'left-navigation'}
        style={{ marginRight: `${arrowsSpacing}em` }}
        className={classnames(s.Pagination__container_item, {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
          <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
        </svg>
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="Pagination__container_item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={classnames(s.Pagination__container_item, {
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
        key={'right-navigation'}
        style={{ marginLeft: `${arrowsSpacing}em` }}
        className={classnames(s.Pagination__container_item, {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
          <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
        </svg>
      </li>
    </ul>
  );
};

export default Pagination;
