import { afterEach, beforeEach, expect, test } from "vitest";

import { clearCachedDBInstance, DB_NAME, getDB } from "../src/indexedDB/getDb";
import { deleteNote, getNote, getNotes, updateNote } from "../src/indexedDB/IDBClient";
import { Note, NoteTab } from "../src/types";

import "fake-indexeddb/auto";


const note: Note = {
    slug: "some",
    title: "some",
    content: "here is some note",
    tab: NoteTab.View,
    updatedAt: new Date(5)
};

const allNotes: Note[] = [
    note,
    { ...note, slug: "any", content: "from any" },
    { ...note, slug: "foo", content: "for aaaa any" }
];

beforeEach(async () => {
    await Promise.all(allNotes.map(updateNote));
});

afterEach(async () => {
    (await getDB()).close();
    clearCachedDBInstance();

    await new Promise<Event>((resolve) => {
        const request = indexedDB.deleteDatabase(DB_NAME);
        request.addEventListener("success", resolve);
    });
});

test("should create new note", async () => {
    await updateNote({ ...note, slug: "another" });
    const notes = await getNotes();
    expect(notes).toHaveLength(4);
});

test("should update existing note", async () => {
    const now = new Date();
    const updatedNote = {
        ...note,
        title: "updated title",
        content: "updated content",
        tab: NoteTab.Edit,
        updatedAt: now
    };

    await updateNote(updatedNote);

    const notes = await getNotes();
    expect(notes.find((cur) => cur.slug === updatedNote.slug)).toEqual(updatedNote);
});

test("should delete existing note", async () => {
    await deleteNote(note.slug);

    const notesAfterDelete = await getNotes();
    expect(notesAfterDelete).toHaveLength(2);
});

test("should get all notes", async () => {
    const allNotes = await getNotes();
    expect(allNotes).toHaveLength(3);
});

test("should get notes by search", async () => {
    const simpleSearch = await getNotes("any");
    expect(simpleSearch).toHaveLength(2);

    const complexSearch = await getNotes("any for");
    expect(complexSearch).toHaveLength(1);

    expect(
        complexSearch[0].title.includes("any") ||
        complexSearch[0].title.includes("for") ||
        complexSearch[0].content.includes("any") ||
        complexSearch[0].content.includes("for")
    ).toBeTruthy();
});

test("should get note by slug", async () => {
    const resultNote = await getNote(note.slug);
    expect(resultNote).toEqual(note);
});
