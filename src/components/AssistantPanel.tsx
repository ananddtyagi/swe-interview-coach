'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgent } from '@/contexts/AgentContext';

export function AssistantPanel() {
    const { conversation, startConversation, stopConversation } = useAgent();
    return (
        <Card className="w-full max-w-md mx-auto mt-8">
            <CardHeader>
                <CardTitle>Assistant Panel</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                        <Button
                            onClick={startConversation}
                            disabled={conversation.status === 'connected'}
                            variant="primary"
                        >
                            Start Conversation
                        </Button>
                        <Button
                            onClick={stopConversation}
                            disabled={conversation.status !== 'connected'}
                            variant="secondary"
                        >
                            Stop Conversation
                        </Button>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-600">Status: {conversation.status}</p>
                        <p className="text-sm text-gray-600">Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default AssistantPanel;