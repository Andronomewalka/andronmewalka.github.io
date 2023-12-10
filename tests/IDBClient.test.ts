import { expect, test, vi } from "vitest";

import { getNotes, updateNote } from "../src/indexedDB/IDBClient";
import { Note, NoteTab } from "../src/types";

import "fake-indexeddb/auto";


const note: Note = {
    slug: "some",
    title: "some",
    content: "here is some note",
    tab: NoteTab.View,
    updatedAt: new Date(5)
};

vi.stubGlobal("DB_NAME", "NotedDB_test");
vi.stubGlobal("STORE_NAME", "NotedStore_test");

// afterEach(() => {
//     indexedDB.deleteDatabase("NotedDB_test");
// });

test("should create note in db if there is no note with such slug", async () => {
    indexedDB.open("NotedDB_test");
    await updateNote(note);
    const notes = await getNotes();
    expect(notes).toHaveLength(1);
});
