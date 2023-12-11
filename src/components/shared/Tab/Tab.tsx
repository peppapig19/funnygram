import React from 'react';

import Icon from '../Icon/Icon';

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
            {tab.iconName && <Icon name={tab.iconName} />}
            {tab.iconName && tab.name && <span>&nbsp;</span>}
            {tab.name}
        </div>
    );
}

export default Tab;