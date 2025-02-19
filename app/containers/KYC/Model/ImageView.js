import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
const ImageView = ({ viewImage, ClosedImageView, imageUrl }) => {
  return (
    <div
      className={
        viewImage
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-28 sm:px-0  font-semibold text-gray-700 z-10'
          : 'hidden'
      }
    >
      <div className="text-sm font-bold text-center h-4 rounded-t-lg bg-[#071535] relative w-full max-w-md mx-auto shadow-md px-8 py-4 row  grid grid-cols-6 text-white">
        <h4 className="mt-[-0.5rem] w-16  col-start-1 col-end-1 ">
          Doccument Image{' '}
        </h4>
        <button className="col-start-6 col-end-7 ">
          <RxCross2
            className="h-4 w-4 ml-16 mt-[-1.5rem]"
            onClick={ClosedImageView}
          />
        </button>
      </div>
      <div className="relative w-full max-w-sm mx-auto shadow-md rounded-b-lg bg-white px-4 py-4">
        <img src={imageUrl} alt="image" />
      </div>
    </div>
  );
};
ImageView.propTypes = {
  viewImage: PropTypes.bool.isRequired,
  ClosedImageView: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ImageView;
