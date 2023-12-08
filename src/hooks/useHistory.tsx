import {
    useState,
    useEffect,
    useCallback
} from 'react';

import HistoryRecordType, { HistoryActions } from '../components/pages/History/HistoryRecordType';
import { PostType } from '../components/shared/Post/PostType';

const useHistory = () => {
    const [historyRecords, setHistoryRecords] = useState<HistoryRecordType[]>([]);

    useEffect(() => {
        const localHistory = localStorage.getItem('history');
        if (localHistory) {
            setHistoryRecords(JSON.parse(localHistory, (key, value) => {
                if (key === 'dateTime') {
                    return new Date(value);
                }
                return value;
            }));
        }
    }, []);

    const storeHistory = (newHistoryRecords: HistoryRecordType[]) => {
        localStorage.setItem('history', JSON.stringify(newHistoryRecords));
    };

    const addHistoryRecord = useCallback((action: HistoryActions, post: PostType) => {
        const newHistoryRecords = [
            {
                action: action,
                dateTime: new Date(),
                post: post
            },
            ...historyRecords
        ];
        setHistoryRecords(newHistoryRecords);
        storeHistory(newHistoryRecords);
    }, [historyRecords]);

    return { historyRecords, addHistoryRecord } as const;
};

export default useHistory;