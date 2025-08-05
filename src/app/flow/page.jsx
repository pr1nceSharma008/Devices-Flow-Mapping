// "use client";
// import React, { useState, useCallback, useRef } from 'react';
// import { ReactFlowProvider } from '@xyflow/react';
// import Sidebar from '../../Components/Sidebar';
// import MainCanvas from '../../Components/MainCanvas';
// import { nodeTypes, iconMappings } from '../../Components/NodeTypes';

// const DashboardMaker = () => {
//     const [nodes, setNodes] = useState([]);
//     const [edges, setEdges] = useState([]);
//     const [nodeIdCounter, setNodeIdCounter] = useState(1);
//     const reactFlowWrapper = useRef(null);

//     const onDragOver = useCallback((event) => {
//         event.preventDefault();
//         event.dataTransfer.dropEffect = 'move';
//     }, []);

//     const onDrop = useCallback((event) => {
//         event.preventDefault();

//         const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//         const type = event.dataTransfer.getData('application/reactflow');

//         if (typeof type === 'undefined' || !type) {
//             return;
//         }

//         const position = {
//             x: event.clientX - reactFlowBounds.left,
//             y: event.clientY - reactFlowBounds.top,
//         };

//         const newNode = {
//             id: `${type}-${nodeIdCounter}`,
//             type: 'customNode',
//             position,
//             data: {
//                 label: type,
//                 icon: iconMappings[type]
//             },
//         };

//         setNodes((nds) => nds.concat(newNode));
//         setNodeIdCounter((counter) => counter + 1);
//     }, [nodeIdCounter]);

//     // Download dashboard as JSON file
//     const downloadDashboard = useCallback(() => {
//         const flowData = {
//             nodes,
//             edges,
//             timestamp: new Date().toISOString(),
//             version: '1.0'
//         };

//         const dataStr = JSON.stringify(flowData, null, 2);
//         const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

//         const exportFileDefaultName = `dashboard-${new Date().toISOString().split('T')[0]}.json`;

//         const linkElement = document.createElement('a');
//         linkElement.setAttribute('href', dataUri);
//         linkElement.setAttribute('download', exportFileDefaultName);
//         linkElement.click();
//     }, [nodes, edges]);

//     // Upload and load dashboard from JSON file
//     const uploadDashboard = useCallback((event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             try {
//                 const flowData = JSON.parse(e.target.result);

//                 // Validate JSON structure
//                 if (flowData.nodes && Array.isArray(flowData.nodes)) {
//                     setNodes(flowData.nodes);
//                     setEdges(flowData.edges || []);
//                     setNodeIdCounter(flowData.nodes.length + 1);
//                     alert('Dashboard loaded successfully!');
//                 } else {
//                     alert('Invalid dashboard file format!');
//                 }
//             } catch (error) {
//                 alert('Error reading dashboard file!');
//                 console.error(error);
//             }
//         };
//         reader.readAsText(file);

//         // Reset file input
//         event.target.value = '';
//     }, []);

//     const clearFlow = useCallback(() => {
//         if (nodes.length > 0 || edges.length > 0) {
//             if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
//                 setNodes([]);
//                 setEdges([]);
//                 setNodeIdCounter(1);
//             }
//         }
//     }, [nodes, edges]);

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <ReactFlowProvider>
//                 <Sidebar
//                     onDownload={downloadDashboard}
//                     onUpload={uploadDashboard}
//                     onClear={clearFlow}
//                 />
//                 <div className="flex-1" ref={reactFlowWrapper}>
//                     <MainCanvas
//                         nodes={nodes}
//                         edges={edges}
//                         setNodes={setNodes}
//                         setEdges={setEdges}
//                         onDragOver={onDragOver}
//                         onDrop={onDrop}
//                         nodeTypes={nodeTypes}
//                     />
//                 </div>
//             </ReactFlowProvider>
//         </div>
//     );
// };

