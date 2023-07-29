import React, { useEffect, useState } from 'react';
import icons from '../utils/icons.util';
import { colors } from '../utils/contants.util';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { apiGetProducts } from '../apis';
import useDebounce from './../hook/useDebounce';

const { RiArrowDownSLine } = icons;

const SearchItem = ({
  name,
  activeClick,
  handleChangeFilter,
  type = 'checkbox',
}) => {
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: '',
    to: '',
  });
  const navigate = useNavigate();
  const handleCheckbox = (e) => {
    const alreadyChecked = selected.find((el) => el === e.target.value);
    if (alreadyChecked)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);

    handleChangeFilter(null);
  };

  useEffect(() => {
    if (selected.length > 0)
      navigate({
        pathname: `/${'products'}`,
        search: createSearchParams({
          color: selected.join(','),
        }).toString(),
      });
    else navigate(`/${'products'}`);
  }, [selected]);

  useEffect(() => {
    const fetchBestPriceProduct = async () => {
      const response = await apiGetProducts({ sort: '-price', limit: 1 });
      if (response.success === true) setBestPrice(response.products[0].price);
    };

    if (type === 'input') fetchBestPriceProduct();
  }, [type]);

  const deboucePriceFrom = useDebounce(price.from, 500);
  const deboucePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    const data = {};
    if (+price.from > 0) data.from = price.from;
    if (+price.to > 0) data.to = price.to;

    navigate({
      pathname: `/${'products'}`,
      search: createSearchParams(data).toString(),
    });
  }, [deboucePriceFrom, deboucePriceTo]);

  useEffect(() => {
    if (+price.from > +price.to) alert('From cannot be greater than to');
  }, [price]);

  return (
    <div
      className={` relative flex items-center justify-between gap-3  p-3 pl-[20px] border   text-xs text-gray-600  ${
        activeClick === name ? ' border-gray-400 shadow' : ' border-gray-300'
      }`}
      onClick={() => handleChangeFilter(name)}
    >
      <span>{name}</span>

      {selected == 0 ? (
        <span className=" w-[17px] h-[17px]  "></span>
      ) : (
        <span className="bg-slate-200 rounded-full w-[17px] h-[17px] flex justify-center items-center">
          {selected?.length}
        </span>
      )}
      <RiArrowDownSLine size={15} />

      {activeClick === name && (
        <div
          className="absolute top-[calc(100%+5px)] left-0 w-fit  border bg-white min-w-[348px] z-10 "
          onClick={(e) => e.stopPropagation()}
        >
          {type === 'checkbox' && (
            <div className="m-4 ">
              <div className="flex justify-between items-center p-4 ">
                <span>{`${selected.length} selected`}</span>
                <span
                  className="underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="border-gray-500 border-t-2 pt-[20px]">
                {colors.map((el) => (
                  <div
                    key={el.id}
                    className="flex items-center py-2 gap-3   text-sm "
                  >
                    <input
                      type="checkbox"
                      name={el.color}
                      value={el.color}
                      onChange={handleCheckbox}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el.color
                      )}
                      className="cursor-pointer"
                    />
                    <label htmlFor={el.color}>{el.color}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'input' && (
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
                      from: '',
                      to: '',
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
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center p-2 gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    type="number"
                    id="to"
                    className="form-input"
                    value={price.to}
                    pattern="[1-9][0-9]*"
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchItem;
