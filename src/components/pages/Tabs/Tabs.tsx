import React, {
    useState,
    useRef
} from 'react';
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Sidebar from '../../widgets/Sidebar/Sidebar';
import Tab from './Tab/Tab';
import Category from '../Category/Category';
import Settings from '../Settings/Settings';

import { tabs } from './TabsData';

import './Tabs.scss';

const Tabs = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const ref = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={'tabs-container ' + (isSidebarOpen ? 'sidebar-open' : '')}>
            {isSidebarOpen && (
                <Sidebar toggleSidebar={toggleSidebar} />
            )}
            <ul className='tabs'>
                {!isSidebarOpen && (
                    <li key='hamburger' className='sidebar-hamburger' onClick={toggleSidebar}>
                        <i className='fa fa-bars'></i>
                    </li>
                )}
                {tabs.map(tab =>
                    <li key={'tab_' + tab.slug}>
                        <Tab tab={tab} />
                    </li>
                )}
            </ul>
            <div className='tab-content' ref={ref}>
                <Routes>
                    <Route path='/' element={<Navigate to='/feed/' />} />
                    <Route path='/feed/:categorySlug?' element={<Category scrollRef={ref} />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default Tabs;