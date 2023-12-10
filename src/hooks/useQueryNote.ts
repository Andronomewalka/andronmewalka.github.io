import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";

import { getNote } from "../indexedDB/IDBClient";
import { Note } from "../types";


export const useQueryNote = () => {
    const queryClient = useQueryClient();
    const location = useLocation();

    const { data: note } = useQuery<Note>({
        queryKey: ["note", location.pathname],
        queryFn: () => getNote(location.pathname.substring(1)),
        placeholderData: keepPreviousData
    });

    const invalidateNote = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["note", location.pathname] });
    }, [location.pathname, queryClient]);

    return {
        note,
        invalidateNote
    };
};
