import { axiosPublic } from '@/widgets/utils/axiosInstance';
import { Button, Card, CardBody, CardHeader, List, ListItem } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';

const Sku = () => {
  const [skuList, setSkuList] = useState([]);
  const [loading, setLoading] = useState(false)

  const getSkuList = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get('/clients/skuList');
      setSkuList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getFullSkuList = async () => {
    try {
      let unMappedSku = [];
      setLoading(true);
      const res = await axiosPublic.get('/clients/skuListfull');
      for (let i = 0; i < res.data.length; i++) {
        unMappedSku.push({ channelSKU: res.data[i].sku })
      }
      function removeDuplicates(arr) {
        return arr.filter((item,
          index) => arr.indexOf(item) === index);
      }
      const array = removeDuplicates(unMappedSku);
      if (unMappedSku.length > 0) {
        await axiosPublic.post('/upload/unmapped', { unMappedSku: array });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSkuList();
  }, [])

  const header = [
    { label: "channelSKU", key: 'channelSKU' },
  ]
  return (
    <div>
      <Card>
        <CardBody>
          <div className='flex gap-2'>
            <Button variant="outlined" className="flex items-center gap-3" onClick={getFullSkuList}>
              Refresh
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Button>
            <CSVLink data={skuList} headers={header} filename={"skulist.csv"}>
              <Button className='bg-[#2e7d32]'>
                <div className='flex'>
                  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                  <span>Download</span>
                </div>
              </Button>
            </CSVLink>
          </div>
        </CardBody>
        {
          loading ? <div className="absolute bg-white bg-opacity-60 h-full w-full flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-3xl mr-4">Loading</span>
              <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
          </div> : <List className='w-1/2 border-2 rounded-md shadow-md mb-4 ml-6'>
            {
              skuList.map((sku, index) => {
                return (<ListItem key={index}>{sku.channelSKU}</ListItem>)
              })
            }
          </List>
        }

      </Card>
    </div>
  )
}

export default Sku