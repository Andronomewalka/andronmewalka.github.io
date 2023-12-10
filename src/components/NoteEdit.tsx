import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useNoteFieldDebounce } from "../hooks/useNoteFieldDebounce";
import { useQueryNote } from "../hooks/useQueryNote";
import { useQueryNotes } from "../hooks/useQueryNotes";
import { deleteNote, getNotes, updateNote } from "../indexedDB/IDBClient";
import { inputBaseCss } from "../styles";
import { formatDateTime } from "../utils/formatDate";
import { sameSlugLargestIndex } from "../utils/sameSlugLargestIndex";


export const NoteEdit: FC = () => {
    const navigate = useNavigate();
    const { note, invalidateNote } = useQueryNote();
    const { invalidateNotes } = useQueryNotes();

    const onDebouncedChange = async () => {
        if (title === note.title && content === note.content) {
            return;
        }

        const isTitleChanged = title != note.title;
        const encodedSlug = encodeURIComponent(title.toLowerCase().replaceAll(" ", "-").replaceAll(".", ""));
        const notes = await getNotes();

        let newSlug = note.slug;

        if (isTitleChanged) {
            const sameSlugIndexes = sameSlugLargestIndex(notes, encodedSlug);
            const maxSameSlugIndex = sameSlugIndexes.length ? Math.max(...sameSlugIndexes) : 0;
            const sameSlugIndex = maxSameSlugIndex + 1;
            newSlug = sameSlugIndex === 1 ? encodedSlug : `${encodedSlug}-${sameSlugIndex}`;
        }

        const res = await updateNote({
            ...note,
            slug: newSlug,
            title,
            content,
            updatedAt: new Date()
        });

        if (res) {
            if (isTitleChanged) {
                await deleteNote(note.slug);
                navigate(`/${newSlug}`, {
                    replace: true
                });
            }

            invalidateNote();
            invalidateNotes();
        }
    };

    const [title, setTitle] = useNoteFieldDebounce(note.title, onDebouncedChange);
    const [content, setContent] = useNoteFieldDebounce(note.content, onDebouncedChange);

    const onRefSet = useCallback((elem: HTMLTextAreaElement) => {
        if (!elem) {
            return;
        }

        elem.setSelectionRange(elem.value.length, elem.value.length);
        elem.focus();
    }, []);

    return (
        <NoteEditWrapper>
            <InputLabel>Title</InputLabel>
            <NoteEditInput
                value={title}
                placeholder="Title"
                onChange={(event) => setTitle(event.target.value)}
            />
            <InputLabel>Content</InputLabel>
            <NoteEditTextArea
                ref={onRefSet}
                value={content}
                placeholder="Content"
                onChange={(event) => setContent(event.target.value)}
            />
            <InputLabel>Updated at</InputLabel>
            <NoteUpdatedAt>{formatDateTime(note.updatedAt)}</NoteUpdatedAt>
        </NoteEditWrapper>
    );
};

const NoteEditWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 38px 1fr;
    gap: 16px;
    height: 100%;
`;

const InputLabel = styled.label`
    font-weight: 600;
    padding-top: 8px;
`;

const NoteEditInput = styled.input`
    ${inputBaseCss}
`;

const NoteEditTextArea = styled.textarea`
    ${inputBaseCss}
    height: 100%;
    resize: none;
`;

const NoteUpdatedAt = styled.span`
    padding-top: 8px;
`;
