import routes from '@/routes';
import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Uploadbutton from './uploadbutton';

const RtoTab = ({ selected, handleSelect }) => {
  const nestedRoutes = routes[0].pages[4].nestedRoutes;
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
              <Tab key={value} value={value} onClick={() => handleSelect(value)}>
                <NavLink to={`/dashboard/rto${path}`}>
                  &nbsp;&nbsp;{name}&nbsp;&nbsp;
                </NavLink>
              </Tab>
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

export default RtoTab