// export default DashboardMaker;



// "use client";
// import React, { useState, useCallback, useRef } from 'react';
// import { ReactFlowProvider } from '@xyflow/react';
// import Sidebar from '../../Components/Sidebar';
// import MainCanvas from '../../Components/MainCanvas';
// import { nodeTypes, iconMappings } from '../../Components/NodeTypes';

// const DashboardMaker = () => {
//     const [nodes, setNodes] = useState([]);
//     const [edges, setEdges] = useState([]);
//     const [nodeIdCounter, setNodeIdCounter] = useState(1);
//     const reactFlowWrapper = useRef(null);

//     const onDragOver = useCallback((event) => {
//         event.preventDefault();
//         event.dataTransfer.dropEffect = 'move';
//     }, []);

//     // Generate tank data based on node counter
//     const generateTankData = useCallback((nodeId) => {
//         const tankNumber = nodeId.split('-')[1];
//         const tankNames = ['Main Tank', 'Storage Tank', 'Reserve Tank',];
//         const capacities = ['500L', '1000L', '750L', '300L', '1200L'];
//         const refillCounts = [0, 1, 2, 3, 4, 5];
//         const fullStates = [0, 1]; // 0 = empty, 1 = full

//         return {
//             name: tankNames[Math.floor(Math.random() * tankNames.length)] + ` ${tankNumber}`,
//             capacity: capacities[Math.floor(Math.random() * capacities.length)],
//             todayRefill: refillCounts[Math.floor(Math.random() * refillCounts.length)],
//             isFull: 1
//         };
//     }, []);

//     const onDrop = useCallback((event) => {
//         event.preventDefault();

//         const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//         const type = event.dataTransfer.getData('application/reactflow');

//         if (typeof type === 'undefined' || !type) {
//             return;
//         }

//         const position = {
//             x: event.clientX - reactFlowBounds.left,
//             y: event.clientY - reactFlowBounds.top,
//         };

//         const nodeId = `${type}-${nodeIdCounter}`;

//         // Create base node data
//         let nodeData = {
//             label: type,
//             icon: iconMappings[type]
//         };

//         // Add tank-specific data if it's a tank node
//         if (type === 'Tank') {
//             nodeData = {
//                 ...nodeData,
//                 type: 'Tank',
//                 ...generateTankData(nodeId)
//             };
//         }

//         const newNode = {
//             id: nodeId,
//             type: 'customNode',
//             position,
//             data: nodeData,
//         };

//         setNodes((nds) => nds.concat(newNode));
//         setNodeIdCounter((counter) => counter + 1);
//     }, [nodeIdCounter, generateTankData]);

//     // Download dashboard as JSON file
//     const downloadDashboard = useCallback(() => {
//         const flowData = {
//             nodes,
//             edges,
//             timestamp: new Date().toISOString(),
//             version: '1.0'
//         };

//         const dataStr = JSON.stringify(flowData, null, 2);
//         const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

//         const exportFileDefaultName = `dashboard-${new Date().toISOString().split('T')[0]}.json`;

//         const linkElement = document.createElement('a');
//         linkElement.setAttribute('href', dataUri);
//         linkElement.setAttribute('download', exportFileDefaultName);
//         linkElement.click();
//     }, [nodes, edges]);

//     // Upload and load dashboard from JSON file
//     const uploadDashboard = useCallback((event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             try {
//                 const flowData = JSON.parse(e.target.result);

//                 // Validate JSON structure
//                 if (flowData.nodes && Array.isArray(flowData.nodes)) {
//                     setNodes(flowData.nodes);
//                     setEdges(flowData.edges || []);

//                     // Set node counter based on highest existing node ID
//                     const maxId = Math.max(
//                         ...flowData.nodes.map(node => {
//                             const idParts = node.id.split('-');
//                             return parseInt(idParts[idParts.length - 1]) || 0;
//                         }),
//                         0
//                     );
//                     setNodeIdCounter(maxId + 1);

