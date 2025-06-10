declare global {
    interface Window {
        gtag: (
            type: string,
            propertyId: string,
            options?: {
                page_path?: string;
                event_category?: string;
                event_label?: string;
                value?: number;
            }
        ) => void;
    }
}

export {};
