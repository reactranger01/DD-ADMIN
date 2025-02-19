import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
const DateTimePicker = ({ label, selectedDate, onChange }) => {
  return (
    <div className="date-picker-component text-xs flex flex-col gap-2">
      <label className="text-black text-xs">{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        timeFormat="HH:mm"
        className="p-2 bg-white text-black border border-gray-700 w-44"
        timeIntervals={15} // Time interval of 15 minutes
        style={{ width: '300px' }}
      />
    </div>
  );
};
DateTimePicker.propTypes = {
  label: PropTypes.any,
  selectedDate: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
export default DateTimePicker;
