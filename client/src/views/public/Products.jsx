import { useEffect, useState } from 'react';
import { apiGetProducts } from 'apis';
import { Product } from 'components';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'components/ProductDetail';
import FilterCapacity from 'components/Products/Filter - Sort/FilterCapacity';
import FilterPrice from 'components/Products/Filter - Sort/FilterPrice';
import FilterBy from 'components/Products/Filter - Sort/FilterBy';
import SortBy from 'components/Products/Filter - Sort/SortBy';

const Products = () => {
  const [products, setProducts] = useState([]);

  const [params] = useSearchParams();

  useEffect(() => {
   const queries = Object.fromEntries([...params])

    const fetchProducts = async () => {
      const response = await apiGetProducts(queries);
      return setProducts(response.products);
    };

    fetchProducts();
  }, [params]);

  return (
    <div className="w-full">
      <div className=" w-main m-auto mt-8  p-3 flex justify-between items-center border">
        <FilterBy>
          <FilterPrice name={'Price'} />
          <FilterCapacity name={'Capacity'} />
        </FilterBy>
        <SortBy />
      </div>

      <div className="w-main m-auto mt-8">
        <div className=" grid grid-cols-4 gap-1 m-[-10px]">
          {products?.map((el) => (
            <Product key={el._id} pid={el._id} productData={el} />
          ))}
        </div>
      </div>

      <Pagination totalCount={201} pageSize={10} />
    </div>
  );
};

export default Products;
