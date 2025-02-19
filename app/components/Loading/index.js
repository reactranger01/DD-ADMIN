import React from 'react';

const Loading = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.3)] w-screen h-screen grid place-content-center fixed top-0 left-0 z-50">
      <div className="animate-spin w-10 h-10 border-[3px] border-white border-t-transparent rounded-full"></div>
    </div>
  );
};

export default Loading;
