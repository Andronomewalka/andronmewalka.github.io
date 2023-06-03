import { MediaStreamProvider } from './components/MediaStreamContext/MediaStreamContext';
import { VideoButtons } from './components/VideoButtons';
import { VideoCanvas } from './components/VideoCanvas/VideoCanvas';
import { FC } from 'react';
import { VideoControls } from './components/VideoControls/VideoControls';


export const App: FC = () => {
	return (
		<MediaStreamProvider>
			<VideoCanvas />
			<VideoButtons />
			<VideoControls />
		</MediaStreamProvider>
	);
};
