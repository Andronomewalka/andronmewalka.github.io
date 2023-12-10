import { Note } from "../types";


export const sameSlugLargestIndex = (notes: Note[], slugBase: string) => {
    return notes
        .filter((cur) => cur.slug.startsWith(slugBase))
        .map((cur) => Number.parseInt(cur.slug.substring(`${slugBase}-`.length)))
        .filter((cur) => !Number.isNaN(cur));
};
