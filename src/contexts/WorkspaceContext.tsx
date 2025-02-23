'use client';

import { editor as monacoEditor } from 'monaco-editor';
import { createContext, useContext, useRef } from 'react';

interface WorkspaceContextType {
    editorRef: React.RefObject<monacoEditor.IStandaloneCodeEditor>;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
    editorRef: { current: null }
});

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
    const editorRef = useRef<monacoEditor.IStandaloneCodeEditor | null>(null);

    return (
        <WorkspaceContext.Provider value={{ editorRef }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => useContext(WorkspaceContext);
