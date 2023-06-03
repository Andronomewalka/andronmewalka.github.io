import { FC } from "react";
import { useMediaStream } from "./MediaStreamContext/useMediaStream";

export const VideoButtons: FC = () => {
	const { mediaStream, startStream, stopStream } = useMediaStream();

	const onClick = () => {
		if (mediaStream) {
			stopStream();
		} else {
			startStream();
		}
	};

	return (
		<div className="flex items-center justify-center p-6">
			<button
				className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				onClick={onClick}
			>
				{mediaStream ? "Stop" : "Start"}
			</button>
		</div>
	);
};
