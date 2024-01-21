import { useEffect, useState } from 'react';
import InputSelect from '../../common/InputSelect';
import { sorts } from '../../../utils/contants.util';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const SortBy = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState('');
  const [params] = useSearchParams();
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (sort.length > 0) queries.sort = sort;
    else delete queries.sort;

    navigate({
      pathname: `/${'products'}`,
      search: createSearchParams(queries).toString(),
    });
  }, [sort, navigate]);
  return (
    <div className="w-[25%] mb-[10px]   flex flex-col gap-3 ">
      <span className="text-lg font-medium">Sort by</span>
      <InputSelect
        value={sort}
        options={sorts}
        changeValue={(value) => setSort(value)}
      />
    </div>
  );
};
export default SortBy;
