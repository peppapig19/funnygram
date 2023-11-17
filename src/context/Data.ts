import { resolve } from 'path';
import db from './db.json';

export interface Post {
    id: number;
    categoryId: number;
    title: string;
    body: string;
}

export interface Category {
    id: number;
    slug: string;
    name: string;
}



class Data {
    posts: Post[];
    categories: Category[];

    constructor() {
        this.posts = db.posts;
        this.categories = db.categories;
    }

    getPostById = (id: number) => {
        return this.posts.find(post => post.id === id);
    }

    getCategoryBySlug = (slug: string) => {
        return this.categories.find(category => category.slug === slug);
    }

    getPostsByCategory = (category: Category) => {
        return this.posts.filter(post => post.categoryId === category.id);
    }

    getPostsByCategorySlug = (categorySlug: string) => {
        const category = this.getCategoryBySlug(categorySlug) ?? this.categories[0];
        return this.posts.filter(post => post.categoryId === category.id);
    }

    addPost = (newPost: Post) => {
        this.posts.push(newPost);
    }

    updatePost = (modifiedPost: Post) => {
        this.posts = this.posts.map(post => {
            if (post.id === modifiedPost.id) {
                return { ...post, ...modifiedPost };
            }
            return post;
        });
    }

    deletePost = (postToDelete: Post) => {
        this.posts = this.posts.filter(post => post.id !== postToDelete.id);
    }

    loadingCategories = async () : Promise<Category[]> => {
        return new Promise((resolve) => {
            setTimeout(()=>{
                return resolve(this.categories)
            }, 1000)
        })
    }

    loadingPosts = async (categorySlug: string) : Promise<Post[]> => {
        return new Promise((resolve) => {
            setTimeout(()=>{
                return resolve(this.getPostsByCategorySlug(categorySlug))
            }, 1000)
        })
    }
}

export default Data;