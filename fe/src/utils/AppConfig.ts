import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'always';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix,
};
