import React, { useEffect,useState } from 'react'
import { FallingLines } from 'react-loader-spinner';

export default function Loader() {
  const [counter,setCounter]=useState();
  useEffect(()=>{},[]);

  return (<>

      <div className='flex justify-center items-center h-screen'>
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-circles-loading"/>
      </div>

  </>
  )
}
