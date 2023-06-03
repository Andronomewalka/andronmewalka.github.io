import { FC } from "react";
import { useAtom } from "jotai";
import { mediaStreamAtom } from "../state/mediaStreamAtom";

export const VideoButtons: FC = () => {
	const [mediaStream, setMediaStream] = useAtom(mediaStreamAtom);

	const onClick = () => {
		if (mediaStream) {
			mediaStream?.getTracks().forEach((track) => track.stop());
			setMediaStream(null);
		} else {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((res) => {
					setMediaStream(res);
				})
				.catch((err) => {
					console.log("err", err);
				});
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
