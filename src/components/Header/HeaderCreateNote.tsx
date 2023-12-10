import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useQueryNotes } from "../../hooks/useQueryNotes";
import { getNotes, updateNote } from "../../indexedDB/IDBClient";
import { NoteTab } from "../../types";
import { sameSlugLargestIndex } from "../../utils/sameSlugLargestIndex";
import { IconButton } from "../primitives/IconButton";


const NEW_NOTE_BASE = "new-note";

export const HeaderCreateNote: FC = () => {
    const navigate = useNavigate();
    const { invalidateNotes } = useQueryNotes();

    const onCreateNote = async () => {
        const notes = await getNotes();

        // AZ: find all non NaN new notes
        // new note index will be max new note index + 1
        const allNewNotesIndexes = sameSlugLargestIndex(notes, NEW_NOTE_BASE);
        const maxNewNoteIndex = allNewNotesIndexes.length ? Math.max(...allNewNotesIndexes) : 0;
        const newNoteIndex = maxNewNoteIndex + 1;

        const res = await updateNote({
            slug: `${NEW_NOTE_BASE}-${newNoteIndex}`,
            title: `New note-${newNoteIndex}`,
            content: "Hello there",
            updatedAt: new Date(),
            tab: NoteTab.Edit
        });

        if (res) {
            invalidateNotes();
            navigate(`/${NEW_NOTE_BASE}-${newNoteIndex}`);
        }
    };

    return (
        <IconButton icon="la-edit" onClick={onCreateNote} />
    );
};
