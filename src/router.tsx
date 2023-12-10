import { createBrowserRouter } from "react-router-dom";

import { NoteContainer } from "./components/NoteContainer";
import { App } from "./App";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/:noteSlug",
                element: <NoteContainer />
            }
        ]
    },
]);
