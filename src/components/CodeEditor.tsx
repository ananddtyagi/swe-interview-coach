// pages/code-editor.tsx
'use client'
import { useWorkspace } from '@/contexts/WorkspaceContext'
import { editor as monacoEditor } from 'monaco-editor'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import getCurrentCode from '../hooks/getCurrentCode'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'
// Disable SSR for the Monaco editor to avoid issues with window references
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
})

export default function CodeEditorPage() {
    const { editorRef } = useWorkspace()
    const [output, setOutput] = useState<string>('')

    const handleEditorDidMount = (editor: monacoEditor.IStandaloneCodeEditor) => {
        editorRef.current = editor
    }

    const runCode = () => {
        if (!editorRef.current) return

        // Use the getCurrentCode hook to get the current code
        const code = getCurrentCode(editorRef)

        // Clear the output before running the code
        setOutput('')

        // Override console.log to capture its output
        const originalConsoleLog = console.log
        console.log = (...args) => {
            setOutput(prevOutput => prevOutput + args.join(' ') + '\n')
            originalConsoleLog(...args)
        }

        try {
            const result = eval(code)
            setOutput(prevOutput => prevOutput + String(result) + '\n')
        } catch (err) {
            if (err instanceof Error) {
                setOutput(prevOutput => prevOutput + `Error: ${err.message}\n`)
            } else {
                setOutput(prevOutput => prevOutput + `Error: An unknown error occurred\n`)
            }
        } finally {
            // Restore the original console.log
            console.log = originalConsoleLog
        }
    }

    return (
        <ResizablePanelGroup className="container flex h-screen" direction="vertical">

            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <ResizablePanel style={{ flex: 1 }}>
                    <MonacoEditor
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue="// Write your JavaScript code here"
                        onMount={handleEditorDidMount}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                        }}
                    />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <button
                        style={{ padding: '1rem', fontSize: '1rem', cursor: 'pointer' }}
                        onClick={runCode}
                    >
                        Run Code
                    </button>
                    <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', minHeight: '100px' }}>
                        <strong>Output:</strong>
                        <pre>{output}</pre>
                    </div>
                </ResizablePanel>
            </div>
        </ResizablePanelGroup>
    )
}
