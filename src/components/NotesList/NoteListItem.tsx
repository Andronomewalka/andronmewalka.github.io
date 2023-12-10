import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { trimCss } from "../../styles";
import { Note } from "../../types";
import { formatDate } from "../../utils";
import { NoteListItemDeleteButton } from "./NoteListItemDeleteButton";


export const NoteListItem: FC<Note> = ({ slug, title, content, updatedAt }) => {
    const location = useLocation();
    const [isHover, setIsHover] = useState(false);

    return (
        <NoteItem
            $isSelected={location.pathname == `/${slug}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <NoteLink to={slug}>
                <NoteLinkTitle>{title}</NoteLinkTitle>
                <NoteLinkDesc>{content}</NoteLinkDesc>
                <NoteLinkDate>{formatDate(updatedAt)}</NoteLinkDate>
            </NoteLink>
            {isHover && <NoteListItemDeleteButton slug={slug} />}
        </NoteItem>
    );
};

const NoteItem = styled.li<{ $isSelected: boolean; }>`
    position: relative;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    background-color: ${p => p.$isSelected && p.theme.color.background.active};

    &:hover {
        background-color: ${p => !p.$isSelected && p.theme.color.background.hover};
        border-radius: 4px;

        ::after {
            background-color: transparent;
        }
    }

    ::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 5px;
        right: 5px;
        height: 1px;
        background-color: ${p => p.$isSelected ? "transparent" : p.theme.color.border};
    }
`;

const NoteLink = styled(Link)`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
    width: 100%;
    padding: 8px 16px;
    color: ${p => p.theme.color.text.primary};
    text-decoration: none;
    user-select: none;
`;

const NoteLinkTitle = styled.span`
    ${trimCss}
`;

const NoteLinkDesc = styled.span`
    ${trimCss}
    grid-column: 1;
    color: ${p => p.theme.color.text.secondary};
    font-size: 14px;
`;

const NoteLinkDate = styled.span`
    ${trimCss}
    grid-row: 2;
    grid-column: 2;
    justify-self: end;
    color: ${p => p.theme.color.text.secondary};
    font-size: 14px;
`;
