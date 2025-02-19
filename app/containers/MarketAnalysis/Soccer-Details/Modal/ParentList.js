import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { getAuthData } from '@/utils/apiHandlers';
const ParentList = ({
  isopenParentList,
  isuserName,
  handlecloseParentList,
}) => {
  const [parentsData, setParentsData] = useState([]);
  let user = isuserName;
  const handleUsernameShow = async (user) => {
    if (user) {
      const response = await getAuthData(
        `/user/get-upline-user?username=${user?.username}`,
      );
      if (response?.status === 201 || response?.status === 200) {
        setParentsData(response.data);
      } else {
        // console.log(response, 'get all error');
      }
    }
  };
  useEffect(() => {
    handleUsernameShow(user);
  }, [user]);
  return (
    <div>
      <div
        className={
          isopenParentList
            ? 'fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0 z-10'
            : 'hidden'
        }
      >
        <div className="text-sm text-white  text-center h-4 rounded-t-lg bg-[#040B1D] relative w-full max-w-5xl mx-auto shadow-md px-8 py-4 row flex">
          <h4 className="mt-[-0.5rem] grow text-left text-sm font-bold">
            Parent List
          </h4>
          <button className=" flex-none">
            <RxCross2
              className="h-4 w-4 mt-[-0.5rem]   "
              onClick={handlecloseParentList}
            />
          </button>
        </div>
        <div className="relative  w-full max-w-5xl mx-auto shadow-md rounded-b-lg bg-white px-8 py-4">
          {parentsData &&
            [...parentsData].reverse().map((item, index) => {
              return (
                <div className=" border border-slate-400" key={index}>
                  <div className="flex font-bold text-sm p-2 text-[#000000] justify-center items-center">
                    <h4 className="cursor-pointer">
                      {' '}
                      {item?.username} ({item?.userType})
                    </h4>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
ParentList.propTypes = {
  isuserName: PropTypes.any.isRequired,
  isopenParentList: PropTypes.bool.isRequired,
  handlecloseParentList: PropTypes.func.isRequired,
};
export default ParentList;
