import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollRestoration = () => {
    const location = useLocation();
    const isReady = useRef<boolean>();

    useEffect(() => {
        isReady.current = false;
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => {
            if (isReady.current) {
                return;
            }
            sessionStorage.setItem(location.pathname, window.scrollY.toString());
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [location.pathname]);

    return () => {
        if (isReady.current) {
            const scrollY = sessionStorage.getItem(location.pathname);
            window.scrollTo(0, +(scrollY ?? 0));
            isReady.current = false;
        }
    };
};
