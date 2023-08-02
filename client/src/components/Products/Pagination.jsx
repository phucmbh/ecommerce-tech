import clsx from 'clsx';
import { usePagination } from '../../hook/usePagination';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../_store';

const Pagination = ({
  totalCount,
  siblingCount = 1,
  pageSize,
  className = '',
}) => {

  const dispatch = useDispatch()
  const { currentPage } = useSelector(state => state.products)

  

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const onPageChange = (page) => {
    dispatch(productActions.setCurrentPage({currentPage: page}))
    let param = [];
    for (let i of params.entries()) param.push(i);

    const queries = {};
    for (let i of params) queries[i[0]] = i[1];
    queries.page = page;

    navigate({
      pathname: `/${'products'}`,
      search: createSearchParams(queries).toString(),
    });
  };

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const baseStyles =
    'px-2.5 py-1 flex justify-center items-center rounded-md font-inter text-[0.813rem]  border border-neutral-200 cursor-pointer';

  return (
    <div className="w-main mx-auto my-10 flex justify-between">
      <div>{`Show product ${(currentPage - 1) * pageSize + 1} - ${
        currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize
      } of ${totalCount}`}</div>

      <ul className={clsx('flex flex-wrap gap-2', className)}>
        <li
          className={clsx(baseStyles, {
            hidden: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === 'DOTS') {
            return (
              <li key={index} className="select-none">
                ...
              </li>
            );
          }
          return (
            <li
              key={index}
              className={clsx(baseStyles, {
                'font-bold text-gray-50 bg-red-600': pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={clsx(baseStyles, {
            hidden: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
