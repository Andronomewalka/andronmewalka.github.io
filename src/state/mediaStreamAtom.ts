import { atom } from 'jotai';

export type MediaStreamType = {
    stream?: MediaStream;
    status: string;
};

export const initMediaStream: MediaStreamType = {
    stream: undefined,
    status: "Not connected"
};

export const mediaStreamAtom = atom<MediaStreamType>(initMediaStream);