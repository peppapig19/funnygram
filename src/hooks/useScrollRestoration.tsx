import {
    useRef,
    useEffect
} from 'react';

import { useNavContext } from '../context/NavContext';
import ScrollRestoration from '../context/ScrollRestoration';

const useScrollRestoration = () => {
    const { selectedTab, selectedGenreId } = useNavContext();

    const scroller = useRef<ScrollRestoration>();

    useEffect(() => {
        scroller.current = new ScrollRestoration(
            selectedTab.id,
            selectedGenreId)
    }, [selectedTab, selectedGenreId]);

    return scroller;
}

export default useScrollRestoration;