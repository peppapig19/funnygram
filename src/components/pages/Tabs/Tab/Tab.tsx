import React from 'react';
import { NavLink } from 'react-router-dom';

import { TabType } from '../TabsData';

import './Tab.scss';

interface TabProps {
    tab: TabType;
}

const Tab = (props: TabProps) => {
    const { tab } = props;

    return (
        <NavLink className='tab' to={tab.linkTo}>
            <div>
                {tab.icon && <span><i className={tab.icon} /> </span>}
                {tab.name}
            </div>
        </NavLink>
    );
}

export default Tab;