import '../../../styles/app.css';
import '@/styles/global.css';

import type { Metadata } from 'next';
// import Head from 'next/head';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

// import { DemoBadge } from '@/components/DemoBadge';
import { AppConfig } from '@/utils/AppConfig';

import DefaultPage from './default/page';
export async function generateMetadata() {
  const title = "Create and Practice Online Papers | Customizable Student Practice Tests";
  const description =
    "Empower students to create customizable online papers and practice tests by topic. Enhance learning with tailored questions and topics. Start practicing now!";
  const keywords =
    "Online paper creation, student practice tests, customizable practice papers, study aid for students, online quiz creation, subject-based practice papers, topic-specific tests, student learning platform, practice exams for students";
  const ogImage = "/favicon3.ico";
  const url = "https://preppal.club";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: "Customizable Student Practice Tests",
        },
      ],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}


export function generateStaticParams() {
  return AppConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  return (
    <html lang={props.params.locale}>
      <body>
        {/* <DemoBanner/> */}
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <DefaultPage />
          {props.children}
          {/* <DemoBadge /> */}
        </NextIntlClientProvider>

        {/* <Footer/> */}
      </body>
    </html>
  );
}
