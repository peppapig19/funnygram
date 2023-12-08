import React from 'react';

import Tab from '../../shared/Tab/Tab';

import TabType from '../../shared/Tab/TabType';

import './TabsPanel.scss';

interface TabsPanelProps {
    tabs: TabType[];
}

const TabsPanel = (props: TabsPanelProps) => {
    const { tabs } = props;

    return (
        <div className='tabs-panel'>
            <ul className='tabs'>
                {tabs.map(tab =>
                    <li key={'tab_' + tab.id}>
                        <Tab tab={tab} />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TabsPanel;