import React from 'react'
import EPaper from './EPaper'
export async function generateMetadata({
  params: {  text },   
}: {
  params: {   text: string };
}) {
  text = text?.split("--").join(" ")
  return {
    title: `${text} | Create and practice online papers`,   
  };
}

const page = () => {
  return (
    <EPaper/>
  )
}

export default page