'use client';

import useWhiteboardInterviewAgent from "@/hooks/useWhiteboardInterviewAgent";


export function AssistantPanel() {
    // const { conversation, startConversation, stopConversation } = useCodeInterviewAgent();
    const { conversation, startConversation, stopConversation } = useWhiteboardInterviewAgent();
    return (

        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
                <button
                    onClick={startConversation}
                    disabled={conversation.status === 'connected'}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Start Conversation
                </button>
                <button
                    onClick={stopConversation}
                    disabled={conversation.status !== 'connected'}
                    className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
                >
                    Stop Conversation
                </button>
            </div>

            <div className="flex flex-col items-center">
                <p>Status: {conversation.status}</p>
                <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
            </div>
        </div>

    );
}

export default AssistantPanel;