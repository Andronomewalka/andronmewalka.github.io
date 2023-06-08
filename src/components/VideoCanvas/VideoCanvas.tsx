import { FC, useCallback, useEffect, useRef } from "react";
import { startStreamToCanvas, stopStreamToCanvas, updateBuffer } from "../../webgl/camText";
import { useCanvasResize } from "./useCanvasResize";
import { useOnUpdateControls } from "./useOnUpdateControls";
import { useAtom } from "jotai";
import { mediaStreamAtom } from "../../state/mediaStreamAtom";
import { controlsAtom } from "../../state/controlsAtom";
import { useRefState } from "../../hooks/useRefState";
import { VideoControls } from "../VideoControls/VideoControls";

export const VideoCanvas: FC = () => {
	const [mediaStream] = useAtom(mediaStreamAtom);
	const [controls] = useAtom(controlsAtom);
	const refControls = useRefState(controls);

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

	const resizeCanvas = useCanvasResize(canvasRef, onCanvasResize);
	useOnUpdateControls(canvasRef);

	useEffect(() => {
		const video = videoRef.current;
		const canvas = canvasRef.current;
		if (!canvas || !video || !mediaStream.stream) {
			return;
		}

		video.srcObject = mediaStream.stream;
		if (!canvasRef.current.parentElement) {
			return;
		}

		const onVideoReady = () => {
			resizeCanvas();
			startStreamToCanvas(canvas, video, refControls.current);
		};

		video.addEventListener("loadedmetadata", onVideoReady);
		return () => video.removeEventListener("loadedmetadata", onVideoReady);
	}, [mediaStream, refControls, resizeCanvas]);

	useEffect(() => {
		if (!mediaStream.stream) {
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}
			stopStreamToCanvas();
		}
	}, [mediaStream]);

	return (
		<div className="relative flex w-full items-center justify-center">
			<canvas className="w-full" ref={canvasRef} />
			{!mediaStream.stream && (
				<span className=" absolute top-[50%] -translate-y-[50%] text-white">
					{mediaStream.status}
				</span>
			)}
			<VideoControls />
		</div>
	);
};
