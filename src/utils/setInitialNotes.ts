import { updateNote } from "../indexedDB/IDBClient";
import { Note, NoteTab } from "../types";


const now = new Date();

const firstDate = new Date(now);
firstDate.setDate(firstDate.getDate() - 1);

const secondDate = new Date(now);
secondDate.setDate(secondDate.getDate() - 2);

const thirdDate = new Date(now);
thirdDate.setDate(thirdDate.getDate() - 3);

export const initialNotes: Note[] = [
    {
        slug: "weather-forecast-for-great-britain",
        title: "Weather Forecast for Great Britain",
        content: `
- #### Monday: Sunny with a slight chance of chocolate rain in the morning. Temperature: 18°C.
- #### Tuesday: Cloudy with a 50% chance of unicorn sightings. Temperature: 20°C.
- #### Wednesday: Heavy rain of jellybeans expected in the afternoon. Temperature: 15°C.
- #### Thursday: Partially cloudy, with a 30% chance of rainbow showers. Temperature: 22°C.
- #### Friday: Foggy with a high chance of invisible snowflakes. Temperature: 14°C.
- #### Saturday: Clear skies, perfect for flying pigs. Temperature: 25°C.
- #### Sunday: Tornado warning—secure your flying umbrellas! Temperature: 19°C.
`,
        updatedAt: now,
        tab: NoteTab.View
    },
    {
        slug: "do-do-list",
        title: "To do list",
        content: `
1. Save the world from paperclip shortage.
2. Teach penguins to tap dance.
3. Invent a new color and name it "blorple."
4. Find the missing sock that always disappears in the laundry.
5. Build a time machine and attend a dinosaur tea party.
6. Convince a cat to reveal the secret of eternal happiness.
7. Learn to speak **fluent dolphin**.
8. Plant jellybean seeds and grow a *candy garden*.
9. Solve the mystery of who let the dogs out.
10. Invent a device that translates baby talk into understandable language.
`,
        updatedAt: firstDate,
        tab: NoteTab.View
    },
    {
        slug: "upcoming-bills-%3A(",
        title: "Upcoming bills :(",
        content: `
1. Electricity Bill
    - Amount: $12.34
    - Note: Reduced energy consumption by using pet hamster-powered generator.

2. Water Bill
    - Amount: $8.76
    - Note: Installed a rainwater harvesting system—saving the planet drop by drop.

3. Internet Bill
    - Amount: $29.99
    - Note: Upgraded to faster-than-light internet speed—now downloading data from the future.

4. Grocery Bill
    - Amount: $50.00
    - Note: Purchased essentials like unicorn food and dragon snacks.

5. Rent/Mortgage
    - Amount: $1,000.00
    - Note: Living in a floating castle above the clouds—renting from a friendly cloud giant.
`,
        updatedAt: secondDate,
        tab: NoteTab.View
    },
];


export let setInitialNotesPromise: Promise<void> = null;

export const setInitialNotes = async () => {
    const initItemsSet = localStorage.getItem("initItemsSet");
    if (!initItemsSet) {
        await Promise.all(initialNotes.map(updateNote));
        localStorage.setItem("initItemsSet", "true");
    }

    setInitialNotesPromise = Promise.resolve();
};
