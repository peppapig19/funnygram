import React, {
    useState,
    useRef,
    useEffect,
    RefObject
} from 'react';

import { PostType } from './PostData';

import './Post.scss';

interface PostProps {
    post: PostType;
    scrollRef: RefObject<HTMLDivElement>;
    onVisibilityChange: (_elementId: string, _isVisible: boolean, _isTop: boolean) => void;
    togglePostFav: (_post: PostType) => void;
}

const Post = (props: PostProps) => {
    const { post, scrollRef, onVisibilityChange, togglePostFav } = props;

    const [isFavorite, setIsFavorite] = useState<boolean>(post.isFavorite);

    const ref = useRef(null);

    const elementId = 'post-' + post.id;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isTop = entry.boundingClientRect.top <= entry.rootBounds!.top;
                onVisibilityChange(elementId, entry.isIntersecting, isTop);
            },
            {
                root: scrollRef.current,
                threshold: 0.5,
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, [elementId, scrollRef, onVisibilityChange]);

    const handleStarClick = () => {
        togglePostFav(post);
        setIsFavorite(!isFavorite);
    };

    return (
        <div className='post' id={elementId} ref={ref}>
            <div className='post-content'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            <div className='post-fav' onClick={handleStarClick}>
                <i className={isFavorite ? 'star-active fa-solid fa-star' : 'star fa-regular fa-star'} />
            </div>
        </div>
    );
};

export default Post;