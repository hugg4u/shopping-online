import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// TODO: Define a proper type for the authenticated user
interface AuthenticatedUser {
    // Define user properties here, e.g., id: string, email: string, etc.
    [key: string]: any; // Example, replace with actual structure
}

export const useAuth = () => {
    const [auth, setAuth] = useState<AuthenticatedUser | null | undefined>(
        undefined
    );

    const authCookies = Cookies.get('accessTokenClient');
    useEffect(() => {
        if (authCookies) {
            try {
                setAuth(JSON.parse(authCookies));
            } catch (error) {
                // It's better to handle this error in a way that's visible to the application
                // or log it to a proper monitoring service rather than just console.error in a common package.
                // For now, setting auth to null indicating an issue.
                setAuth(null);
            }
        } else {
            setAuth(null); // Explicitly set to null if no cookie
        }
    }, [authCookies]);

    return auth;
};
