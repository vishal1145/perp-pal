import React from 'react';

import EPaper from './EPaper';

export async function generateMetadata({ params: { text } }: {
  params: { text: string };
}) {
  const formattedText = text?.split('--').join(' ');
  const pageTitle = `${formattedText} | Create and Practice Online Papers`;
  const pageDescription = `Learn how to create and practice online papers on ${formattedText}.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://preppal.club/e-paper/${text}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      url: `https://preppal.club/e-paper/${text}`,
    },
  };
}

const page = () => {
  return (
    <EPaper />
  );
};

export default page;
