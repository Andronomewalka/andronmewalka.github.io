import { Note } from "../types";
import { getDB, STORE_NAME } from "./getDb";
import { IDBCursor, IDBOpenRequestEvenProps } from "./types";


const SEARCH_DELIMITERS = /[ !?#$%^&*,.:+-/(/)'"]/;

export const createTransaction = async (mode: IDBTransactionMode) => {
    const db = await getDB();

    const transaction = db.transaction(STORE_NAME, mode);

    transaction.addEventListener("error", (error) => {
        console.warn("Transaction error", error);
    });

    transaction.addEventListener("abort", () => {
        console.warn("Transaction aborted");
    });

    return transaction;
};

export const requestAsync = <T>(request: IDBRequest<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
        request.addEventListener("success", (event) => {
            const res = (event.target as unknown as IDBOpenRequestEvenProps).result as unknown as T;
            resolve(res);
        });

        request.addEventListener("error", (event) => {
            reject(`Database error: ${(event.target as unknown as IDBOpenRequestEvenProps).errorCode}`);
        });
    });
};

export const search = (filter: string, store: IDBObjectStore): Promise<Note[]> => {
    const request = store.openCursor();

    const result: Note[] = [];

    const lowerFilterParts = filter?.trim()?.toLocaleLowerCase().split(SEARCH_DELIMITERS);

    return new Promise((resolve, reject) => {
        request.addEventListener("success", (event) => {
            const cursor = (event.target as unknown as IDBOpenRequestEvenProps).result as unknown as IDBCursor;

            if (!cursor) {
                resolve(result);
                return;
            }

            if (isContentSatisfiesSearch(cursor.value.title, lowerFilterParts) ||
                isContentSatisfiesSearch(cursor.value.content, lowerFilterParts)) {
                result.push(cursor.value);
            }

            cursor.continue();
        });

        request.addEventListener("error", (event) => {
            reject(`Database error: ${(event.target as unknown as IDBOpenRequestEvenProps).errorCode}`);
        });
    });
};

const isContentSatisfiesSearch = (text: string, searchParts: string[]) => {
    if (!text) {
        return false;
    }

    const lowerText = text.toLowerCase();

    if (searchParts?.length === 1) {
        return lowerText.includes(searchParts[0]);
    }

    const lowerTextParts = text.toLowerCase().split(SEARCH_DELIMITERS);
    return searchParts.every((part) => lowerTextParts.includes(part));
};
