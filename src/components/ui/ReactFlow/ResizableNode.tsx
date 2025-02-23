import { Handle, NodeResizer, Position } from '@xyflow/react';
import { memo, useState } from 'react';

const ResizableNode = ({ data }: { data: { label: string } }) => {
    const [label, setLabel] = useState(data.label);
    return (
        <>
            <NodeResizer minWidth={100} minHeight={30} />
            <Handle type="target" position={Position.Left} />
            <input
                type="text"
                value={label}
                style={{ padding: 10, width: '100%', border: 'none', background: 'transparent' }}
                onChange={(e) => {
                    setLabel(e.target.value)
                }}
            />
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNode);