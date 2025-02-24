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
        <ProblemProvider>
          <AgentProvider>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={10}>
                <ModeSelector />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <ResizablePanelGroup direction="vertical" >
                  <ResizablePanel defaultSize={70}>
                    <ProblemSelector />
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={30}>
                    <AssistantPanel />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle />

              <ResizablePanel>
                <UserWorkpanel />
              </ResizablePanel>

            </ResizablePanelGroup>
          </AgentProvider>
        </ProblemProvider>
      </WorkspaceProvider>
    </ModeProvider >
  );
}