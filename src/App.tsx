import React from 'react';

import Header from './components/widgets/Header/Header';
import Navigation from './components/components/Navigation/Navigation';

import { NavProvider } from './context/NavContext';

const App = () => {
    return (
        <NavProvider>
            <Header />
            <Navigation />
        </NavProvider>
    );
};

export default App;