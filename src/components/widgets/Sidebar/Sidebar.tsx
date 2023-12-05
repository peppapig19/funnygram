import React, {
    useState,
    useEffect
} from 'react';
import { NavLink } from 'react-router-dom';

import Loader from '../Loader/Loader';

import Data from '../../../context/Data';
import { OptionType, startOptions } from './SidebarData';

import './Sidebar.scss';

const data = new Data();

interface SidebarProps {
    toggleSidebar: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const { toggleSidebar } = props;

    const [options, setOptions] = useState<OptionType[]>([...startOptions]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        data.loadCategoriesAsync().then(res => {
            const categories = res.map(category => {
                return {
                    ...category,
                    linkTo: '/feed/' + category.slug
                };
            });
            setOptions([
                ...startOptions,
                ...categories
            ]);
            setIsLoading(false);
        });
    }, []);

    const renderOption = (option: OptionType) => {
        return (
            <li key={'sidebar_' + option.slug}>
                <NavLink className='sidebar-option' to={option.linkTo}>
                    <div>{option.name}</div>
                </NavLink>
            </li>
        );
    };

    return (
        <div className='sidebar'>
            <div className='sidebar-close' onClick={toggleSidebar}>
                <i className='fa fa-xmark fa-xl'></i>
            </div>
            <div className='sidebar-content'>
                <h2 className='sidebar-header'>Жанры</h2>
                {isLoading ? (
                    <Loader />
                ) : (
                    <ul className='sidebar-options'>
                        {options.map(option => renderOption(option))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sidebar;