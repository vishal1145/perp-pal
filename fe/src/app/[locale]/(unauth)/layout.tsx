// import Link from 'next/link';

// import { LocaleSwitcher } from '@/components/LocaleSwitcher';
// import { BaseTemplate } from '@/templates/BaseTemplate';
// 'use client'
import '../../../styles/app.css';
import '@/styles/global.css';

import type { Metadata } from 'next';
// import Head from 'next/head';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

// import { DemoBadge } from '@/components/DemoBadge';
import { AppConfig } from '@/utils/AppConfig';

import DefaultPage from './default/page';

export const metadata: Metadata = {
  title: 'Paper Text | Create and practice online papers',
  description: 'Create and Practice Online Papers | Customizable Student Practice Tests',

  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

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
