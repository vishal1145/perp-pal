import React from 'react'
import HowItWorks from './HowItWork'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How It Works | Preppal",
  description: "Learn how Preppal works and how you can create and practice customizable online papers.",
  openGraph: {
    title: "How It Works | Preppal",
    description: "Learn how Preppal works and how you can create and practice customizable online papers.",
    url: "https://preppal.club/how-it-works",
  },
  twitter: {
    title: "How It Works | Preppal",
    description: "Learn how Preppal works and how you can create and practice customizable online papers.",
  },
};

const page = () => {
  return (
    <>
     <HowItWorks/>
    </>
  )
}

export default page