import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Tabs from './components/Tabs/Tabs';
import Feed from './components/Feed/Feed';

const App = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/categories`)
            .then(response => response.json())
            .then(categories => setCategories(categories));
    }, []);

    return (
        <div>
            <h1 class='header'>Анекдоты</h1>
            <Tabs categories={categories} />
            <Routes>
                <Route path='/' element={<Navigate to="/feed" />} />
                <Route path="/feed/:categorySlug?" element={<Feed categories={categories} />} />
            </Routes>
        </div>
    );
};

export default App;