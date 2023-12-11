import React from 'react';

import icons from './IconNames';

import './Icon.scss';

interface IconProps {
    name: keyof typeof icons;
    className?: string;
}

const Icon = (props: IconProps) => {
    const { name, className } = props;
    const SelectedIcon = icons[name];

    if (!SelectedIcon) {
        return false;
    }

    return (
        <SelectedIcon className={'icon ' + (className ? className : '')} />
    )
};

export default Icon;