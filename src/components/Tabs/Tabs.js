import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tabs.css';

const Tabs = (props) => {
    const { categories } = props;
    return (
        <ul className='tabs'>
            <li key='all'>
                <NavLink to='/feed' end className='tab'>
                    <div>Все анекдоты</div>
                </NavLink>
            </li>
            {categories.map((category, index) => (
                <li key={index}>
                    <NavLink to={'/feed/' + category.slug} className='tab'>
                        <div>{category.name}</div>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Tabs;