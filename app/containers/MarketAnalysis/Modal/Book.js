import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
const Book = ({ isopenBooking, handlecloseBooking }) => {
  return (
    <div>
      <div
        className={
          isopenBooking
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
            : 'hidden'
        }
      >
        <div className="text-sm text-white  text-center h-4 rounded-t-lg bg-[#040B1D] relative w-full max-w-lg mx-auto shadow-md px-8 py-4 row flex">
          <h4 className="mt-[-0.5rem] grow text-left text-sm font-bold">
            Book
          </h4>
          <button className=" flex-none">
            <RxCross2
              className="h-4 w-4 mt-[-0.5rem]   "
              onClick={handlecloseBooking}
            />
          </button>
        </div>
        <div className="relative  w-full max-w-lg mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          <div className=" bg-[#C1C1C1]">
            <div className="flex justify-around font-bold text-sm p-2 text-[#000000]">
              <h4>Run</h4>
              <h4>Amount</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Book.propTypes = {
  isopenBooking: PropTypes.bool.isRequired,
  handlecloseBooking: PropTypes.func.isRequired,
};
export default Book;
