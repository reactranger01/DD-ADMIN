import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import MasterBookList from './MasterBookList';

const MasterBook = ({ isopenMasterBook, handlecloseMasterBook }) => {
  const [isopenMasterBookList, setMasterBookList] = useState(false);
  const handleMasterBookList = () => {
    setMasterBookList(true);
  };
  return (
    <div>
      <div
        className={
          isopenMasterBook
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
            : 'hidden'
        }
      >
        <div className="text-sm text-white  text-center h-4 rounded-t-lg bg-[#040B1D] relative w-full max-w-3xl mx-auto shadow-md px-8 py-4 row flex justify-between items-center">
          <h4 className="text-sm font-bold">Market List</h4>
          <button className=" flex-none">
            <RxCross2 className="h-4 w-4 " onClick={handlecloseMasterBook} />
          </button>
        </div>
        <div className="relative  w-full max-w-3xl mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          <div className=" border border-slate-400">
            <div className="flex font-bold text-sm p-2 text-[#000000]">
              <h4 onClick={handleMasterBookList} className="cursor-pointer">
                Bookmaker IPL CUP
              </h4>
            </div>
          </div>
        </div>
      </div>
      <MasterBookList
        isopenMasterBookList={isopenMasterBookList}
        handlecloseMasterBookList={() => {
          setMasterBookList(false);
        }}
      />
    </div>
  );
};
MasterBook.propTypes = {
  isopenMasterBook: PropTypes.bool.isRequired,
  handlecloseMasterBook: PropTypes.func.isRequired,
};
export default MasterBook;
