import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Feed from '../Feed/Feed';
import Favorites from '../Favorites/Favorites';
import Data from '../../context/Data';
import './Tabs.scss';

const Tabs: React.FC = () => {
    const [data, setData] = useState<Data>(Object);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setData(new Data());
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader isAbsoluteCenter={true} />
            ) : (
                <>
                    <ul className='tabs'>
                        <li key='all'>
                            <NavLink to='/feed' className='tab' end>
                                <div>Все анекдоты</div>
                            </NavLink>
                        </li>
                        {data.categories.map((category, index) => (
                            <li key={index}>
                                <NavLink to={'/feed/' + category.slug} className='tab'>
                                    <div>{category.name}</div>
                                </NavLink>
                            </li>
                        ))}
                        <li key='favorites'>
                            <NavLink to='/favorites' className='tab'>
                                <div><i className='fa fa-heart' /> Избранное</div>
                            </NavLink>
                        </li>
                    </ul>
                    <Routes>
                        <Route path='/' element={<Navigate to='/feed' />} />
                        <Route path='/feed/:categorySlug?' element={<Feed data={data} />} />
                        <Route path='/favorites' element={<Favorites data={data} />} />
                    </Routes>
                </>
            )}
        </>
    );
};

export default Tabs;