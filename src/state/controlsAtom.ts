import { atom } from 'jotai';

export type ControlsType = {
    saturation: number;
    brightness: number;
    contrast: number;
    hue: number;
    warmth: number;
    cold: number;
};

export const initControls: ControlsType = {
    saturation: 1,
    brightness: 1,
    contrast: 1,
    hue: 0,
    warmth: 0,
    cold: 0
};

export const controlsAtom = atom(initControls);