import { useMode } from '@/contexts/ModeContext';

const ModeSelector = () => {
    const { setMode } = useMode();

    const handleModeChange = (newMode: string) => {
        console.log(`Changing mode to: ${newMode}`);
        setMode(newMode);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-2.5 w-52 transition-all duration-300 ease-in-out ">
            <div className="flex flex-col space-y-2">
                <button className="bg-green-600 text-white border-none py-1 px-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-700" onClick={() => { handleModeChange('whiteboard'); }}>Whiteboard</button>
                <button className="bg-green-600 text-white border-none py-1 px-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-700" onClick={() => { handleModeChange('codeEditor'); }}>Code Editor</button>
            </div>

        </div>
    );
};

export default ModeSelector; 