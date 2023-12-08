import { ReactNode } from 'react';

export default interface TabType {
    id: string;
    name: string;
    icon?: string;
    content?: ReactNode;
    action?: () => void;
}