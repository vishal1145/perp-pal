import '@/styles/global.css';

import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { AppConfig } from '@/utils/AppConfig';

export function generateStaticParams() {
  return AppConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  const messages = useMessages();

  return (
    <html lang={props.params.locale}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3647530800329908"></meta>
        {/* <meta
          name="description"
          content="Empower students to create customizable online papers and practice tests by topic. Enhance learning with tailored questions and topics. Start practicing now!"
        />
        <meta
          name="keywords"
          content="Online paper creation, student practice tests, customizable practice papers, study aid for students, online quiz creation, subject-based practice papers, topic-specific tests, student learning platform, practice exams for students"
        />

        <meta
          property="og:title"
          content="Create and Practice Online Papers | Customizable Student Practice Tests"
        />
        <meta
          property="og:description"
          content="Empower students to create customizable online papers and practice tests by topic. Start practicing and enhance learning with tailored questions."
        />
        <meta property="og:image" content="/favicon3.ico" />
        <meta property="og:url" content="https://preppal.club" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Create and Practice Online Papers | Customizable Student Practice Tests"
        />
        <meta
          name="twitter:description"
          content="Create customizable online papers and practice tests by topic. A perfect tool for students to practice and learn!"
        /> */}
        <meta
          name="twitter:image"
          content="/favicon3.club"
        />

        <meta name="robots" content="index, follow" />
        <script
            type="text/javascript"
            src="https://platform.linkedin.com/in.js"
            async
          ></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3647530800329908" crossOrigin="anonymous"></script>
        <link href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css" rel="stylesheet"/>
      </head>
      <body>
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          {props.children}
          {/* <DemoBadge /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
