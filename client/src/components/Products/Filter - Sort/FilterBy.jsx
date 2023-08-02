const FilterBy = ({ children }) => {
  return (
    <div className="w-[75%] flex flex-col gap-3">
      <div className=" text-lg font-medium ">Filter by</div>
      <div className="flex gap-2 flex-auto">{children}</div>
    </div>
  );
};
export default FilterBy;
