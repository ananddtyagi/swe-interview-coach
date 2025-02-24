'use client';

import AssistantPanel from '@/components/AssistantPanel';
import ModeSelector from '@/components/ModeSelector';
import { ProblemSelector } from "@/components/ProblemSelector";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { UserWorkpanel } from '@/components/UserWorkpanel';
import { AgentProvider } from '@/contexts/AgentContext';
import { ModeProvider } from '@/contexts/ModeContext';
import { ProblemProvider } from '@/contexts/ProblemContext';
import { WorkspaceProvider } from '@/contexts/WorkspaceContext';
export default function MyPage() {
  return (
    <ModeProvider>
      <WorkspaceProvider>
        <AgentProvider>
          <ResizablePanelGroup className="container flex h-screen" direction="horizontal">
            <ModeSelector />
            <ResizablePanel>
              <UserWorkpanel />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <ResizablePanelGroup direction="vertical">
                <ProblemProvider>
                  <ResizablePanel>
                    <ProblemSelector />
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel>
                    <AssistantPanel />
                  </ResizablePanel>
                </ProblemProvider>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </AgentProvider>
      </WorkspaceProvider>
    </ModeProvider>
  );
}