import React, {
    useState,
    RefObject
} from 'react';

import PostList from '../../shared/PostList/PostList';
import AnecdoteForm from '../../shared/AnecdoteForm/AnecdoteForm';
import Modal from '../../widgets/Modal/Modal';
import Loader from '../../widgets/Loader/Loader';

import usePosts from '../../../hooks/usePosts';
import useFavorites from '../../../hooks/useFavorites';
import useInternetCheck from '../../../hooks/useInternetCheck';

import './Category.scss';

interface CategoryProps {
    scrollRef: RefObject<HTMLDivElement>;
}

const Category = (props: CategoryProps) => {
    const { scrollRef } = props;

    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const { togglePostFav } = useFavorites();
    const { posts, hasMorePosts, isLoading, loadMore } = usePosts();
    const isOnline = useInternetCheck();

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className='category'>
                {!isOnline && <p className='no-internet'>Отсутствует подключение к интернету.</p>}
                <PostList posts={posts} scrollRef={scrollRef} togglePostFav={togglePostFav} />
                {isLoading && <Loader />}
                {posts.length !== 0 &&
                    <div className='category-buttons'>
                        {isOnline &&
                            <button onClick={toggleModal}>Добавить свой</button>
                        }
                        {hasMorePosts &&
                            <button onClick={loadMore}>Читать дальше</button>
                        }
                    </div>
                }
            </div>
            {isModalOpen &&
                <Modal toggleModal={toggleModal}>
                    <AnecdoteForm />
                </Modal>
            }
        </>
    );
}

export default Category;