import React from 'react';

import GenreMenu from '../../components/GenreMenu/GenreMenu';

import './Sidebar.scss';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const { isOpen, toggleSidebar } = props;

    if (!isOpen) {
        return false;
    }

    return (
        <div className='sidebar'>
            <div className='close-sidebar' onClick={toggleSidebar}>
                <i className='fa fa-xmark fa-xl'></i>
            </div>
            <div className='sidebar-content'>
                <GenreMenu />
            </div>
        </div>
    );
};

export default Sidebar;