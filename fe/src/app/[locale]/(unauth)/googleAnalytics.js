const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const initGA = () => {
    if (GA_MEASUREMENT_ID) {
        // Load Google Analytics script
        if (typeof window !== 'undefined') {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            script.async = true;
            document.head.appendChild(script);

            // Define gtag function
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            window.gtag = gtag; // Make gtag available globally
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID, {
                send_page_view: true,
            });
        }
    } else {
        console.error("GA Measurement ID is undefined");
    }
};

// Define trackGAEvent function
export const trackGAEvent = (eventCategory, eventAction, eventLabel) => {
    if (!window.gtag) {
        console.error("Google Analytics is not initialized");
        return;
    }

    window.gtag('event', eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
    });
};