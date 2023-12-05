export interface TabType {
    slug: string;
    linkTo: string;
    name: string;
    icon?: string;
}

export const tabs = [
    {
        slug: 'anecdotes',
        linkTo: '/feed/',
        name: 'Анекдоты'
    },
    {
        slug: 'favorites',
        linkTo: '/feed/favorites',
        name: 'Избранное',
        icon: 'fa fa-heart'
    },
    {
        slug: 'settings',
        linkTo: '/settings',
        name: 'Настройки',
        icon: 'fa fa-gear'
    }
];