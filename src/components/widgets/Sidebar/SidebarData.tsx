export interface OptionType {
    slug: string;
    linkTo: string;
    name: string;
}

export const startOptions = [
    {
        slug: 'all',
        linkTo: '/feed/',
        name: 'Все анекдоты'
    }
];