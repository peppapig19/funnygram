import React from 'react';

import { useNavContext } from '../../../context/NavContext';

import './TabContent.scss';

const TabContent = () => {
    const { selectedTab } = useNavContext();

    return (
        <div className='tab-content'>
            {selectedTab.content}
        </div>
    );
};

export default TabContent;