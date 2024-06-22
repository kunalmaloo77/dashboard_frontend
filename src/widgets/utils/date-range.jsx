import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRange = ({ onDateRangeSubmit, handleOpen }) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const [state, setState] = useState([
    {
      startDate: oneMonthAgo,
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const handleDateChange = () => {
    handleOpen();
    onDateRangeSubmit(state);
  }
  return (
    <div className='flex flex-col'>
      <DateRangePicker
        onChange={item => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="horizontal"
      />
      <div className='flex gap-2 justify-end mt-10'>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          onClick={handleDateChange}
          color='green'
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default DateRange