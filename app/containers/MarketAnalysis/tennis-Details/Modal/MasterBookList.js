import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';

const MasterBookList = ({
  isopenMasterBookList,
  handlecloseMasterBookList,
}) => {
  return (
    <div>
      <div
        className={
          isopenMasterBookList
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-20'
            : 'hidden'
        }
      >
        <div className="text-sm text-white  text-center h-4 rounded-t-lg bg-[#040B1D] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row flex justify-between items-center">
          <h4 className="text-sm font-bold">MASTER Book</h4>
          <button className=" flex-none">
            <RxCross2
              className="h-4 w-4 "
              onClick={handlecloseMasterBookList}
            />
          </button>
        </div>
        <div className="relative  w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          <div className=" border border-slate-400">
            <div className="flex font-bold text-sm p-2 text-[#000000]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
MasterBookList.propTypes = {
  isopenMasterBookList: PropTypes.bool.isRequired,
  handlecloseMasterBookList: PropTypes.func.isRequired,
};

export default MasterBookList;
