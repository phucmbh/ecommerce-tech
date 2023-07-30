import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from '../../_store/categories.slice';
import icons from '../../utils/icons.util';

const { IoIosArrowForward } = icons;

const HotCollections = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  return (
    <div className="my-8  w-full">
      <h3 className=" text-[20px] py-[15px] border-b-2 border-main">
        HOT COLLECTIONS
      </h3>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {categories?.map((el) => (
          <div key={el._id} className="">
            <div className="flex border  p-5">
              <div className="w-[50%] flex justify-center items-center">
                <img
                  src={el?.image}
                  alt=""
                  className="w-[145px] h-[129px] object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h4 className="font-semibold uppercase text-gray-700">
                  {el?.title}
                </h4>
                <ul className="text-sm">
                  {el?.brand?.map((item) => (
                    <span
                      key={item}
                      className="flex gap-1 items-center text-gray-400 hover:text-red-600"
                    >
                      <IoIosArrowForward />
                      <li>{item}</li>
                    </span>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotCollections;
