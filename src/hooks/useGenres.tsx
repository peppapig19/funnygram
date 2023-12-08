import {
    useState,
    useEffect
} from 'react';

import ApiService, { Genre } from '../context/ApiService';

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const storeGenres = (genres: Genre[]) => {
        sessionStorage.setItem('genres', JSON.stringify(genres));
    };

    useEffect(() => {
        const storedGenres = sessionStorage.getItem('genres');
        if (storedGenres) {
            setGenres(JSON.parse(storedGenres));
        } else {
            setIsLoading(true);
            ApiService.getGenresAsync().then(fetchedGenres => {
                setGenres(fetchedGenres);
                storeGenres(fetchedGenres);
                setIsLoading(false);
            });
        }
    }, []);

    return { genres, isLoading } as const;
};

export default useGenres;