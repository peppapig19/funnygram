import React from 'react';
import './Loader.scss';

interface LoaderProps {
    isAbsoluteCenter?: boolean;
}

const Loader: React.FC<LoaderProps> = (props) => {
    const { isAbsoluteCenter } = props;
    let className = 'spinner';
    if (isAbsoluteCenter) className += ' absolute-center';

    return (
        <div className={className}></div>
    );
}

export default Loader;