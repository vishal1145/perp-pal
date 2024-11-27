import React from 'react'
import HowItWorks from './HowItWork'
import { NextSeo } from 'next-seo';
const page = () => {
  return (
    <>
  <NextSeo
        title="How It Works | Preppal"
        description="Learn how Preppal works and how you can create and practice customizable online papers."
        openGraph={{
          title: "How It Works | Preppal",
          description: "Learn how Preppal works and how you can create and practice customizable online papers.",
          url: "https://preppal.club/how-it-works",
        }}
       
      />
     <HowItWorks/>
    </>
  )
}

export default page