import { PostType } from "../../shared/Post/PostType";

export enum HistoryActions {
    addToFavs = 'в избранное добавлен пост',
    removeFromFavs = 'из избранного удалён пост',
    create = 'создан пост'
}

export default interface HistoryRecordType {
    action: HistoryActions;
    dateTime: Date;
    post: PostType;
}