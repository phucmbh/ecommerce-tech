import { memo, useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { colors } from '../../../utils/contants.util';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../_store';

const FilterCapacity = ({ name }) => {
  const dispatch = useDispatch();
  const { showFilter } = useSelector((state) => state.products);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  console.log('io io io');

  const handleChangeFilter = (name) => {
    showFilter === name
      ? dispatch(productActions.setShowFilter({ showFilter: null }))
      : dispatch(productActions.setShowFilter({ showFilter: name }));
  };

  const handleCheckbox = (e) => {
    const alreadyChecked = selected.find((el) => el === e.target.value);
    if (alreadyChecked)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    dispatch(productActions.setShowFilter({ showFilter: null }));
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (selected.length > 0) queries.color = selected.join(',');
    else {
      delete queries.color;
      dispatch(productActions.setCurrentPage({ currentPage: 1 }));
      queries.page = 1;
    }
    navigate({
      pathname: `/${'products'}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  return (
    <div
      className={` relative flex items-center justify-between gap-3  p-3 pl-[20px] border   text-xs text-gray-600  ${
        showFilter === name ? ' border-gray-400 shadow' : ' border-gray-300'
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

      {showFilter === name && (
        <div
          className="absolute top-[calc(100%+5px)] left-0 w-fit  border bg-white min-w-[348px] z-10 "
          onClick={(e) => e.stopPropagation()}
        >
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
        </div>
      )}
    </div>
  );
};
export default memo(FilterCapacity);
