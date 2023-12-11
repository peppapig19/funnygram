import React, {
    useState,
    useMemo
} from 'react';

import Sidebar from '../../widgets/Sidebar/Sidebar';
import TabsPanel from '../TabsPanel/TabsPanel';
import TabContent from '../TabContent/TabContent';

import TabType from '../../shared/Tab/TabType';
import { tabs } from './NavigationData';

import './Navigation.scss';

const Navigation = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const getSidebarTab = useMemo(() => {
        const openSidebar: TabType = {
            id: 'open-sidebar',
            name: '',
            action: toggleSidebar,
            iconName: 'hamburger'
        };
        return openSidebar;
    }, []);

    const getTabsPanel = () => {
        if (isSidebarOpen) {
            return tabs;
        } else {
            return [getSidebarTab, ...tabs];
        }
    };

    return (
        <div className={'navigation-container ' + (isSidebarOpen ? 'sidebar-shift' : '')}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <TabsPanel tabs={getTabsPanel()} />
            <TabContent />
        </div>
    );
};

export default Navigation;