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
            resolve(db);
        });
    });

    return initializeDbPromise;
};


// AZ: mock for testing
// const notesMock: Note[] = [
//     {
//         slug: "/old-note",
//         title: "I'm from 2017-10-05",
//         updatedAt: dayjs("2017-10-05").toDate()
//     },
//     {
//         slug: "/old-note-2",
//         title: "I'm from 2017-10-09",
//         updatedAt: dayjs("2017-10-09").toDate()
//     },
//     {
//         slug: "/old-note-3",
//         title: "I'm from 2023-09-01",
//         updatedAt: dayjs("2023-09-01").toDate()
//     },
//     {
//         slug: "/old-note-4",
//         title: "I'm from 2023-10-02",
//         updatedAt: dayjs("2023-10-02").toDate()
//     },
//     {
//         slug: "/old-note-5",
//         title: "I'm from 2023-09-30",
//         updatedAt: dayjs("2023-09-30").toDate()
//     },
//     {
//         slug: "/old-note-6",
//         title: "I'm from 2023-09-27",
//         updatedAt: dayjs("2023-09-27").toDate()
//     },
//     {
//         slug: "/today-note",
//         title: "I'm created today",
//         updatedAt: new Date()
//     }
// ];
