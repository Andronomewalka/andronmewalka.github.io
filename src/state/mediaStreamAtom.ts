import { atom } from 'jotai';

export const initStreamSettings: StreamSettings = {
    aspectRatio: 1.33
};

export type StreamSettings = {
    aspectRatio: number;
};

export type MediaStreamType = {
    status: string;
    stream?: MediaStream;
    settings: StreamSettings;
};

export const initMediaStream: MediaStreamType = {
    status: "Not connected",
    stream: undefined,
    settings: initStreamSettings
};

export const mediaStreamAtom = atom<MediaStreamType>(initMediaStream);