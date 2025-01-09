const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const initGA = () => {
    if (GA_MEASUREMENT_ID) {
        if (typeof window !== 'undefined') {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            script.async = true;
            document.head.appendChild(script);

            // Initialize dataLayer if not already initialized
            window.dataLayer = window.dataLayer || [];

            // Define gtag function
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }

            window.gtag = gtag; // Make gtag available globally

            // Correct usage of gtag
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID, {
                send_page_view: true,
            });
        }
    } else {
        console.error('GA Measurement ID is undefined');
    }
};

// Define trackGAEvent function with proper type annotations
export const trackGAEvent = (
    eventCategory: string,
    eventAction: string,
    eventLabel?: string // Optional parameter
): void => {
    if (!window.gtag) {
        console.error('Google Analytics is not initialized');
        return;
    }

    window.gtag('event', eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
    });
};
