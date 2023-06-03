import { FC } from "react";
import { Slider } from "../Slider";
import { useAtom } from "jotai";
import { controlsAtom } from "../../state/controlsAtom";
import "./styles.css";

export const VideoControls: FC = () => {
	const [controls, setControls] = useAtom(controlsAtom);

	return (
		<div
			className="video-controls absolute right-0 top-[50%] flex gap-4 rounded-l
        bg-blue-700 bg-opacity-30 p-4 text-white hover:bg-opacity-90"
		>
			<div className="controls-title">CONTROLS</div>
			<div className="flex flex-col gap-4">
				<Slider
					title="Saturation"
					defaultValue={controls.saturation}
					onChange={(value) => setControls({ ...controls, saturation: value[0] })}
				/>
				<Slider
					title="Warmth"
					defaultValue={controls.warmth}
					onChange={(value) => setControls({ ...controls, warmth: value[0] })}
				/>
			</div>
		</div>
	);
};
