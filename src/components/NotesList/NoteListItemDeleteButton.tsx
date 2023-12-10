import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useQueryNote } from "../../hooks/useQueryNote";
import { useQueryNotes } from "../../hooks/useQueryNotes";
import { deleteNote } from "../../indexedDB/IDBClient";
import { Note } from "../../types";
import { IconButton } from "../primitives/IconButton";


export const NoteListItemDeleteButton: FC<Pick<Note, "slug">> = ({ slug: listItemSlug }) => {
    const { note } = useQueryNote();
    const { invalidateNotes } = useQueryNotes();
    const navigation = useNavigate();

    const onDeleteClick = async () => {
        await deleteNote(listItemSlug);
        invalidateNotes();
        if (note?.slug === listItemSlug) {
            navigation("/");
        }
    };

    return (
        <DeleteIconButton icon="la-trash-alt" onClick={onDeleteClick} />
    );
};

const DeleteIconButton = styled(IconButton)`
    height: 100%;
`;
