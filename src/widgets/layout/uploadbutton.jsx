import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import axios from 'axios';
import React, { useState } from 'react'
import { Flip, toast } from 'react-toastify';

const Uploadbutton = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [submitType, setSubmitType] = useState(null);

  const handleSubmitUpload = async () => {
    setOpen(!open);
    setSubmitType(null);
    console.log(file);
    if (!file) {
      toast.error("Please select a file to upload", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      });
      return;
    }
    const formData = new FormData();
    formData.append('csv', file);
    try {
      const response = await axios.post('https://dashboard-backend-tw3m.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("File Uploaded Successfully", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 1000,
          transition: Flip
        })
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.error('Error uploading CSV:', error);
    }
  };

  const handleAwbSubmit = async () => {
    setSubmitType(null);
    setOpen(!open);
    if (!file) {
      toast.error("Please select a file to upload", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      });
      return;
    }
    const formData = new FormData();
    formData.append('csv', file);
    try {
      const res = await axios.patch('https://dashboard-backend-tw3m.onrender.com/upload/awb/bulkupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      toast.success("File Uploaded Successfully", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log(res.data);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 1000,
          transition: Flip
        })
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log("Error Uploading CSV", error);
    }
  }

  const handleConfirmedSubmit = async () => {
    setOpen(!open);
    setSubmitType(null);
    if (!file) {
      toast.error("Please select a file to upload", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      });
      return;
    }
    const formData = new FormData();
    formData.append('csv', file);
    try {
      const res = await axios.patch('https://dashboard-backend-tw3m.onrender.com/upload/status', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      toast.success("File Uploaded Successfully", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 1000,
          transition: Flip
        })
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    setSubmitType('new');
    handleOpen();
  };

  const handleAwbFileChange = async (e) => {
    setFile(e.target.files[0]);
    setSubmitType('awb');
    handleOpen();
  };

  const handleConfirmedFileChange = async (e) => {
    setFile(e.target.files[0]);
    setSubmitType('status');
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <div>
      <Popover placement='bottom-end'>
        <PopoverHandler>
          <Button variant="gradient" className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload Files
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <ul>
            <li className='block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'>
              <form onSubmit={handleSubmitUpload} encType="multipart/form-data" id='form'>
                <div className="flex">
                  <label htmlFor='file-upload' className='cursor-pointer'>Upload CSV</label>
                  <input type="file" accept=".csv" onChange={handleFileChange} className='hidden' id='file-upload' />
                </div>
              </form>
            </li>
            <li className='block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'>
              <form onSubmit={handleAwbSubmit} encType="multipart/form-data">
                <div className="flex">
                  <label htmlFor='awb-file-upload' className='cursor-pointer'>AWB CSV</label>
                  <input type="file" accept=".csv" onChange={handleAwbFileChange} className="hidden" id='awb-file-upload' />
                </div>
              </form>
            </li>
            <li className='block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'>
              <form onSubmit={handleConfirmedSubmit} encType="multipart/form-data">
                <div className="flex">
                  <label htmlFor='confirmed-file-upload' className='cursor-pointer'>Status CSV</label>
                  <input type="file" accept=".csv" onChange={handleConfirmedFileChange} className="hidden" id='confirmed-file-upload' />
                </div>
              </form>
            </li>
          </ul>

        </PopoverContent>
      </Popover>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Confirmation</DialogHeader>
        <DialogBody>
          Are you sure you want to upload {file?.name}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {
            submitType === 'new' &&
            <Button variant="gradient" color="green" onClick={handleSubmitUpload}>
              <span>Confirm</span>
            </Button>
          }
          {
            submitType === 'awb' &&
            <Button variant="gradient" color="green" onClick={handleAwbSubmit}>
              <span>Confirm</span>
            </Button>
          }
          {
            submitType === 'status' &&
            <Button variant="gradient" color="green" onClick={handleConfirmedSubmit}>
              <span>Confirm</span>
            </Button>
          }
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default Uploadbutton