'use client'
import { useWorkspace } from '@/contexts/WorkspaceContext';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Connection,
    Edge,
    MiniMap,
    Node,
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
    }, [nodes, edges, umlDiagramRef]);

    // Use useEffect to update the diagram whenever nodes or edges change
    useEffect(() => {
        onDiagramUpdate();
    }, [nodes, edges, onDiagramUpdate]);

    // Handle connecting two nodes
    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
    }, []);

    // Function to add a node to the canvas at a default position
    const addNode = () => {
        const position = { x: 100, y: 100 }; // Default position
        const newNode = {
            id: getId(),
            type: 'ResizableNode',
            data: { label: `Node` },
            position,
            style: {
            }
        };
        setNodes((nds) => nds.concat(newNode));
    };


    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar for UML elements */}
            <aside
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    width: 200,
                    border: '1px solid #ddd',
                    padding: '10px',
                    boxSizing: 'border-box',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000
                }}
            >
                <h3>UML Elements</h3>
                <div
                    style={{
                        padding: '8px',
                        marginBottom: '5px',
                        border: '1px solid #333',
                        borderRadius: '4px',
                        background: '#f7f7f7',
                        cursor: 'pointer'
                    }}
                    onClick={() => addNode()}
                >
                    Class
                </div>
                {/* Additional UML elements (e.g., Interface, Enum) can be added similarly */}
            </aside>

            {/* Canvas area for ReactFlow */}
            <div style={{ flexGrow: 1, position: 'relative' }}>
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
                        onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                    // fitView
                    >
                        <MiniMap />
                        {/* <Controls /> */}
                        <Background />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </div>
    );
}

export default Whiteboard;
