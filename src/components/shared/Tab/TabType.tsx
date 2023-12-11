import { ReactNode } from 'react';

import icons from '../Icon/IconNames';

export default interface TabType {
    id: string;
    name: string;
    iconName?: keyof typeof icons;
    content?: ReactNode;
    action?: () => void;
}