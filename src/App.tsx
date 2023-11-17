import React, { useState } from 'react';
import Tabs from './components/Tabs/Tabs';

const App: React.FC = () => {
    return (
        <>
            <h1 className='header'>Анекдоты</h1>
            <Tabs/>
        </>
    );
};

export default App;