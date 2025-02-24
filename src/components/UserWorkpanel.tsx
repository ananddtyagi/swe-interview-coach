import { useMode } from "@/contexts/ModeContext";
import CodeEditor from "./CodeEditor";
import Whiteboard from "./Whiteboard";

export const UserWorkpanel = () => {
    const { mode } = useMode();
    return (
        <div>
            {mode === 'whiteboard' ? <Whiteboard /> : <CodeEditor />}
        </div>
    )
}   