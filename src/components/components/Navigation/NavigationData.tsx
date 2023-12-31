import React from 'react';

import Feed from '../../pages/Feed/Feed';
import Favorites from '../../pages/Favorites/Favorites';
import History from '../../pages/History/History';

import TabType from '../../shared/Tab/TabType';

export const tabs: TabType[] = [
    {
        id: 'anecdotes',
        name: 'Анекдоты',
        content: <Feed />
    },
    {
        id: 'favorites',
        name: 'Избранное',
        content: <Favorites />,
        iconName: 'heart'
    },
    {
        id: 'history',
        name: 'История',
        content: <History />,
        iconName: 'clock'
    }
];