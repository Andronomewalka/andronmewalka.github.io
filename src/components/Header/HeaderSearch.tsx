import { FC, useState } from "react";
import styled from "styled-components";

import { INPUT_DEBOUNCE, useDebounce } from "../../hooks/useDebounce";
import { useQueryNotes } from "../../hooks/useQueryNotes";
import { getNotes } from "../../indexedDB/IDBClient";
import { inputBaseCss } from "../../styles";
import { NOTES_LIST_KEY } from "../NotesList/NotesList";


export const HeaderSearch: FC = () => {
    const [search, setSearch] = useState("");

    const { setNotesCache } = useQueryNotes(NOTES_LIST_KEY);

    const onDebouncedSearch = async () => {
        const notes = await getNotes(search);
        setNotesCache(notes);
    };

    useDebounce(
        search,
        INPUT_DEBOUNCE,
        onDebouncedSearch
    );

    return (
        <SearchWrapper>
            <SearchInputIcon className="las la-search" />
            <SearchInput
                value={search}
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
            />
        </SearchWrapper>
    );
};

const SearchWrapper = styled.div`
    flex: 1;
    position: relative;
`;

const SearchInputIcon = styled.i`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8px;
`;

const SearchInput = styled.input`
    ${inputBaseCss}
    height: 36px;
    padding-left: 26px;
    font-size: 16px;
`;
