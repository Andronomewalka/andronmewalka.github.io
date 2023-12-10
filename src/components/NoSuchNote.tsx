import { FC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { Button } from "./primitives/Button";
import { useQueryNote } from "../hooks/useQueryNote";
import { useQueryNotes } from "../hooks/useQueryNotes";
import { updateNote } from "../indexedDB/IDBClient";
import { NoteTab } from "../types";


const FIRST_NOTE = "first-note";

type NoSuchNoteProps = {
    title: string;
    onNoteCreated?: (slug: string) => void;
};

export const NoSuchNote: FC<NoSuchNoteProps> = ({ title, onNoteCreated }) => {
    const location = useLocation();
    const { invalidateNotes } = useQueryNotes();
    const { invalidateNote } = useQueryNote();

    const onCreateClick = async () => {
        const res = await updateNote({
            slug: location.pathname.substring(1) || FIRST_NOTE,
            title: location.pathname.substring(1) || FIRST_NOTE,
            content: "Hello there",
            updatedAt: new Date(),
            tab: NoteTab.Edit
        });

        if (res) {
            invalidateNotes();
            invalidateNote();
            onNoteCreated?.(res.toString());
        }
    };

    return (
        <NoSuchNoteWrapper>
            <h2>{title}</h2>
            <Button text="Create one" onClick={onCreateClick} />
        </NoSuchNoteWrapper>
    );
};

const NoSuchNoteWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
