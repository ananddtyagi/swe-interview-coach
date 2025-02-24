
import { useProblem } from "@/contexts/ProblemContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import useInterviewAgent from "./useInterviewAgent";

export default function useCodeInterviewAgent() {
    const { currentProblem } = useProblem();
    const { editorRef, runOutput } = useWorkspace();

    const clientTools = {
        getCurrentCode: async () => {
            const code = editorRef.current?.getValue()
            console.log('getCurrentCode', code)
            return code
        },
        getRunOutput: async () => {
            console.log('getRunOutput hello', runOutput.current)
            return runOutput.current
        },
    }

    const dynamicVariables = {
        problemName: currentProblem?.name,
        problemStatement: currentProblem?.problem,
    }

    return useInterviewAgent({ agentId: 'MAUCQe7LwkQtcnpS8vDn', clientTools, dynamicVariables })
}