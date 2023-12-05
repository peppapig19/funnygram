import {
    useState,
    useEffect
} from 'react';

const useInternetCheck = () => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const onConnect = () => {
            setIsOnline(true);
        };
        const onDisconnect = () => {
            setIsOnline(false);
        };
        window.addEventListener('online', onConnect);
        window.addEventListener('offline', onDisconnect);
        return () => {
            window.removeEventListener('online', onConnect);
            window.removeEventListener('offline', onDisconnect);
        };
    }, []);

    return isOnline;
}

export default useInternetCheck;