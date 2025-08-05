import { MarkerType } from '@xyflow/react';

// Edge styles and configurations
export const edgeStyles = {
    default: {
        stroke: '#ff6b6b',
        strokeWidth: 2,
    },
    animated: {
        stroke: '#ff6b6b',
        strokeWidth: 2,
        animated: true,
    },
    dashed: {
        stroke: '#ff6b6b',
        strokeWidth: 2,
        strokeDasharray: '3,3',
    },
};

export const edgeTypes = {
    default: 'smoothstep',
    straight: 'straight',
    step: 'step',
    smoothstep: 'smoothstep',
};

export const defaultEdgeOptions = {
    style: edgeStyles.default,
    type: edgeTypes.smoothstep,
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ff6b6b',
    },
};

// Helper function to create edge
export const createEdge = (source, target, type = 'smoothstep', style = edgeStyles.default) => {
    return {
        id: `${source}-${target}`,
        source,
        target,
        type,
        style,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: style.stroke || '#ff6b6b',
        },
    };
};

// Helper function to validate edge connection
export const isValidConnection = (connection) => {
    // Prevent self-connections
    if (connection.source === connection.target) {
        return false;
    }

    // Add more validation logic as needed
    return true;
};