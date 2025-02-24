import { Handle, NodeResizer, Position } from '@xyflow/react';
import { memo, useState } from 'react';

const ResizableNode = () => {
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');
    return (
        <>
            <NodeResizer minWidth={100} minHeight={30} />
            <Handle type="target" position={Position.Left} />
            <textarea
                value={name}
                placeholder="Name"
                style={{ width: '100%', height: '30px', border: 'none', background: 'transparent', resize: 'none', overflow: 'auto' }}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <textarea
                value={purpose}
                placeholder="Purpose and Description"
                style={{ width: '100%', height: '60px', border: 'none', background: 'transparent', resize: 'none', overflow: 'auto' }}
                onChange={(e) => {
                    setPurpose(e.target.value)
                }}
            />
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNode);