import {
    useEffect
} from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
    let visibleIds: string[] = [];
    const location = useLocation();

    const rescroll = (pathname: string) => {
        const elementId = sessionStorage.getItem(pathname);
        if (elementId) {
            const element = document.getElementById(elementId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        rescroll(location.pathname);
    }, [location.pathname]);

    const saveScroll = (elementId: string, isVisible: boolean, isTop: boolean) => {
        if (isVisible) {
            if (isTop) {
                visibleIds.unshift(elementId);
            } else {
                visibleIds.push(elementId);
            }
        } else {
            visibleIds = visibleIds.filter(id => id !== elementId);
        }
        sessionStorage.setItem(location.pathname, visibleIds[0]);
    };

    return saveScroll;
}

export default useScrollRestoration;