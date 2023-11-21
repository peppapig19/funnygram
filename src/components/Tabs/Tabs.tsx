import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import {
    Routes,
    Route,
    Navigate,
    NavLink
} from 'react-router-dom';

import TabContent from '../TabContent/TabContent';
import Settings from '../Settings/Settings';
import Loader from '../Loader/Loader';
import Data from '../../context/Data';

import './Tabs.scss';

const data = new Data();

interface Tab {
    slug: string;
    linkTo: string;
    name: string;
    icon?: string;
}

const startTabs = [
    {
        slug: 'all',
        linkTo: '/feed/',
        name: 'Все анекдоты'
    }
];

const endTabs = [
    {
        slug: 'favorites',
        linkTo: '/feed/favorites',
        name: 'Избранное',
        icon: 'fa fa-heart'
    },
    {
        slug: 'settings',
        linkTo: '/settings',
        name: 'Настройки',
        icon: 'fa fa-gear'
    }
];

const Tabs = () => {
    const [tabs, setTabs] = useState<Tab[]>([...startTabs, ...endTabs]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const ref = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        data.loadCategoriesAsync().then(res => {
            const categories = res.map(category => {
                const linkTo = '/feed/' + category.slug;
                return { ...category, linkTo: linkTo };
            });
            setTabs([...startTabs, ...categories, ...endTabs]);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    const renderTab = (tab: Tab, index: number) => {
        return (
            <li key={tab.slug + '_' + index}>
                <NavLink className='tab' to={tab.linkTo}>
                    <div>
                        {tab.icon && <span><i className={tab.icon} /> </span>}
                        {tab.name}
                    </div>
                </NavLink>
            </li>
        );
    };

    return (
        <div className='tabs-container'>
            <ul className='tabs'>
                {tabs.map((tab, index) => renderTab(tab, index))}
            </ul>
            <div className='tab-content' ref={ref}>
                <Routes>
                    <Route path='/' element={<Navigate to='/feed/' />} />
                    <Route path='/feed/:categorySlug?' element={<TabContent scrollRef={ref} />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default Tabs;