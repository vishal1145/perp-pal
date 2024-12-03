import React from 'react';
import HowItWorks from './HowItWork';

export async function generateMetadata() {
  const pageTitle = `How It Works | Preppal`;
  const pageDescription = `Learn how Preppal works and how you can create and practice customizable online papers.`;
  const url = "https://preppal.club/how-it-works";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: url,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      url: url,
    },
  };
}

const Page = () => {
  return <HowItWorks />;
};

export default Page;