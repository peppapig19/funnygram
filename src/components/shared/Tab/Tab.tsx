import React from 'react';

import { useNavContext } from '../../../context/NavContext';
import TabType from './TabType';

import './Tab.scss';

interface TabProps {
    tab: TabType;
}

const Tab = (props: TabProps) => {
    const { tab } = props;

    const { selectedTab, selectTab } = useNavContext();

    const onClick = () => {
        if (tab.action) {
            tab.action();
        } else {
            selectTab(tab);
        }
    };

    return (
        <div id={tab.id} className={'tab ' + (tab.id === selectedTab.id ? 'active' : '')} onClick={onClick}>
            {tab.icon && <span><i className={tab.icon} /> </span>}
            {tab.name}
        </div>
    );
}

export default Tab;