import routes from '@/routes';
import { Button, Input, Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Bounce, Flip, toast } from 'react-toastify';
import Uploadbutton from './uploadbutton';

const OrderTab = ({ selected, handleSelect }) => {
  const nestedRoutes = routes[0].pages[1].nestedRoutes;
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem('selectedOption') || null;
  });

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption])

  return (
    <>
      <div className='flex justify-between'>
        <div className="flex justify-between gap-4 flex-col">
          <Tabs value={selected} className="w-full md:w-max">
            <TabsHeader>
              {nestedRoutes.map(({ name, value, path }) => (
                <Tab key={value} value={value} onClick={() => handleSelect(value)}>
                  <NavLink to={`/dashboard/orders${path}`}>
                    &nbsp;&nbsp;{name}&nbsp;&nbsp;
                  </NavLink>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
        <div className='mr-2'>
          <Uploadbutton />
        </div>
      </div>
    </>
  )
}

export default OrderTab