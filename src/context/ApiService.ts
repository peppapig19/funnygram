const BASE_URL = 'https://localhost:5001';

export interface Genre {
    guid: string;
    name: string;
}

export interface Joke {
    guid: string;
    tag: number;
    text: string;
    genre: string;
}

export default class ApiService {
    private static async fetchDataAsync<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                fetch(BASE_URL + '/api/' + url).then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        reject('Ошибка получения данных');
                    }
                });
            }, 1000);
        });
    }

    static async getGenresAsync(): Promise<Genre[]> {
        return this.fetchDataAsync<Genre[]>('Genres/all');
    }

    static async getPartGenresAsync(offset: number, count: number): Promise<Genre[]> {
        const url = `Genres/getPart?offset=${offset}&count=${count}`;
        return this.fetchDataAsync<Genre[]>(url);
    }

    static async getGenreByIdAsync(id: string): Promise<Genre> {
        return this.fetchDataAsync<Genre>('Genres/' + id);
    }

    static async getJokesAsync(): Promise<Joke[]> {
        return this.fetchDataAsync<Joke[]>('Jokes/all');
    }

    static async getPartJokesAsync(offset: number, count: number): Promise<Joke[]> {
        const url = `Jokes/getPart?offset=${offset}&count=${count}`;
        return this.fetchDataAsync<Joke[]>(url);
    }

    static async getJokeByGuidAsync(guid: string): Promise<Joke> {
        const url = `Jokes/getJokeByGuid?guid=${guid}`;
        return this.fetchDataAsync<Joke>(url);
    }

    static async getPartJokesByGenreAsync(
        offset: number,
        count: number,
        genreId?: string
    ): Promise<Joke[]> {
        if (genreId) {
            const url = `Jokes/getPartByGenre?genreId=${genreId}&offset=${offset}&count=${count}`;
            return this.fetchDataAsync<Joke[]>(url);
        } else {
            return ApiService.getPartJokesAsync(offset, count);
        }
    }
}