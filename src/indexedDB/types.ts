import { Note } from "../types";


export type IDBOpenRequestEvenProps = {
    result: IDBDatabase;
    errorCode?: number;
};

export type IDBCursor = {
    value: Note;
    continue: () => void;
};
