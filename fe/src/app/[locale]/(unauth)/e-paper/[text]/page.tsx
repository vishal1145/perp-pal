import React from 'react'
import EPaper from './EPaper'
export async function generateMetadata({
  params: { text },  
}: {
  params: { text: string };
}) {
  const formattedText = text?.split("--").join(" ");

  return {
    title: `${formattedText} | Create and Practice Online Papers`,
    description: `Learn how to create and practice online papers on ${formattedText}.`,
    og: {
      title: `${formattedText} | Create and Practice Online Papers`,
      description: `Learn how to create and practice online papers on ${formattedText}.`,
      url: `https://preppal.club/${text}`,  
    },
    twitter: {
      cardType: 'summary_large_image',
      title: `${formattedText} | Create and Practice Online Papers`,
      description: `Learn how to create and practice online papers on ${formattedText}.`,
      url: `https://preppal.club/${text}`,  
    },
  };
}

const page = () => {
  return (
    <EPaper/>
  )
}

export default page