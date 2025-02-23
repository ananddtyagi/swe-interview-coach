import { useCallback } from "react";

import { useProblem } from "@/contexts/ProblemContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";

import { useConversation } from '@11labs/react';

export default function useWhiteboardInterviewAgent() {
    const { currentProblem } = useProblem();
    const { umlDiagramRef } = useWorkspace();
    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: (message) => console.log('Message:', message),
        onError: (error) => console.error('Error:', error),
    });

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
    const startConversation = useCallback(async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });
            // Start the conversation with your agent
            await conversation.startSession({
                agentId: 'jybxeMFazTb6aVnT7lKW', // Replace with your agent ID
                clientTools,
                dynamicVariables
            });

        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();
    }, [conversation]);

    return { conversation, startConversation, stopConversation }
}
