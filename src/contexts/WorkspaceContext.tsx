'use client';

import { Edge, Node } from '@xyflow/react';
import { editor as monacoEditor } from 'monaco-editor';
import { createContext, useContext, useRef } from 'react';

interface WorkspaceContextType {
    editorRef: React.RefObject<monacoEditor.IStandaloneCodeEditor | null>;
    runOutput: React.RefObject<string>;
    umlDiagramRef: React.RefObject<{ nodes: Node[]; edges: Edge[] } | null>;
}

const WorkspaceContext = createContext<WorkspaceContextType>({

    editorRef: { current: null },
    runOutput: { current: '' },
    umlDiagramRef: { current: null }
});

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
    const editorRef = useRef<monacoEditor.IStandaloneCodeEditor | null>(null);
    const runOutput = useRef('');
    const umlDiagramRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);

    return (
        <WorkspaceContext.Provider value={{ editorRef, runOutput, umlDiagramRef }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => useContext(WorkspaceContext);
