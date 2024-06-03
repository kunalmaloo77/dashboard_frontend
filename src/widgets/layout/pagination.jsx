// src/components/Pagination.js
import { Button, CardFooter, Typography } from '@material-tailwind/react';
import React from 'react';

const Pagination = ({ totalItems, totalPages, currentPage, onPageChange }) => {

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        Page
        <span className='ml-2 rounded-md' variant='outlined'>{currentPage}</span> of
        <Button className='ml-2  px-3 py-2 rounded-md' variant='outlined' onClick={() => handlePageChange(totalPages)}>{totalPages}</Button>
      </Typography>
      <div className="flex gap-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outlined" size="sm"
        >
          Prev
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outlined" size="sm"
        >
          Next
        </Button>
      </div>
    </CardFooter>
  );
};

export default Pagination;

{/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
  <Typography variant="small" color="blue-gray" className="font-normal">
    Page 1 of 10
  </Typography>
  <div className="flex gap-2">
    <Button variant="outlined" size="sm">
      Previous
    </Button>
    <Button variant="outlined" size="sm">
      Next
    </Button>
  </div>
</CardFooter> */}