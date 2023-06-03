import { FC, useCallback, useEffect, useRef } from "react";
import { startStreamToCanvas, stopStreamToCanvas, updateBuffer } from "../../webgl/camText";
import { useCanvasResize } from "./useCanvasResize";
import { useOnUpdateControls } from "./useOnUpdateControls";
import { useAtom } from "jotai";
import { mediaStreamAtom } from "../../state/mediaStreamAtom";

export const VideoCanvas: FC = () => {
	const [mediaStream] = useAtom(mediaStreamAtom);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const videoRef = useRef<HTMLVideoElement>();
	if (!videoRef.current) {
		videoRef.current = document.createElement("video");
		videoRef.current.autoplay = true;
	}

	const onCanvasResize = useCallback(() => {
		if (!canvasRef.current) {
			return;
		}

		updateBuffer(canvasRef.current);

		const weirdH1s = document.getElementsByTagName("h1");
		if (weirdH1s.length > 0) {
			document.body.removeChild(weirdH1s[0]); // no idea why it adds on set buffer
		}
	}, []);

	useCanvasResize(canvasRef, onCanvasResize);
	useOnUpdateControls(canvasRef);

	useEffect(() => {
		const video = videoRef.current;
		const canvas = canvasRef.current;
		if (!canvas || !video || !mediaStream) {
			return;
		}

		video.srcObject = mediaStream;
		if (!canvasRef.current.parentElement) {
			return;
		}

		const onVideoReady = () => {
			startStreamToCanvas(canvas, video);
			requestAnimationFrame(() => updateBuffer(canvas));
		};

		video.addEventListener("loadedmetadata", onVideoReady);
		return () => video.removeEventListener("loadedmetadata", onVideoReady);
	}, [mediaStream]);

	useEffect(() => {
		if (!mediaStream) {
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}
			stopStreamToCanvas();
		}
	}, [mediaStream]);

	useEffect(() => {}, []);

	return (
		<div className="flex w-full items-center justify-center">
			<canvas className="w-full" ref={canvasRef} />
		</div>
	);
};
