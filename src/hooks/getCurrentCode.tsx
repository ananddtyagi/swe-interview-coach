import { editor as monacoEditor } from 'monaco-editor';

export default function getCurrentCode(editorRef: React.MutableRefObject<monacoEditor.IStandaloneCodeEditor | null>): string {
    if (editorRef.current) {
        return editorRef.current.getValue();
    }
    return '';
}