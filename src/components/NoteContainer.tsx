import { FC } from "react";

import { useQueryNote } from "../hooks/useQueryNote";
import { NoteTab } from "../types";
import { NoSuchNote } from "./NoSuchNote";
import { NoteEdit } from "./NoteEdit";
import { NoteView } from "./NoteView";


export const NoteContainer: FC = () => {
    const { note } = useQueryNote();

    if (!note) {
        return <NoSuchNote title="Oops. Seems like such note doesn't exist yet." />;
    }

    return note.tab === NoteTab.Edit ? <NoteEdit /> : <NoteView />;
};


