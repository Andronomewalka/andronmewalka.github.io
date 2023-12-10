import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getNotes } from "../indexedDB/IDBClient";
import { Note } from "../types";


export const useQueryNotes = (key?: string) => {
    const queryClient = useQueryClient();

    const { data: notes, isFetched } = useQuery<Note[]>({
        queryKey: ["notes", key],
        queryFn: () => getNotes(),
        placeholderData: []
    });

    const invalidateNotes = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
    }, [queryClient]);

    const setNotesCache = useCallback((notes: Note[]) => {
        queryClient.setQueryData(["notes", key], notes);
    }, [key, queryClient]);

    return {
        notes,
        isFetched,
        invalidateNotes,
        setNotesCache
    };
};
