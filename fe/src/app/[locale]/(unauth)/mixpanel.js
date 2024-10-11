import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let defaultProperties = {};

/**
 * Sets default properties for Mixpanel events.
 * @param {Object} properties - The default properties to be set.
 */
export const setMixPanelDefaultProperties = (properties) => {
    defaultProperties = { ...defaultProperties, ...properties };
};

/**
 * Initializes Mixpanel with the provided token.
 */
export const initMixpanel = () => {
    if (MIXPANEL_TOKEN) {
        mixpanel.init(MIXPANEL_TOKEN, { debug: true });
    } else {
        console.error("Mixpanel token is undefined");
    }
};

/**
 * Tracks an event with Mixpanel.
 * @param {string} eventName - The name of the event.
 * @param {Object} [properties={}] - Optional properties to send with the event.
 */
export const trackEvent = (eventName, properties = {}) => {
    if (!MIXPANEL_TOKEN) {
        console.error("Mixpanel is not initialized");
        return;
    }

    // Merge default properties with the event-specific properties
    const eventProperties = { ...defaultProperties, ...properties };

    // Track the event with Mixpanel
    mixpanel.track(eventName, eventProperties);
};
