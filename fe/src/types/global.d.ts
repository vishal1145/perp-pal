// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/en.json');

// eslint-disable-next-line
declare interface IntlMessages extends Messages { }

interface Window {
    fbAsyncInit: any;
    FB: any;
}
interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
}