import { useCallback } from "react";

import { useProblem } from "@/contexts/ProblemContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";

import { useConversation } from '@11labs/react';

export default function useAgent() {
    const { currentProblem } = useProblem();
    const { editorRef } = useWorkspace();
    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: (message) => console.log('Message:', message),
        onError: (error) => console.error('Error:', error),
    });

    const clientTools = {
        getCurrentCode: async () => {
            const code = editorRef.current?.getValue()
            console.log('getCurrentCode', code)
            return code
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
                agentId: 'MAUCQe7LwkQtcnpS8vDn', // Replace with your agent ID
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
