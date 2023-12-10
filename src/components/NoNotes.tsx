import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { NoSuchNote } from "./NoSuchNote";


export const NoNotes: FC = () => {
    const navigate = useNavigate();

    const onNoteCreated = useCallback((slug: string) => {
        navigate(`/${slug}`);
    }, [navigate]);

    return (
        <NoSuchNote
            title="Seems like there are no notes. Let's create the first one"
            onNoteCreated={onNoteCreated}
        />
    );
};
