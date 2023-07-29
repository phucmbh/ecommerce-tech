import React, { useCallback, useEffect, useState } from 'react';
import { apiGetProducts } from '../../apis';
import { InputSelect, Product, SearchItem } from '../../components';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { sorts } from '../../utils/contants.util';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState('');

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);

    const queries = {};
    for (let i of params) queries[i[0]] = i[1];

    let priceQuery = {};
    if (queries.from && queries.to) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.from;
      delete queries.to;
    }

    if (queries.from) {
      queries.price = { gte: queries.from };
      delete queries.from;
    }

    if (queries.to) {
      queries.price = { lte: queries.to };
      delete queries.to;
    }

    const fetchProducts = async () => {
      const response = await apiGetProducts({ ...priceQuery, ...queries });
      return setProducts(response.products);
    };

    fetchProducts();
  }, [params]);

  const handleChangeFilter = useCallback(
    (name) => {
      activeClick === name ? setActiveClick(null) : setActiveClick(name);
    },
    [activeClick]
  );

  const changeValueSort = useCallback(
    (value) => {
      setSort(value);
    },

    [sort]
  );

  useEffect(() => {
    navigate({
      pathname: `/${'products'}`,
      search: createSearchParams({ sort }).toString(),
    });
  }, [sort]);
  return (
    <div className="w-full">
      <div></div>
      <div className=" w-main m-auto mt-8 flex justify-between items-center border">
        <div className="w-[75%]  p-3 ">
          <div className="mb-[10px] text-lg font-medium ">Filter by</div>
          <div className="flex gap-2 flex-auto">
            <SearchItem
              type="input"
              name={'Price'}
              activeClick={activeClick}
              handleChangeFilter={handleChangeFilter}
            />
            <SearchItem
              name={'Capacity'}
              activeClick={activeClick}
              handleChangeFilter={handleChangeFilter}
            />
          </div>
        </div>
        <div className="w-[25%] mb-[10px] text-lg font-medium  flex flex-col gap-3 ">
          <span>Sort by</span>
          <InputSelect
            value={sort}
            options={sorts}
            changeValue={changeValueSort}
          />
        </div>
      </div>

      <div className="w-main m-auto mt-8">
        <div className=" grid grid-cols-4 gap-1 m-[-10px]">
          {products?.map((el) => (
            <Product key={el._id} pid={el._id} productData={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
