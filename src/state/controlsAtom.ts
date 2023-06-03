import { atom } from 'jotai';

export type ControlsType = {
    saturation: number;
    warmth: number;
};

export const controlsAtom = atom<ControlsType>({
    saturation: 1,
    warmth: 0
});