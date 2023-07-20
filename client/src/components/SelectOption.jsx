import React from 'react';
import { PropTypes } from 'prop-types';

function SelectOption({ icon }) {
  return (
    <div className="w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center hover:bg-gray-800 hover:border-gray-800 hover:text-white  cursor-pointer">
      {icon}
    </div>
  );
}

SelectOption.propTypes = {
  icon: PropTypes.object,
};

export default SelectOption;
