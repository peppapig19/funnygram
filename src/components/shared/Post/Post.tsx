import React, {
    useState,
    useRef,
    useEffect
} from 'react';

import Icon from '../Icon/Icon';

import { PostType } from './PostType';
import ScrollRestoration from '../../../context/ScrollRestoration';

import './Post.scss';

interface PostProps {
    post: PostType;
    index: number;
    scroller?: ScrollRestoration;
    isRescrolling: boolean,
    togglePostFav?: (post: PostType) => void;
}

const Post = (props: PostProps) => {
    const { post, index, scroller, isRescrolling, togglePostFav } = props;

    const [isFavorite, setIsFavorite] = useState<boolean>(post.isFavorite);

    const ref = useRef(null);

    useEffect(() => {
        if (scroller && ref.current && !isRescrolling) {
            const scrollRoot = scroller.findScrollRoot(ref.current);
            const observer = new IntersectionObserver(
                ([entry]) => {
                    const isTop = entry.boundingClientRect.top <= entry.rootBounds!.top;
                    scroller.saveScroll(index, entry.isIntersecting, isTop);
                },
                {
                    root: scrollRoot,
                    threshold: 0.5
                }
            );
            observer.observe(ref.current);
            return () => observer.disconnect();
        }
    }, [scroller, isRescrolling, index]);

    const handleStarClick = () => {
        if (togglePostFav) {
            togglePostFav(post);
            setIsFavorite(!isFavorite);
        }
    };

    return (
        <div className='post-container'>
            {post.hint && <p className='post-hint'>{post.hint}</p>}
            <div className='post' id={index.toString()} ref={ref}>
                <div className='post-content'>
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                </div>
                {togglePostFav &&
                    <div className='post-fav' onClick={handleStarClick}>
                        {isFavorite ? (
                            <Icon name='starFilled' className='active' />
                        ) : (
                            <Icon name='star' />
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default Post;