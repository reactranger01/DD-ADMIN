import React from 'react';

const DownlistHeader = () => {
  return (
    <div className="w-full h-[56px] border-b border-slate-400 flex justify-between items-center bg-[#ffffff] m-[30px]">
      <div className="pl-3">
        <p className="text-[14px] font-semibold text-gray-500 py-[2px]">
          Total Balance
        </p>
        <p className="font-semibold text-slate-800 text-[17px]">
          INR <span>1,560,205</span>
        </p>
      </div>
      <div className="border-l-2 border-gray-300 pl-3">
        <p className="text-[14px] font-semibold text-gray-500 py-[2px]">
          Total Exposure
        </p>
        <p className="font-semibold text-slate-800 text-[17px]">
          INR <span className="text-red-600">(0)</span>
        </p>
      </div>
      <div className="border-l-2 border-gray-300 pl-3">
        <p className="text-[14px] font-semibold text-gray-500 py-[2px]">
          Available Balance
        </p>
        <p className="font-semibold text-slate-800 text-[17px]">
          INR <span>1,560,204.74</span>
        </p>
      </div>
      <div className="border-l-2 border-gray-300 pl-3">
        <p className="text-[14px] font-semibold text-gray-500 py-[2px]">
          Balance
        </p>
        <p className="font-semibold text-slate-800 text-[17px]">
          INR <span>859,295</span>
        </p>
      </div>
      <div className="border-l-2 border-gray-300 pl-3">
        <p className="text-[14px] font-semibold text-gray-500 py-[2px]">
          Total Avail. bal.
        </p>
        <p className="font-semibold text-slate-800 text-[17px]">
          INR <span>2,419,500</span>
        </p>
      </div>
      <div className="border-l-2 border-gray-300 pl-3">
        <p className="text-[14px] font-semibold text-gray-500 py-[2px]">
          Upline P/L
        </p>
        <p className="font-semibold text-slate-800 text-[17px]">
          INR <span className="text-red-600">-1,580,500.26</span>
        </p>
      </div>
      <div className="border-l-2 border-gray-300 pl-3"></div>
    </div>
  );
};

export default DownlistHeader;
