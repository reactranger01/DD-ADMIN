import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getAuthData } from '@/utils/apiHandlers';
// Adjust this path based on where you handle API requests

const DownloadCSV = ({
  url,
  buttonText,
  query,
  parms,
  css,
  fileName = 'report.csv',
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleDownload = async () => {
    setIsDisabled(true);
    let apiUrl = `${url}?export=true`;

    if (query && parms) {
      apiUrl += `&${query}=${encodeURIComponent(parms)}`;
    }
    try {
      const res = await getAuthData(apiUrl);
      if (res?.status === 200) {
        const csvData = res.data;
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const downloadUrl = URL.createObjectURL(blob);
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);
        toast.success('CSV exported successfully!');
      } else {
        toast.error('Failed to export CSV.');
      }
    } catch (error) {
      toast.error('Error exporting CSV.');
      console.error(error);
    } finally {
      // Re-enable the button after 5 seconds
      setTimeout(() => {
        setIsDisabled(false);
      }, 5000);
    }
  };
  return (
    <button
      className={`px-3 py-2 text-xs h-8 text-white ${css} ${
        isDisabled ? 'bg-primary-btn2' : 'bg-primary-btn3'
      }`}
      onClick={handleDownload}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

DownloadCSV.propTypes = {
  url: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  css: PropTypes.string,
  query: PropTypes.string,
  parms: PropTypes.string,
};

export default DownloadCSV;
