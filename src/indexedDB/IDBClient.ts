import { Note } from "../types";
import { setInitialNotesPromise } from "../utils/setInitialNotes";
import { STORE_NAME } from "./getDb";
import { createTransaction, requestAsync, search } from "./utils";


export const getNote = async (slug: string): Promise<Note> => {
    const tx = await createTransaction("readonly");
    const store = tx.objectStore(STORE_NAME);
    const request: IDBRequest<Note> = store.get(slug);
    return await requestAsync(request) ?? null;
};

export const getNotes = async (filter?: string): Promise<Note[]> => {
    await setInitialNotesPromise;
    const tx = await createTransaction("readonly");
    const store = tx.objectStore(STORE_NAME);
    if (filter) {
        return await search(filter, store);
    }

    const request: IDBRequest<Note[]> = store.getAll();
    return await requestAsync(request) ?? [];
};

export const updateNote = async (note: Partial<Note>): Promise<IDBValidKey> => {
    const tx = await createTransaction("readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request: IDBRequest<IDBValidKey> = store.put(note);
    return await requestAsync(request);
};

export const deleteNote = async (slug: string): Promise<IDBValidKey> => {
    const tx = await createTransaction("readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request: IDBRequest<undefined> = store.delete(slug);
    return await requestAsync(request);
};

