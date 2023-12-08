import {
    useRef,
    useEffect,
    useCallback
} from 'react';

import { PostType } from '../components/shared/Post/PostType';
import { HistoryActions } from '../components/pages/History/HistoryRecordType';

import { useNavContext } from '../context/NavContext';

import useHistory from './useHistory';

const useUserPosts = () => {
    const { selectedGenreId } = useNavContext();

    const userPosts = useRef<PostType[]>([]);
    const offset = useRef<number>(0);
    const hasMoreUserPosts = useRef<boolean>(true);

    const { addHistoryRecord } = useHistory();

    const getUserPosts = () => {
        const localUserPosts = localStorage.getItem('userPosts');
        if (localUserPosts) {
            const userPosts: PostType[] = JSON.parse(localUserPosts);
            return userPosts;
        } else {
            return [];
        }
    };

    useEffect(() => {
        const localUserPosts = getUserPosts();
        if (selectedGenreId !== 'all') {
            userPosts.current = localUserPosts.filter(post => post.genre === selectedGenreId);
        } else {
            userPosts.current = localUserPosts;
        }
    }, [selectedGenreId]);

    const storeUserPost = useCallback((post: PostType) => {
        const userPosts = getUserPosts();
        localStorage.setItem('userPosts', JSON.stringify([post, ...userPosts]));
    }, []);

    const getPartUserPosts = useCallback((count: number) => {
        const morePosts = userPosts.current.slice(offset.current, count);
        offset.current += morePosts.length;
        hasMoreUserPosts.current = offset.current < userPosts.current.length;
        return morePosts;
    }, [userPosts]);

    const createUserPost = useCallback((post: PostType) => {
        userPosts.current.unshift(post);
        storeUserPost(post);
        addHistoryRecord(HistoryActions.create, post);
    }, [storeUserPost, addHistoryRecord]);

    return { userPosts, hasMoreUserPosts, getPartUserPosts, createUserPost } as const;
};

export default useUserPosts;