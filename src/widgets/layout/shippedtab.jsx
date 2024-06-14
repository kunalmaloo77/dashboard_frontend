import routes from '@/routes';
import { Button, Input, Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import Uploadbutton from './uploadbutton';
import { CSVLink } from 'react-csv';
import { FolderArrowDownIcon } from '@heroicons/react/24/solid';

const ShippedTab = ({ selected, handleSelect }) => {
  const nestedRoutes = routes[0].pages[3].nestedRoutes;
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem('selectedOption') || null;
  });

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption])


  return (
    <>
      <div className="flex justify-between gap-4">
        <Tabs value={selected} className="w-full md:w-max">
          <TabsHeader>
            {nestedRoutes.map(({ name, value, path }) => (
              name && (
                <NavLink to={path}>
                  <Tab key={value} value={value} onClick={() => handleSelect(value)}>
                    &nbsp;&nbsp;{name}&nbsp;&nbsp;
                  </Tab>
                </NavLink>
              )
            ))}
          </TabsHeader>
        </Tabs>
        <div className="mr-2">
          <Uploadbutton />
        </div>
      </div>
    </>
  )
}

export default ShippedTab