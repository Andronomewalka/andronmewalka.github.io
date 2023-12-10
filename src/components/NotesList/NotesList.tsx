import { FC } from "react";
import styled from "styled-components";

import { useQueryNotes } from "../../hooks/useQueryNotes";
import { NoteListItem } from "./NoteListItem";


export const NOTES_LIST_KEY = "list";

export const NotesList: FC = () => {
    const { notes, isFetched } = useQueryNotes(NOTES_LIST_KEY);

    if (!isFetched) {
        return null;
    }

    return (
        <NotesListWrapper>
            {notes.length ? notes
                .toSorted((cur, next) => next.updatedAt.getTime() - cur.updatedAt.getTime())
                .map((cur) => <NoteListItem key={cur.slug} {...cur} />) :
                <EmptyNotesLabel>No items found</EmptyNotesLabel>}
        </NotesListWrapper>
    );
};

const NotesListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 300px;
    margin: 0;
    padding: 0;
    list-style: none;
`;

const EmptyNotesLabel = styled.span`
    margin: auto;
`;
