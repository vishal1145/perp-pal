'use client';

import React, { useEffect, useState } from 'react';
import EPaper from './EPaper';
import { metaTitle } from '@/data/functions';

const Page = () => {
  const [title, setTitle] = useState(metaTitle); 
  useEffect(() => {
    setTitle(metaTitle);
  }, []);  

  return (
    <>
   
      <head>
        <title>{title}</title> 
      </head>

      <div>
        <EPaper />
      </div>
    </>
  );
};

export default Page;
