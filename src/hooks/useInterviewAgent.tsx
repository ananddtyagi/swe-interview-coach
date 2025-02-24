import { useCallback } from "react";


import { useConversation } from '@11labs/react';

export default function useInterviewAgent({ agentId, clientTools, dynamicVariables }: { agentId: string, clientTools: any, dynamicVariables: any }) {
    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: (message: any) => console.log('Message:', message),
        onError: (error: any) => console.error('Error:', error),
    });

    const startConversation = useCallback(async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });
            // Start the conversation with your agent
            await conversation.startSession({
                agentId,
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
