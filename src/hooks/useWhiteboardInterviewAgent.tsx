
import { useProblem } from "@/contexts/ProblemContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import useInterviewAgent from "./useInterviewAgent";

export default function useWhiteboardInterviewAgent() {
    const { currentProblem } = useProblem();
    const { umlDiagramRef } = useWorkspace();

    const clientTools = {
        getCurrentDiagram: async () => {
            const diagram = umlDiagramRef.current
            console.log('getCurrentDiagram', diagram)
            return JSON.stringify(diagram)
        },
    }

    const dynamicVariables = {
        problemName: currentProblem?.name,
        problemStatement: currentProblem?.problem,
    }

    return useInterviewAgent({ agentId: 'jybxeMFazTb6aVnT7lKW', clientTools, dynamicVariables })
}
