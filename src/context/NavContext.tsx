import React, {
    createContext,
    ReactNode,
    useState,
    useContext
} from 'react';

import TabType from '../components/shared/Tab/TabType';
import { tabs } from '../components/components/Navigation/NavigationData';

interface NavContextProps {
    selectedTab: TabType;
    selectTab: (_tab: TabType) => void;
    selectedGenreId: string;
    selectGenre: (_id: string) => void;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

export const NavProvider = (props: { children: ReactNode }) => {
    const { children } = props;

    const [selectedTab, setTab] = useState<TabType>(tabs.find(tab => tab.content) ?? tabs[0]);
    const [selectedGenreId, setGenreId] = useState<string>('all');

    const selectTab = (tab: TabType) => {
        setTab(tab);
    };

    const selectGenre = (id: string) => {
        setGenreId(id);
    };

    return (
        <NavContext.Provider value={{ selectedTab, selectTab, selectedGenreId, selectGenre }}>
            {children}
        </NavContext.Provider>
    );
};

export const useNavContext = () => {
    const context = useContext(NavContext);

    if (!context) {
        throw new Error('useNavContext должен быть использован в NavProvider');
    }

    return context;
};