//                     alert('Dashboard loaded successfully!');
//                 } else {
//                     alert('Invalid dashboard file format!');
//                 }
//             } catch (error) {
//                 alert('Error reading dashboard file!');
//                 console.error(error);
//             }
//         };
//         reader.readAsText(file);

//         // Reset file input
//         event.target.value = '';
//     }, []);

//     const clearFlow = useCallback(() => {
//         if (nodes.length > 0 || edges.length > 0) {
//             if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
//                 setNodes([]);
//                 setEdges([]);
//                 setNodeIdCounter(1);
//             }
//         }
//     }, [nodes, edges]);

//     // Function to update tank data (can be called from external components)
//     const updateTankData = useCallback((nodeId, newData) => {
//         setNodes((nds) =>
//             nds.map((node) => {
//                 if (node.id === nodeId && node.data.type === 'Tank') {
//                     return {
//                         ...node,
//                         data: {
//                             ...node.data,
//                             ...newData
//                         }
//                     };
//                 }
//                 return node;
//             })
//         );
//     }, []);

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <ReactFlowProvider>
//                 <Sidebar
//                     onDownload={downloadDashboard}
//                     onUpload={uploadDashboard}
//                     onClear={clearFlow}
//                 />
//                 <div className="flex-1" ref={reactFlowWrapper}>
//                     <MainCanvas
//                         nodes={nodes}
//                         edges={edges}
//                         setNodes={setNodes}
//                         setEdges={setEdges}
//                         onDragOver={onDragOver}
//                         onDrop={onDrop}
//                         nodeTypes={nodeTypes}
//                         updateTankData={updateTankData}
//                     />
//                 </div>
//             </ReactFlowProvider>
//         </div>
//     );
// };

// export default DashboardMaker;



// "use client";
// import React, { useState, useCallback, useRef } from 'react';
// import { ReactFlowProvider } from '@xyflow/react';
// import Sidebar from '../../Components/Sidebar';
// import MainCanvas from '../../Components/MainCanvas';
// import { nodeTypes, iconMappings } from '../../Components/NodeTypes';

// const DashboardMaker = () => {
//     const [nodes, setNodes] = useState([]);
//     const [edges, setEdges] = useState([]);
//     const [nodeIdCounter, setNodeIdCounter] = useState(1);
//     const reactFlowWrapper = useRef(null);

//     const onDragOver = useCallback((event) => {
//         event.preventDefault();
//         event.dataTransfer.dropEffect = 'move';
//     }, []);

//     // Generate tank data based on node counter (works for both regular and underground tanks)
//     const generateTankData = useCallback((nodeId, tankType) => {
//         const tankNumber = nodeId.split('-')[1];
//         const tankNames = tankType === 'Underground Tank'
//             ? ['Underground Main', 'Underground Storage', 'Underground Reserve']
//             : ['Main Tank', 'Storage Tank', 'Reserve Tank'];
//         const capacities = ['500L', '1000L', '750L', '300L', '1200L'];
//         const refillCounts = [0, 1, 2, 3, 4, 5];
//         const fullStates = [0, 1]; // 0 = empty, 1 = full

//         return {
//             name: tankNames[Math.floor(Math.random() * tankNames.length)] + ` ${tankNumber}`,
//             capacity: capacities[Math.floor(Math.random() * capacities.length)],
//             todayRefill: refillCounts[Math.floor(Math.random() * refillCounts.length)],
//             isFull: fullStates[Math.floor(Math.random() * fullStates.length)]
//         };
//     }, []);

//     const onDrop = useCallback((event) => {
//         event.preventDefault();

//         const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//         const type = event.dataTransfer.getData('application/reactflow');

//         if (typeof type === 'undefined' || !type) {
//             return;
//         }

//         const position = {
//             x: event.clientX - reactFlowBounds.left,
//             y: event.clientY - reactFlowBounds.top,
//         };

