import { FC, useState } from "react";
import { useAtom } from "jotai";
import { initMediaStream, mediaStreamAtom } from "../state/mediaStreamAtom";

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
			.getUserMedia({ video: true })
			.then((res) => {
				setMediaStream({
					stream: res,
					status: "Connected",
				});
				setContent("Stop");
			})
			.catch((error) => {
				setMediaStream({
					status: error.message,
				});
				setContent("Start");
			})
			.finally(() => {
				setConnecting(false);
			});
	};

	return (
		<div className="flex items-center justify-center p-6">
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
