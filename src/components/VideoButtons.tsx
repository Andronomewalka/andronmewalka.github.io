import { FC, useState } from "react";
import { useAtom } from "jotai";
import {
	MediaStreamType,
	initMediaStream,
	initStreamSettings,
	mediaStreamAtom
} from "../state/mediaStreamAtom";
import { getCorrectedAspectRatio } from "../utils/getCorrectedAspectRatio";

export const VideoButtons: FC = () => {
	const [connecting, setConnecting] = useState(false);
	const [content, setContent] = useState("Start");
	const [mediaStream, setMediaStream] = useAtom(mediaStreamAtom);

	const onClick = () => {
		if (mediaStream.stream) {
			mediaStream.stream?.getTracks().forEach((track) => track.stop());
			setMediaStream(initMediaStream);
			setContent("Start");
			return;
		}

		setConnecting(true);
		setContent("Hold on");
		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: { ideal: 4096 },
					height: { ideal: 2160 },
					aspectRatio: 16 / 9
				}
			})
			.then((res) => {
				const mediaStream: MediaStreamType = {
					stream: res,
					status: "Connected",
					settings: initStreamSettings
				};

				const rawSettings = res.getVideoTracks()[0].getSettings();
				if (rawSettings.width && rawSettings.height && rawSettings.aspectRatio) {
					mediaStream.settings = {
						aspectRatio: getCorrectedAspectRatio(rawSettings.width, rawSettings.height)
					};
				}

				setMediaStream(mediaStream);
				setContent("Stop");
			})
			.catch((error) => {
				setMediaStream({
					status: error.message,
					settings: initStreamSettings
				});
				setContent("Start");
			})
			.finally(() => {
				setConnecting(false);
			});
	};

	return (
		<div data-video-buttons className="flex items-center justify-center p-6">
			<button
				className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-600"
				disabled={connecting}
				onClick={onClick}
			>
				{content}
			</button>
		</div>
	);
};
