import { FC } from "react";
import Markdown from "react-markdown";
import styled from "styled-components";

import { useQueryNote } from "../hooks/useQueryNote";
import { formatDateTime } from "../utils";


export const NoteView: FC = () => {
    const { note } = useQueryNote();

    if (!note) {
        return;
    }

    return (
        <NoteViewWrapper>
            <UpdatedAt>{formatDateTime(note.updatedAt)}</UpdatedAt>
            <MarkdownWrapper>{`# ${note.title}`}</MarkdownWrapper>
            <MarkdownWrapper>{note.content}</MarkdownWrapper>
        </NoteViewWrapper>
    );
};

const NoteViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const UpdatedAt = styled.span`
    color: ${p => p.theme.color.text.secondary};
    text-align: center;
    font-size: 13px;
`;

const MarkdownWrapper = styled(Markdown)`
    border: none;
    white-space: normal;
`;