//         const nodeId = `${type}-${nodeIdCounter}`;

//         // Create base node data
//         let nodeData = {
//             label: type,
//             icon: iconMappings[type]
//         };

//         // Add tank-specific data if it's a tank node (regular or underground)
//         if (type === 'Tank' || type === 'Underground Tank') {
//             nodeData = {
//                 ...nodeData,
//                 type: type,
//                 ...generateTankData(nodeId, type)
//             };
//         }

//         const newNode = {
//             id: nodeId,
//             type: 'customNode',
//             position,
//             data: nodeData,
//         };

//         setNodes((nds) => nds.concat(newNode));
//         setNodeIdCounter((counter) => counter + 1);
//     }, [nodeIdCounter, generateTankData]);

//     // Download dashboard as JSON file
//     const downloadDashboard = useCallback(() => {
//         const flowData = {
//             nodes,
//             edges,
//             timestamp: new Date().toISOString(),
//             version: '1.0'
//         };

//         const dataStr = JSON.stringify(flowData, null, 2);
//         const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

//         const exportFileDefaultName = `dashboard-${new Date().toISOString().split('T')[0]}.json`;

//         const linkElement = document.createElement('a');
//         linkElement.setAttribute('href', dataUri);
//         linkElement.setAttribute('download', exportFileDefaultName);
//         linkElement.click();
//     }, [nodes, edges]);

//     // Upload and load dashboard from JSON file
//     const uploadDashboard = useCallback((event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             try {
//                 const flowData = JSON.parse(e.target.result);

//                 // Validate JSON structure
//                 if (flowData.nodes && Array.isArray(flowData.nodes)) {
//                     setNodes(flowData.nodes);
//                     setEdges(flowData.edges || []);

//                     // Set node counter based on highest existing node ID
//                     const maxId = Math.max(
//                         ...flowData.nodes.map(node => {
//                             const idParts = node.id.split('-');
//                             return parseInt(idParts[idParts.length - 1]) || 0;
//                         }),
//                         0
//                     );
//                     setNodeIdCounter(maxId + 1);

//                     alert('Dashboard loaded successfully!');
//                 } else {
//                     alert('Invalid dashboard file format!');
//                 }
//             } catch (error) {
//                 alert('Error reading dashboard file!');
//                 console.error(error);
//             }
//         };
//         reader.readAsText(file);

//         // Reset file input
//         event.target.value = '';
//     }, []);

//     const clearFlow = useCallback(() => {
//         if (nodes.length > 0 || edges.length > 0) {
//             if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
//                 setNodes([]);
//                 setEdges([]);
//                 setNodeIdCounter(1);
//             }
//         }
//     }, [nodes, edges]);

//     // Function to update tank data (can be called from external components)
//     const updateTankData = useCallback((nodeId, newData) => {
//         setNodes((nds) =>
//             nds.map((node) => {
//                 if (node.id === nodeId && (node.data.type === 'Tank' || node.data.type === 'Underground Tank')) {
//                     return {
//                         ...node,
//                         data: {
//                             ...node.data,
//                             ...newData
//                         }
//                     };
//                 }
//                 return node;
//             })
//         );
//     }, []);

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <ReactFlowProvider>
//                 <Sidebar
//                     onDownload={downloadDashboard}
//                     onUpload={uploadDashboard}
//                     onClear={clearFlow}
//                 />
//                 <div className="flex-1" ref={reactFlowWrapper}>
//                     <MainCanvas
//                         nodes={nodes}
//                         edges={edges}
//                         setNodes={setNodes}
//                         setEdges={setEdges}
//                         onDragOver={onDragOver}
//                         onDrop={onDrop}
//                         nodeTypes={nodeTypes}
//                         updateTankData={updateTankData}
//                     />
//                 </div>
//             </ReactFlowProvider>
//         </div>
//     );
// };

// export default DashboardMaker;



