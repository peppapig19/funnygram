import {
    useEffect,
    useRef
} from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
    const visibleIds = useRef<string[]>([]);
    const location = useLocation();

    const rescroll = (pathname: string) => {
        const elementId = sessionStorage.getItem(pathname);
        if (elementId) {
            const element = document.getElementById(elementId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        visibleIds.current = [];
        rescroll(location.pathname);
    }, [location.pathname]);

    const saveScroll = (elementId: string, isVisible: boolean, isTop: boolean) => {
        if (isVisible) {
            if (isTop) {
                visibleIds.current.unshift(elementId);
            } else {
                visibleIds.current.push(elementId);
            }
        } else {
            visibleIds.current = visibleIds.current.filter(id => id !== elementId);
        }
        sessionStorage.setItem(location.pathname, visibleIds.current[0]);
    };

    return saveScroll;
}

export default useScrollRestoration;