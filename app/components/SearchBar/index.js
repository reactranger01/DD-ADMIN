import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';
const SearchBar = ({ onSearch, cssClass, getList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  // Debounce implementation using useCallback
  // const debounce = (func, delay) => {
  //   let timer;
  //   return (...args) => {
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handleSearch = useCallback(
  //   debounce((term) => {
  //     onSearch(term);
  //   }, 500), // 500ms delay
  //   [],
  // );
  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   handleSearch(e.target.value);
  // };
  // const handleButtonClick = () => {
  //   if (getList) {
  //     getList();
  //   }
  //   onSearch(searchTerm);
  // };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleButtonClick(e.target.value);
  };

  const handleButtonClick = (term) => {
    if (getList) {
      getList();
    }
    onSearch(term);
  };
  return (
    <div
      className={`flex relative h-8 items-center w-full max-w-md border border-gray-600 bg-white  p-1 text-xs ${cssClass}`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        readOnly={readOnly}
        onFocus={() => setReadOnly(false)}
        onBlur={() => setReadOnly(true)}
        placeholder="Search..."
        className="w-full outline-none text-gray-700"
      />
      <span className="text-black ay-center  right-3 text-18 lg:text-[20px]">
        <CiSearch />
      </span>
    </div>
  );
};
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  cssClass: PropTypes.any,
  getList: PropTypes.func,
};
export default SearchBar;
