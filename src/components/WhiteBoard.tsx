'use client'
import { useWorkspace } from '@/contexts/WorkspaceContext';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Connection,
    Edge,
    EdgeChange,
    MiniMap,
    Node,
    NodeChange,
    ReactFlow,
    ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import ResizableNode from './ui/ReactFlow/ResizableNode';

const nodeTypes = {
    ResizableNode: ResizableNode
};

let id = 0;
const getId = () => `node_${id++}`;

function Whiteboard() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const { umlDiagramRef } = useWorkspace();

    const onDiagramUpdate = useCallback(() => {
        const diagram = {
            nodes: nodes as Node[],
            edges: edges as Edge[]
        };
        umlDiagramRef.current = diagram;
        console.log(diagram);
    }, [nodes, edges, umlDiagramRef]);

    useEffect(() => {
        onDiagramUpdate();
    }, [nodes, edges, onDiagramUpdate]);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
    }, []);

    const setNameInfo = useCallback((id: string, name: string) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, name } } : node
            )
        );
    }, []);

    const setPurposeInfo = useCallback((id: string, purpose: string) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, purpose } } : node
            )
        );
    }, []);

    const addNode = () => {
        const canvasCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const jitter = () => Math.random() * 100 - 50;
        const position = { x: canvasCenter.x - 400 + jitter(), y: canvasCenter.y - 100 + jitter() };
        const newNode = {
            id: getId(),
            type: 'ResizableNode',
            data: {
                label: `Node`,
                name: '',
                purpose: '',
                setNameInfo,
                setPurposeInfo
            },
            position,
        };
        setNodes((nds) => nds.concat(newNode));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <aside
                style={{
                    width: '100%',
                    height: '150px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000
                }}
            >
                <h3>UML Elements (click to add)</h3>
                <div
                    style={{
                        padding: '8px',
                        marginBottom: '5px',
                        border: '1px solid #333',
                        background: '#f7f7f7',
                        cursor: 'pointer',
                        width: '100px',
                        height: '40px',

                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => addNode()}
                >
                    Class
                </div>
            </aside>
            <div style={{ flexGrow: 1, position: 'relative' }}>
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={(changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds))}
                        onEdgesChange={(changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds))}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                    >
                        <MiniMap />
                        <Background />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </div>
    );
}

export default Whiteboard;