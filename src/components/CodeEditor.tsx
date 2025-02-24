// pages/code-editor.tsx
'use client'
import { useWorkspace } from '@/contexts/WorkspaceContext'
import { editor as monacoEditor } from 'monaco-editor'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import getCurrentCode from '../hooks/getCurrentCode'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'
// Disable SSR for the Monaco editor to avoid issues with window references
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
})

export default function CodeEditorPage() {
    const { editorRef, runOutput } = useWorkspace()
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
        let capturedOutput = ''

        console.log = (...args) => {
            const logString = args.join(' ') + '\n'
            capturedOutput += logString
            setOutput(prevOutput => prevOutput + logString)
            originalConsoleLog(...args)
        }

        try {
            const result = eval(code)
            if (result !== undefined) {
                const resultString = String(result) + '\n'
                capturedOutput += resultString
                setOutput(prevOutput => prevOutput + resultString)
            }
            // Set the complete output including both console.logs and result
            runOutput.current = capturedOutput
        } catch (err) {
            const errorMessage = err instanceof Error
                ? `Error: ${err.message}\n`
                : `Error: An unknown error occurred\n`
            setOutput(prevOutput => prevOutput + errorMessage)
            runOutput.current = capturedOutput + errorMessage
        } finally {
            // Restore the original console.log
            console.log = originalConsoleLog
        }
    }

    return (
        <div className="container h-screen p-4 bg-background">
            <ResizablePanelGroup direction="vertical" className="min-h-[calc(100vh-2rem)]">
                <ResizablePanel defaultSize={70}>
                    <MonacoEditor
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue="// Write your JavaScript code here"
                        onMount={handleEditorDidMount}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 16 },
                        }}
                        className="rounded-md overflow-hidden"
                    />
                </ResizablePanel>
                <ResizableHandle className="my-1" />
                <ResizablePanel defaultSize={30}>
                    <Card className="h-full">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Output</h3>
                                <Button
                                    onClick={runCode}
                                    size="sm"
                                    className="px-4"
                                >
                                    Run Code
                                </Button>
                            </div>
                            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-auto max-h-[calc(100%-4rem)]">
                                <pre className="whitespace-pre-wrap">{output || 'No output yet...'}</pre>
                            </div>
                        </CardContent>
                    </Card>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
