import { VideoButtons } from "./components/VideoButtons";
import { VideoCanvas } from "./components/VideoCanvas/VideoCanvas";
import { FC } from "react";

export const App: FC = () => {
	return (
		<>
			<VideoCanvas />
			<VideoButtons />
		</>
	);
};
