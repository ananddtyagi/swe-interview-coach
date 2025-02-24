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
              <ResizablePanel>
                <UserWorkpanel />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <ResizablePanelGroup direction="vertical" className="h-full w-2/5">
                  <ResizablePanel>
                    <ProblemSelector />
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel>
                    <AssistantPanel />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </AgentProvider>
        </ProblemProvider>
      </WorkspaceProvider>
    </ModeProvider >
  );
}