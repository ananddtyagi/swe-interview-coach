import { Handle, Node, NodeProps, NodeResizer, Position } from '@xyflow/react';
import { memo, useEffect, useState } from 'react';

export type ResizableNode = Node<
    { name: string, purpose: string, setNameInfo: (id: string, name: string) => void, setPurposeInfo: (id: string, purpose: string) => void },
    'resizable'
>;

const ResizableNode = (props: NodeProps<ResizableNode>) => {
    const [localName, setLocalName] = useState(props.data.name);
    const [localPurpose, setLocalPurpose] = useState(props.data.purpose);

    useEffect(() => {
        setLocalName(props.data.name);
        setLocalPurpose(props.data.purpose);
    }, [props.data.name, props.data.purpose]);

    const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newName = e.target.value;
        setLocalName(newName);
        props.data.setNameInfo(props.id, newName);
    };

    const handlePurposeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newPurpose = e.target.value;
        setLocalPurpose(newPurpose);
        props.data.setPurposeInfo(props.id, newPurpose);
    };

    return (
        <>
            <NodeResizer minWidth={100} minHeight={30} />
            <Handle type="target" position={Position.Left} />
            <textarea
                value={localName}
                placeholder="Name"
                style={{ width: '100%', height: '30px', border: 'none', background: 'transparent', resize: 'none', overflow: 'auto' }}
                onChange={handleNameChange}
            />
            <textarea
                value={localPurpose}
                placeholder="Purpose and Description"
                style={{ width: '100%', height: '60px', border: 'none', background: 'transparent', resize: 'none', overflow: 'auto' }}
                onChange={handlePurposeChange}
            />
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNode);