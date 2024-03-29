import React from 'react';
import { formatDate } from './utils';
import { DateInputsProps } from './types';

const DateInputs: React.FC<DateInputsProps> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  return (
    <>
      <div className="dates">
        <label className="dates__label">Дата с : </label>
        <input
          type="date"
          value={formatDate(startDate)}
          onChange={handleStartDateChange}
          min="2024-03-02"
          max={formatDate(endDate).toString()}
        />
      </div>
      <div className="dates">
        <label className="dates__label">Дата по : </label>
        <input
          type="date"
          value={formatDate(endDate)}
          onChange={handleEndDateChange}
          min={formatDate(startDate).toString()}
        />
      </div>
    </>
  );
};

export default DateInputs;
