export enum NoteTab {
    View = "View",
    Edit = "Edit"
}

export type Note = {
    slug: string;
    title: string;
    content: string;
    updatedAt: Date;
    tab: NoteTab;
};
