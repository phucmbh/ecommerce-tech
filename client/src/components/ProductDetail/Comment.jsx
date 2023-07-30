import moment from 'moment';
import { renderStarFromNumber } from '../../utils/helper';

const Comment = ({ avatar, name, comment, star, updatedAt }) => {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img src={avatar} alt="" className="w-[40px] h-[40px] object-cover" />
          <h3 className="font-semibold">{name}</h3>
        </div>
        <span className='italic'>{moment(updatedAt)?.fromNow()}</span>
      </div>
      <div className="flex flex-col flex-auto gap-1 bg-slate-50 border rounded p-2 w-[95%] self-end">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Rate: </span>
          <span className="flex gap-2">{renderStarFromNumber(star)}</span>
        </div>

        <div className="flex gap-2">
          <span className="font-semibold">Comment: </span>
          <span>{comment}</span>
        </div>
      </div>
    </div>
  );
};
export default Comment;
