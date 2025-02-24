import useCodeInterviewAgent from "@/hooks/useCodeInterviewAgent";
import useWhiteboardInterviewAgent from "@/hooks/useWhiteboardInterviewAgent";
import { useConversation } from "@11labs/react";
import { createContext, useContext } from "react";
import { useMode } from "./ModeContext";

interface AgentContextType {
    conversation: ReturnType<typeof useConversation>;
    startConversation: () => void;
    stopConversation: () => void;
}

const AgentContext = createContext<AgentContextType>({
    conversation: {} as ReturnType<typeof useConversation>,
    startConversation: () => { },
    stopConversation: () => { },
});

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
    const { mode } = useMode();

    const codeAgent = useCodeInterviewAgent();
    const whiteboardAgent = useWhiteboardInterviewAgent();
    const agents = {
        codeEditor: codeAgent,
        whiteboard: whiteboardAgent,
    }
    const agent = agents[mode as keyof typeof agents];

    return (
        <AgentContext.Provider value={agent}>
            {children}
        </AgentContext.Provider>
    );
};

export const useAgent = () => useContext(AgentContext);
