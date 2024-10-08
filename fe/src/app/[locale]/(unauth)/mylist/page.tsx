import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const MyList = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
 

  return (
    <>
      mylist

      
    </>
  );
};

export default MyList;