"use client";
import React, { useState, useCallback, useRef } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import Sidebar from '../../Components/Sidebar';
import MainCanvas from '../../Components/MainCanvas';
import { nodeTypes, iconMappings } from '../../Components/NodeTypes';

const DashboardMaker = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [nodeIdCounter, setNodeIdCounter] = useState(1);
    const reactFlowWrapper = useRef(null);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Generate tank data based on node counter (works for both regular and underground tanks)
    const generateTankData = useCallback((nodeId, tankType) => {
        const tankNumber = nodeId.split('-')[1];
        const tankNames = tankType === 'Underground Tank'
            ? ['Underground Main', 'Underground Storage', 'Underground Reserve']
            : ['Main Tank', 'Storage Tank', 'Reserve Tank'];
        const capacities = ['500L', '1000L', '750L', '300L', '1200L'];
        const refillCounts = [0, 1, 2, 3, 4, 5];
        const fullStates = [0, 1]; // 0 = empty, 1 = full

        return {
            name: tankNames[Math.floor(Math.random() * tankNames.length)] + ` ${tankNumber}`,
            capacity: capacities[Math.floor(Math.random() * capacities.length)],
            todayRefill: refillCounts[Math.floor(Math.random() * refillCounts.length)],
            isFull: fullStates[Math.floor(Math.random() * fullStates.length)]
        };
    }, []);

    // Generate sensor aggregator data
    const generateSensorAggregatorData = useCallback((nodeId) => {
        const sensorCount = Math.floor(Math.random() * 3) + 3; // 3-5 sensors
        const sensorLabels = ['T', 'H', 'P', 'L', 'F', 'pH', 'DO', 'CO2']; // Temperature, Humidity, Pressure, Level, Flow, pH, Dissolved Oxygen, CO2
        const sensors = [];

        for (let i = 0; i < sensorCount; i++) {
            sensors.push({
                id: `sensor-${i}`,
                label: sensorLabels[i] || 'd',
                connected: false
            });
        }

        return {
            nodeId: nodeId,
            sensors: sensors,
            onSensorConnect: (sensorId, isConnected) => {
                updateSensorConnection(nodeId, sensorId, isConnected);
            }
        };
    }, []);

    // Update sensor connection status
    const updateSensorConnection = useCallback((nodeId, sensorId, isConnected) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId && node.data.type === 'Sensor Aggregator') {
                    const updatedSensors = node.data.sensors.map((sensor) =>
                        sensor.id === sensorId ? { ...sensor, connected: isConnected } : sensor
                    );
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            sensors: updatedSensors
                        }
                    };
                }
                return node;
            })
        );
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };

        const nodeId = `${type.replace(/\s+/g, '-')}-${nodeIdCounter}`;

        // Create base node data
        let nodeData = {
            label: type,
            icon: iconMappings[type]
        };

        // Add tank-specific data if it's a tank node (regular or underground)
        if (type === 'Tank' || type === 'Underground Tank') {
            nodeData = {
                ...nodeData,
                type: type,
                ...generateTankData(nodeId, type)
            };
        }

        // Add sensor aggregator specific data
        if (type === 'Sensor Aggregator') {
            nodeData = {
                ...nodeData,
                type: type,
                ...generateSensorAggregatorData(nodeId)
            };
        }

        const newNode = {
            id: nodeId,
            type: 'customNode',
            position,
            data: nodeData,
        };

        setNodes((nds) => nds.concat(newNode));
        setNodeIdCounter((counter) => counter + 1);
    }, [nodeIdCounter, generateTankData, generateSensorAggregatorData]);

    // Download dashboard as JSON file
    const downloadDashboard = useCallback(() => {
        const flowData = {
            nodes,
            edges,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };

        const dataStr = JSON.stringify(flowData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `dashboard-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }, [nodes, edges]);

    // Upload and load dashboard from JSON file
    const uploadDashboard = useCallback((event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const flowData = JSON.parse(e.target.result);

                // Validate JSON structure
                if (flowData.nodes && Array.isArray(flowData.nodes)) {
                    // Re-attach sensor connection callbacks for sensor aggregator nodes
                    const processedNodes = flowData.nodes.map(node => {
                        if (node.data.type === 'Sensor Aggregator') {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    onSensorConnect: (sensorId, isConnected) => {
                                        updateSensorConnection(node.id, sensorId, isConnected);
                                    }
                                }
                            };
                        }
                        return node;
                    });

                    setNodes(processedNodes);
                    setEdges(flowData.edges || []);

                    // Set node counter based on highest existing node ID
                    const maxId = Math.max(
                        ...flowData.nodes.map(node => {
                            const idParts = node.id.split('-');
                            return parseInt(idParts[idParts.length - 1]) || 0;
                        }),
                        0
                    );
                    setNodeIdCounter(maxId + 1);

                    alert('Dashboard loaded successfully!');
                } else {
                    alert('Invalid dashboard file format!');
                }
            } catch (error) {
                alert('Error reading dashboard file!');
                console.error(error);
            }
        };
        reader.readAsText(file);

        // Reset file input
        event.target.value = '';
    }, [updateSensorConnection]);

    const clearFlow = useCallback(() => {
        if (nodes.length > 0 || edges.length > 0) {
            if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
                setNodes([]);
                setEdges([]);
                setNodeIdCounter(1);
            }
        }
    }, [nodes, edges]);

    // Function to update tank data (can be called from external components)
    const updateTankData = useCallback((nodeId, newData) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId && (node.data.type === 'Tank' || node.data.type === 'Underground Tank')) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...newData
                        }
                    };
                }
                return node;
            })
        );
    }, []);

    // Function to add/remove sensors to a sensor aggregator
    const updateSensorAggregator = useCallback((nodeId, newSensors) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId && node.data.type === 'Sensor Aggregator') {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            sensors: newSensors
                        }
                    };
                }
                return node;
            })
        );
    }, []);

    // Handle edge connections/disconnections to update sensor states
    const onEdgesChange = useCallback((changes) => {
        // Process each change to update sensor connection status
        changes.forEach(change => {
            if (change.type === 'add' && change.item?.targetHandle?.includes('sensor-')) {
                // Extract node ID and sensor ID from targetHandle
                const handleParts = change.item.targetHandle.split('-');
                if (handleParts.length >= 3) {
                    const sensorId = `${handleParts[1]}-${handleParts[2]}`;
                    const nodeId = handleParts.slice(3).join('-');
                    updateSensorConnection(nodeId, sensorId, true);
                }
            } else if (change.type === 'remove' && change.id) {
                // Find the edge being removed and update sensor if needed
                const edgeToRemove = edges.find(edge => edge.id === change.id);
                if (edgeToRemove?.targetHandle?.includes('sensor-')) {
                    const handleParts = edgeToRemove.targetHandle.split('-');
                    if (handleParts.length >= 3) {
                        const sensorId = `${handleParts[1]}-${handleParts[2]}`;
                        const nodeId = handleParts.slice(3).join('-');
                        updateSensorConnection(nodeId, sensorId, false);
                    }
                }
            }
        });
    }, [edges, updateSensorConnection]);

    return (
        <div className="flex h-screen bg-gray-100">
            <ReactFlowProvider>
                <Sidebar
                    onDownload={downloadDashboard}
                    onUpload={uploadDashboard}
                    onClear={clearFlow}
                />
                <div className="flex-1" ref={reactFlowWrapper}>
                    <MainCanvas
                        nodes={nodes}
                        edges={edges}
                        setNodes={setNodes}
                        setEdges={setEdges}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        nodeTypes={nodeTypes}
                        updateTankData={updateTankData}
                        onEdgesChange={onEdgesChange}
                    />
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default DashboardMaker;