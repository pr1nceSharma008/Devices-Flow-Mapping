import { useState, useCallback, useEffect } from 'react';
import {
    saveFlowToStorage,
    loadFlowFromStorage,
    clearStorageData,
    exportFlowAsJSON,
    importFlowFromJSON
} from './StorageUtils';

// Custom hook for managing dashboard state
export const useDashboard = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [nodeIdCounter, setNodeIdCounter] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Auto-save functionality
    const [autoSave, setAutoSave] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    // Save dashboard to localStorage
    const saveDashboard = useCallback(() => {
        const result = saveFlowToStorage(nodes, edges);
        setMessage(result.message);

        if (result.success) {
            setLastSaved(new Date());
        }

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);

        return result;
    }, [nodes, edges]);

    // Load dashboard from localStorage
    const loadDashboard = useCallback(() => {
        setIsLoading(true);

        const result = loadFlowFromStorage();
        setMessage(result.message);

        if (result.success && result.data) {
            setNodes(result.data.nodes || []);
            setEdges(result.data.edges || []);
            setNodeIdCounter((result.data.nodes?.length || 0) + 1);
            setLastSaved(new Date(result.data.timestamp));
        }

        setIsLoading(false);

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);

        return result;
    }, []);

    // Clear dashboard
    const clearDashboard = useCallback(() => {
        setNodes([]);
        setEdges([]);
        setNodeIdCounter(1);
        setLastSaved(null);

        const result = clearStorageData();
        setMessage(result.message);

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);

        return result;
    }, []);

    // Export dashboard as JSON file
    const exportDashboard = useCallback(() => {
        const result = exportFlowAsJSON(nodes, edges);
        setMessage(result.message);

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);

        return result;
    }, [nodes, edges]);

    // Import dashboard from JSON
    const importDashboard = useCallback((jsonData) => {
        const result = importFlowFromJSON(jsonData);
        setMessage(result.message);

        if (result.success && result.data) {
            setNodes(result.data.nodes || []);
            setEdges(result.data.edges || []);
            setNodeIdCounter((result.data.nodes?.length || 0) + 1);
        }

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);

        return result;
    }, []);

    // Auto-save when enabled
    useEffect(() => {
        if (autoSave && nodes.length > 0) {
            const timeoutId = setTimeout(() => {
                saveDashboard();
            }, 2000); // Auto-save after 2 seconds of inactivity

            return () => clearTimeout(timeoutId);
        }
    }, [nodes, edges, autoSave, saveDashboard]);

    // Load dashboard on mount
    useEffect(() => {
        loadDashboard();
    }, []);

    return {
        // State
        nodes,
        edges,
        nodeIdCounter,
        isLoading,
        message,
        autoSave,
        lastSaved,

        // Actions
        setNodes,
        setEdges,
        setNodeIdCounter,
        setAutoSave,
        saveDashboard,
        loadDashboard,
        clearDashboard,
        exportDashboard,
        importDashboard,
    };
};

// Custom hook for drag and drop functionality
export const useDragAndDrop = (setNodes, nodeIdCounter, setNodeIdCounter) => {
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event, reactFlowBounds) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');

        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };

        const newNode = {
            id: `${type}-${nodeIdCounter}`,
            type: 'customNode',
            position,
            data: {
                label: type,
                icon: type
            },
        };

        setNodes((nds) => nds.concat(newNode));
        setNodeIdCounter((counter) => counter + 1);
    }, [nodeIdCounter, setNodes, setNodeIdCounter]);

    return {
        onDragOver,
        onDrop,
    };
};