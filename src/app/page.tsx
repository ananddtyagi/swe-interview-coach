import AssistantPanel from '@/components/AssistantPanel';
import CodeEditor from "@/components/CodeEditor";
import { ProblemSelector } from "@/components/ProblemSelector";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ProblemProvider } from '@/contexts/ProblemContext';
import { WorkspaceProvider } from '@/contexts/WorkspaceContext';
export default function MyPage() {

  return (
    <WorkspaceProvider>
      <ResizablePanelGroup className="container flex h-screen" direction="horizontal">
        <ResizablePanel>
          <CodeEditor />
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
    </WorkspaceProvider>

  );
}