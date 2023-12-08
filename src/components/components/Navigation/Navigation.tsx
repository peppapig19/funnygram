import React, {
    useState,
    useMemo,
    useEffect
} from 'react';

import Sidebar from '../../widgets/Sidebar/Sidebar';
import TabsPanel from '../TabsPanel/TabsPanel';
import TabContent from '../TabContent/TabContent';

import TabType from '../../shared/Tab/TabType';
import { tabs } from './NavigationData';

import './Navigation.scss';

const Navigation = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [tabsPanelData, setTabsPanelData] = useState<TabType[]>(tabs);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const getSidebarTab = useMemo(() => {
        const openSidebar: TabType = {
            id: 'open-sidebar',
            name: '',
            action: toggleSidebar,
            icon: 'fa fa-bars'
        };
        return openSidebar;
    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            setTabsPanelData(tabs);
        } else {
            setTabsPanelData(prev => [getSidebarTab, ...prev])
        }
    }, [isSidebarOpen, getSidebarTab]);

    return (
        <div className={'navigation-container ' + (isSidebarOpen ? 'sidebar-shift' : '')}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <TabsPanel tabs={tabsPanelData} />
            <TabContent />
        </div>
    );
};

export default Navigation;