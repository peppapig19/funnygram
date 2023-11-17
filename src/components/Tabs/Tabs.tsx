import React, {
    useState,
    useEffect
} from 'react';
import {
    Routes,
    Route,
    Navigate,
    NavLink
} from 'react-router-dom';

import Loader from '../Loader/Loader';
import Feed from '../Feed/Feed';
import Favorites from '../Favorites/Favorites';
import Data from '../../context/Data';
import { Category } from '../../context/Data';

import './Tabs.scss';
import { TabsContent } from '../TabsContent/TabsContent';

const data = new Data();

const Tabs: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: 0,
            slug: 'allJokes',
            name: `Все анекдоты`
        },
        {
            id: 999,
            slug: 'favorsJokes',
            name: `Избранное`
        }
    ]);

    useEffect(() => {
        data.loadingCategories().then(res => {
            setCategories(prevState => [prevState[0], ...res, prevState[prevState.length - 1]]);
        });
    }, []);

    return (
        <div className='tabs-wrapper'>
            <ul className='tabs'>
                {
                    categories.map(c => {
                        const toLink = `/feed/${c.slug}`;
                        return (
                            <li key={c.id + '_' + c.slug}>
                                <NavLink to={toLink} className={`tab`}>
                                    <div>
                                        {c.id == 999 && <i className='fa fa-heart' />}
                                        {c.name}
                                    </div>
                                </NavLink>
                            </li>
                        );
                    })
                }
            </ul>
            <div className='tabs-content'>
                <Routes>
                    <Route path="/" element={<Navigate to="/feed/allJokes" />} />

                    <Route path='/feed/:categorySlug?' element={<TabsContent />} />
                </Routes>
            </div>
        </div>
    );
};

export default Tabs;