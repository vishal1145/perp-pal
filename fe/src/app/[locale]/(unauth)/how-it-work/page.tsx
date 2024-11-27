import React from 'react'
import HowItWorks from './HowItWork'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "How It Works",
};
const page = () => {
  return (
     <HowItWorks/>
  )
}

export default page