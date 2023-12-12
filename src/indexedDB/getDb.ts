import { IDBOpenRequestEvenProps } from "./types";


let db: IDBDatabase;
let initializeDbPromise: Promise<IDBDatabase> = null;

export const DB_NAME = "NotedDB";
export const STORE_NAME = "NotedStore";

export const getDB = (): Promise<IDBDatabase> | IDBDatabase => {
    if (db) {
        return db;
    }

    if (initializeDbPromise) {
        return initializeDbPromise;
    }

    initializeDbPromise = new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(DB_NAME);

        openRequest.addEventListener("success", (event: Event) => {
            db = (event.target as unknown as IDBOpenRequestEvenProps).result;
            resolve(db);
        });

        openRequest.addEventListener("error", (event) => {
            reject(`Database error: ${(event.target as unknown as IDBOpenRequestEvenProps).errorCode}`);
        });

        openRequest.addEventListener("upgradeneeded", (event) => {
            db = (event.target as unknown as IDBOpenRequestEvenProps).result;
            if (!db.objectStoreNames.contains("STORE_NAME")) {
                db.createObjectStore(STORE_NAME, { keyPath: "slug" });
            }
        });
    });

    return initializeDbPromise;
};

// AZ: there is no workaround to really wait on close
// db.onclose() never fires
// https://github.com/w3c/IndexedDB/issues/72
export const clearCachedDBInstance = () => {
    db = null;
    initializeDbPromise = null;
};
