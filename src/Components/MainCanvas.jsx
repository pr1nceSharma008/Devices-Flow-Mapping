import React, { useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ConnectionLineType,
    Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const connectionLineStyle = {
    strokeWidth: 3,
    stroke: '#000000',
};

const defaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: '#000000' },
    type: 'smoothstep',
    markerEnd: {
        type: 'arrowclosed',
        color: '#000000',
    },
};

const MainCanvas = ({
    nodes,
    edges,
    setNodes,
    setEdges,
    onDragOver,
    onDrop,
    nodeTypes
}) => {
    const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState(nodes);
    const [reactFlowEdges, setReactFlowEdges, onEdgesChange] = useEdgesState(edges);

    // Only sync FROM parent TO ReactFlow state (one direction)
    React.useEffect(() => {
        setReactFlowNodes(nodes);
    }, [nodes, setReactFlowNodes]);

    React.useEffect(() => {
        setReactFlowEdges(edges);
    }, [edges, setReactFlowEdges]);

    // Handle ReactFlow changes and update parent state
    const handleNodesChange = useCallback((changes) => {
        onNodesChange(changes);
        // Update parent state after ReactFlow processes the changes
        setReactFlowNodes((currentNodes) => {
            setNodes(currentNodes);
            return currentNodes;
        });
    }, [onNodesChange, setNodes]);

    const handleEdgesChange = useCallback((changes) => {
        onEdgesChange(changes);
        // Update parent state after ReactFlow processes the changes
        setReactFlowEdges((currentEdges) => {
            setEdges(currentEdges);
            return currentEdges;
        });
    }, [onEdgesChange, setEdges]);

    const onConnect = useCallback(
        (params) => {
            console.log('Connection params:', params);
            const newEdges = addEdge(params, reactFlowEdges);
            setReactFlowEdges(newEdges);
            setEdges(newEdges);
        },
        [reactFlowEdges, setReactFlowEdges, setEdges]
    );

    const onNodeDelete = useCallback((nodesToDelete) => {
        console.log('Deleting nodes:', nodesToDelete);
    }, []);

    const onEdgeDelete = useCallback((edgesToDelete) => {
        console.log('Deleting edges:', edgesToDelete);
    }, []);

    return (
        <div className="w-full h-full text-gray-800">
            <ReactFlow
                nodes={reactFlowNodes}
                edges={reactFlowEdges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                connectionLineStyle={connectionLineStyle}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                attributionPosition="top-right"
                onNodesDelete={onNodeDelete}
                onEdgesDelete={onEdgeDelete}
                proOptions={{ hideAttribution: true }}
            >
                <Controls />
                <Background color="#000000" gap={16} />
            </ReactFlow>
        </div>
    );
};

export default MainCanvas;