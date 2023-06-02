import { MediaStreamProvider } from './components/MediaStreamContext/MediaStreamContext';
import { VideoButtons } from './components/VideoButtons';
import { VideoCanvas } from './components/VideoCanvas/VideoCanvas';

function App() {
	return (
		<MediaStreamProvider>
			<VideoCanvas />
			<VideoButtons />
		</MediaStreamProvider>
	);
}

export default App;
