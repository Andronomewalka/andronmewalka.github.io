import { FC } from "react";
import styled from "styled-components";

import { useQueryNote } from "../../hooks/useQueryNote";
import { updateNote } from "../../indexedDB/IDBClient";
import { NoteTab } from "../../types";
import { Toggle } from "../primitives/Toggle";


// AZ: change to toggle later
export const HeaderNoteTabs: FC = () => {
    const { note, invalidateNote } = useQueryNote();

    const onSelectedTabChange = async (value: boolean) => {
        if (!note) {
            return;
        }

        const res = await updateNote({ ...note, tab: value ? NoteTab.Edit : NoteTab.View });
        if (res) {
            invalidateNote();
        }
    };

    return (
        <NoteTabsToggle
            label={note?.tab}
            checked={note?.tab === NoteTab.Edit}
            onChange={onSelectedTabChange}
        />
    );
};

const NoteTabsToggle = styled(Toggle)`
    width: 90px;
    margin-left: auto;
    font-size: 16px;
`;
