import React, { memo, useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import icons from '../../../utils/icons.util';
import useDebounce from '../../../hook/useDebounce';
import { apiGetProducts } from '../../../apis';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../_store';

const { RiArrowDownSLine } = icons;

const FilterPrice = ({ name }) => {
  const dispatch = useDispatch();
  const { showFilter } = useSelector((state) => state.products);
  const [bestPrice, setBestPrice] = useState(null);
  const [searchParams] = useSearchParams();

  const [price, setPrice] = useState({
    from: null,
    to: null,
  });
  const navigate = useNavigate();
  const handleChangeFilter = (name) => {
    showFilter === name
      ? dispatch(productActions.setShowFilter({ showFilter: null }))
      : dispatch(productActions.setShowFilter({ showFilter: name }));
  };

  useEffect(() => {
    const fetchBestPriceProduct = async () => {
      const response = await apiGetProducts({ sort: '-price', limit: 1 });
      if (response.success === true) setBestPrice(response.products[0].price);
    };

    fetchBestPriceProduct();
  }, []);

  const deboucePriceFrom = useDebounce(price.from, 1000);
  const deboucePriceTo = useDebounce(price.to, 1000);
  useEffect(() => {
    const queries = Object.fromEntries([...searchParams]);

    if (price.from) queries['price[gte]'] = price.from;

    if (price.to) queries['price[lte]'] = price.to;

    if (!price.from && !price.to) {
      delete queries['price[gte]'];
      delete queries['price[lte]'];
      dispatch(productActions.setCurrentPage({ currentPage: 1 }));
      queries.page = 1;
    }

    navigate({
      pathname: `/${'products'}`,
      search: createSearchParams(queries).toString(),
    });
  }, [deboucePriceFrom, deboucePriceTo]);

  useEffect(() => {
    if (price.from && price.to && +price.from > +price.to)
      alert('From cannot be greater than to');
  }, [price]);

  return (
    <div
      className={` relative flex items-center justify-between gap-3  p-3 pl-[20px] border   text-xs text-gray-600  ${
        showFilter === name ? ' border-gray-400 shadow' : ' border-gray-300'
      }`}
      onClick={() => handleChangeFilter(name)}
    >
      <span>{name}</span>

      <RiArrowDownSLine size={15} />

      {showFilter === name && (
        <div
          className="absolute top-[calc(100%+5px)] left-0 w-fit  border bg-white min-w-[348px] z-10 "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="m-4 ">
            <div className="flex justify-between items-center p-4 ">
              <div className="flex flex-col">
                <span>{`The highest price is ${Number(
                  bestPrice
                ).toLocaleString()} VND`}</span>
                <span>Default input value is USD</span>
              </div>
              <span
                className="underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setPrice({
                    from: null,
                    to: null,
                  });
                  handleChangeFilter(null);
                }}
              >
                Reset
              </span>
            </div>
            <div className="border-gray-500 border-t-2 pt-[20px] flex">
              <div className="flex items-center p-2 gap-2">
                <label htmlFor="from">From</label>
                <input
                  type="number"
                  id="from"
                  className="form-input"
                  value={price.from || ''}
                  onChange={(e) =>
                    setPrice((prev) => ({ ...prev, from: +e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center p-2 gap-2">
                <label htmlFor="to">To</label>
                <input
                  type="number"
                  id="to"
                  className="form-input"
                  value={price.to || ''}
                  pattern="[1-9][0-9]*"
                  onChange={(e) =>
                    setPrice((prev) => ({ ...prev, to: +e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(FilterPrice);
