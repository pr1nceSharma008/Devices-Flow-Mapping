// import React from 'react';
// import { Handle, Position } from '@xyflow/react';
// import {
//     FaFlask,
//     FaMicrochip,
//     FaBolt,
//     FaFan,
// } from 'react-icons/fa';
// import { FiCpu } from "react-icons/fi";
// import { GiUndergroundCave } from "react-icons/gi";
// import WaterMotor from "./Assets/water-pump-motor.jpg";

// export const iconMappings = {
//     'Tank': FaFlask,
//     'Underground Tank': GiUndergroundCave,
//     'Sensor Board': FaMicrochip,
//     'Water IoT CPU': FiCpu,
//     'Energy Meter': FaBolt,
//     'Motor': FaFan,
// };

// const CustomNode = ({ data, isConnectable }) => {
//     const IconComponent = data.icon || FaMicrochip;

//     // Check if this is a tank node (regular or underground)
//     const isTank = data.label === 'Tank' || data.type === 'Tank';
//     const isUndergroundTank = data.label === 'Underground Tank' || data.type === 'Underground Tank';
//     const isSensorBoard = data.label === 'Sensor Board' || data.type === 'Sensor Board';
//     const isMotor = data.label === 'Motor' || data.type === 'Motor';

//     if (isTank) {
//         // Regular Tank rendering
//         const tankName = data.name || 'Tank';
//         const capacity = data.capacity || '100L';
//         const todayRefill = data.todayRefill || 0;
//         const isFull = data.isFull || 0; // 0 = empty (red), 1 = full (green)

//         const tankColor = isFull === 1 ? '#22c55e' : '#ef4444'; // green or red
//         const borderColor = isFull === 1 ? '#16a34a' : '#dc2626';

//         return (
//             <div className="relative">
//                 <Handle
//                     type="target"
//                     position={Position.Left}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//                 {/* Tank Shape */}
//                 <div
//                     className="relative flex flex-col items-center justify-center rounded-lg border-2 shadow-lg"
//                     style={{
//                         width: '150px',
//                         height: '180px',
//                         backgroundColor: tankColor,
//                         borderColor: borderColor,
//                         borderRadius: '12px 12px 8px 8px', // Slightly rounded top, less rounded bottom
//                     }}
//                 >


//                     {/* Tank Name at Bottom */}
//                     <div
//                         className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-md py-1 rounded-b-lg"
//                         style={{
//                             backgroundColor: 'rgba(0, 0, 0, 0.2)',
//                             backdropFilter: 'blur(2px)'
//                         }}
//                     >
//                         {tankName}
//                         {/* Tank Content Area */}
//                         <div className="flex-1 flex flex-col items-center justify-center text-white font-semibold px-2">
//                             <div className="text-xs mb-1">{capacity}</div>
//                             <div className="text-xs">Refill: {todayRefill}x</div>
//                         </div>
//                     </div>

//                     {/* Tank Top Cap */}
//                     <div
//                         className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-2 rounded-t-lg"
//                         style={{
//                             width: '40px',
//                             height: '8px',
//                             backgroundColor: '#6b7280',
//                             borderColor: '#4b5563'
//                         }}
//                     />
//                 </div>

//                 <Handle
//                     type="source"
//                     position={Position.Right}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />
//             </div>
//         );
//     }

//     if (isUndergroundTank) {
//         // Underground Tank rendering based on the image
//         const tankName = data.name || 'Underground Tank';
//         const capacity = data.capacity || '100L';
//         const todayRefill = data.todayRefill || 0;
//         const isFull = data.isFull || 0; // 0 = empty (red), 1 = full (green)

//         const waterColor = isFull === 1 ? '#3b82f6' : '#93c5fd'; // blue or light blue
//         const groundColor = '#92400e'; // brown for ground

//         return (
//             <div className="relative">
//                 <Handle
//                     type="target"
//                     position={Position.Left}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//                 {/* Underground Tank Container */}
//                 <div
//                     className="relative overflow-hidden"
//                     style={{
//                         width: '180px',
//                         height: '120px',
//                         backgroundColor: groundColor,
//                         borderRadius: '8px',
//                         border: '2px solid #92400e'
//                     }}
//                 >
//                     {/* Ground texture on top */}
//                     <div
//                         className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-600 to-amber-700"
//                         style={{
//                             backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)'
//                         }}
//                     >
//                         {/* Small grass elements */}
//                         <div className="absolute top-0 left-4 w-1 h-10 bg-green-500 rounded-full"></div>
//                         <div className="absolute top-0 left-8 w-1 h-5 bg-green-600 rounded-full"></div>
//                         <div className="absolute top-0 left-12 w-1 h-3 bg-green-600 rounded-full"></div>
//                         <div className="absolute top-0 right-8 w-1 h-8 bg-green-500 rounded-full"></div>
//                         <div className="absolute top-0 right-2 w-1 h-12 bg-green-600 rounded-full"></div>
//                     </div>

//                     {/* Underground Tank Structure */}
//                     <div
//                         className="absolute bottom-2 left-4 right-4 border-2 border-gray-400 rounded-lg overflow-hidden"
//                         style={{
//                             height: '70px',
//                             backgroundColor: '#e5e7eb' // tank structure color
//                         }}
//                     >
//                         {/* Water inside tank */}
//                         <div
//                             className="absolute bottom-0 left-0 right-0 transition-all duration-300"
//                             style={{
//                                 height: isFull === 1 ? '100%' : '30%',
//                                 backgroundColor: waterColor,
//                                 backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
//                                 backgroundSize: '8px 8px'
//                             }}
//                         >
//                             {/* Water surface effect */}
//                             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
//                         </div>

//                         {/* Tank frame/structure */}
//                         <div className="absolute inset-0 border-2 border-gray-500 rounded-lg pointer-events-none"></div>
//                     </div>

//                     {/* Access pipe/lid on top */}
//                     <div
//                         className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-t-lg border-2 border-gray-700"
//                     >
//                         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
//                     </div>

//                     {/* Tank info overlay */}
//                     <div style={{
//                         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//                         backdropFilter: 'blur(2px)'
//                     }} className="absolute top-0 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//                         <div>{capacity}</div>
//                         <div>Refill: {todayRefill}x</div>
//                     </div>

//                     {/* Status indicator */}
//                     <div
//                         className="absolute top-2 left-2 w-3 h-3 rounded-full"
//                         style={{
//                             backgroundColor: isFull === 1 ? '#22c55e' : '#ef4444'
//                         }}
//                     ></div>
//                 </div>

//                 <Handle
//                     type="source"
//                     position={Position.Right}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />
//             </div>
//         );
//     }

//     if (isSensorBoard) {
//         // Sensor board rendering
//         const sensors = data.sensors || [
//             { id: 'd1', label: 'd', connected: false },
//             { id: 'd2', label: 'd', connected: false },
//             { id: 'd3', label: 'd', connected: false },
//             { id: 'd4', label: 'd', connected: false },
//             { id: 'd5', label: 'd', connected: false }
//         ];

//         const nodeWidth = Math.max(200, sensors.length * 35 + 60); // Dynamic width based on sensor count

//         return (
//             <div className="relative">
//                 {/* Main Sensor board Container */}
//                 <div
//                     className="relative rounded-lg shadow-lg overflow-hidden"
//                     style={{
//                         width: `${nodeWidth}px`,
//                         height: '80px',
//                         background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', // Green gradient
//                         border: '2px solid #4d7c0f'
//                     }}
//                 >

//                     {/* Sensors Container */}
//                     <div className="flex items-center justify-center px-4 pb-2">
//                         <div className="flex space-x-2">
//                             {sensors.map((sensor, index) => {
//                                 const sensorColor = sensor.connected ? '#22c55e' : '#6b7280'; // Green if connected, gray if not
//                                 const handleId = `sensor-${sensor.id}-${data.nodeId || 'unknown'}`;

//                                 return (
//                                     <div key={sensor.id} className="relative">
//                                         {/* Individual Sensor Handle - Only at Top */}
//                                         <Handle
//                                             type="target"
//                                             position={Position.Top}
//                                             id={handleId}
//                                             style={{
//                                                 background: sensorColor,
//                                                 width: '8px',
//                                                 height: '8px',
//                                                 top: '-4px',
//                                                 left: '50%',
//                                                 transform: 'translateX(-50%)'
//                                             }}
//                                             onConnect={(params) => {
//                                                 console.log('sensor handle onConnect', params);
//                                                 // Update sensor connection status
//                                                 if (data.onSensorConnect) {
//                                                     data.onSensorConnect(sensor.id, true);
//                                                 }
//                                             }}
//                                             onDisconnect={(params) => {
//                                                 console.log('sensor handle onDisconnect', params);
//                                                 // Update sensor connection status
//                                                 if (data.onSensorConnect) {
//                                                     data.onSensorConnect(sensor.id, false);
//                                                 }
//                                             }}
//                                             isConnectable={isConnectable}
//                                         />

//                                         {/* Sensor Visual Element */}
//                                         <div
//                                             className="flex items-center justify-center rounded text-white font-bold text-xs transition-colors duration-200"
//                                             style={{
//                                                 width: '24px',
//                                                 height: '24px',
//                                                 backgroundColor: sensorColor,
//                                                 border: `2px solid ${sensor.connected ? '#16a34a' : '#4b5563'}`,
//                                                 boxShadow: sensor.connected ? '0 0 8px rgba(34, 197, 94, 0.4)' : 'none'
//                                             }}
//                                         >
//                                             {sensor.label}
//                                         </div>

//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                 </div>

//                 {/* Main Output Handle */}
//                 <Handle
//                     type="source"
//                     position={Position.Bottom}
//                     onConnect={(params) => console.log('main output handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//             </div>
//         );
//     }

//     if (isMotor) {
//         // Professional Motor rendering based on the provided image
//         const motorName = data.name || 'Motor';
//         const isRunning = data.isRunning || false;
//         const power = data.power || '1.5kW';
//         const rpm = data.rpm || '1450';

//         return (
//             <div className="relative">
//                 <Handle
//                     type="target"
//                     position={Position.Left}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//                 <div
//                     className="relative flex items-center justify-center overflow-hidden"
//                     style={{
//                         width: '180px',
//                         height: '120px',
//                     }}
//                 >
//                     <div
//                         className=" w-8 h-2 bg-gray-600 "
//                     ></div>

//                     {/* Motor Container */}
//                     <div
//                         className="relative rounded-e-4xl rounded-md shadow-lg overflow-hidden"
//                         style={{
//                             width: '160px',
//                             height: '120px',
//                             background: 'linear-gradient(135deg, #C4C4C4 0%, #3D3D3D 100%)',
//                             border: '3px solid #666666'
//                         }}
//                     >
//                         {/* Motor Body */}
//                         <div className="relative w-full h-full flex flex-col items-center justify-center">

//                             {/* Motor Shaft/Fan */}
//                             <div className="relative ">
//                                 <div
//                                     className={`relative rounded-full border-4 border-gray-300 transition-transform duration-100 ${isRunning ? 'animate-spin' : ''
//                                         }`}
//                                     style={{
//                                         width: '90px',
//                                         height: '90px',
//                                         backgroundColor: '#d1d5db',
//                                         boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
//                                     }}
//                                 >
//                                     {/* Fan blades */}
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <div
//                                             className="absolute w-20 h-1 bg-gray-600 rounded-full"
//                                             style={{ transform: 'rotate(0deg)' }}
//                                         ></div>
//                                         <div
//                                             className="absolute w-20 h-1 bg-gray-600 rounded-full"
//                                             style={{ transform: 'rotate(45deg)' }}
//                                         ></div>
//                                         <div
//                                             className="absolute w-20 h-1 bg-gray-600 rounded-full"
//                                             style={{ transform: 'rotate(90deg)' }}
//                                         ></div>
//                                         <div
//                                             className="absolute w-20 h-1 bg-gray-600 rounded-full"
//                                             style={{ transform: 'rotate(135deg)' }}
//                                         ></div>
//                                     </div>

//                                     {/* Center hub */}
//                                     <div
//                                         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
//                                         style={{
//                                             width: '16px',
//                                             height: '16px',
//                                             backgroundColor: '#4b5563',
//                                             border: '2px solid #374151'
//                                         }}
//                                     ></div>
//                                 </div>
//                             </div>

//                             {/* Motor Label */}
//                             {/* <div className="absolute bottom-1 left-1 right-1 text-center">
//                             <div className="text-white font-bold text-xs mb-1">{motorName}</div>
//                         </div> */}
//                         </div>

//                     </div>
//                     {/* Motor Base/Mount */}
//                     <div
//                         className="absolute bottom-0 left-8 right-4 h-2 rounded-b"
//                         style={{
//                             backgroundColor: '#1f2937',
//                             border: '1px solid #3D3D3D'
//                         }}
//                     ></div>
//                 </div>

//                 <Handle
//                     type="source"
//                     position={Position.Right}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />
//             </div >
//         );
//     }

//     // Default node rendering for non-tank and non-sensor-aggregator nodes
//     return (
//         <div className="px-4 py-2 shadow-md rounded-md bg-white border border-blue-500">
//             <Handle
//                 type="target"
//                 position={Position.Left}
//                 style={{ background: '#555' }}
//                 onConnect={(params) => console.log('handle onConnect', params)}
//                 isConnectable={isConnectable}
//             />
//             <div className="flex items-center">
//                 <IconComponent className="text-blue-500 mr-2" size={20} />
//                 <div>
//                     <div className="text-lg text-blue-500 font-bold">{data.label}</div>
//                 </div>
//             </div>
//             <Handle
//                 type="source"
//                 position={Position.Right}
//                 style={{ background: '#555' }}
//                 onConnect={(params) => console.log('handle onConnect', params)}
//                 isConnectable={isConnectable}
//             />
//         </div>
//     );
// };

// export const nodeTypes = {
//     customNode: CustomNode,
// };



// import React from 'react';
// import Image from 'next/image';
// import { Handle, Position } from '@xyflow/react';
// import {
//     FaFlask,
//     FaMicrochip,
//     FaBolt,
//     FaFan,
// } from 'react-icons/fa';
// import { FiCpu } from "react-icons/fi";
// import { GiUndergroundCave } from "react-icons/gi";
// import WaterMotor from "./Assets/water-pump-motor.jpg";

// export const iconMappings = {
//     'Tank': FaFlask,
//     'Underground Tank': GiUndergroundCave,
//     'Sensor Board': FaMicrochip,
//     'Water IoT CPU': FiCpu,
//     'Energy Meter': FaBolt,
//     'Motor': FaFan,
// };

// const CustomNode = ({ data, isConnectable }) => {
//     const IconComponent = data.icon || FaMicrochip;

//     // Check if this is a tank node (regular or underground)
//     const isTank = data.label === 'Tank' || data.type === 'Tank';
//     const isUndergroundTank = data.label === 'Underground Tank' || data.type === 'Underground Tank';
//     const isSensorBoard = data.label === 'Sensor Board' || data.type === 'Sensor Board';
//     const isMotor = data.label === 'Motor' || data.type === 'Motor';

//     if (isTank) {
//         // Regular Tank rendering
//         const tankName = data.name || 'Tank';
//         const capacity = data.capacity || '100L';
//         const todayRefill = data.todayRefill || 0;
//         const isFull = data.isFull || 0; // 0 = empty (red), 1 = full (green)

//         const tankColor = isFull === 1 ? '#22c55e' : '#ef4444'; // green or red
//         const borderColor = isFull === 1 ? '#16a34a' : '#dc2626';

//         return (
//             <div className="relative">
//                 <Handle
//                     type="target"
//                     position={Position.Left}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//                 {/* Tank Shape */}
//                 <div
//                     className="relative flex flex-col items-center justify-center rounded-lg border-2 shadow-lg"
//                     style={{
//                         width: '150px',
//                         height: '180px',
//                         backgroundColor: tankColor,
//                         borderColor: borderColor,
//                         borderRadius: '12px 12px 8px 8px', // Slightly rounded top, less rounded bottom
//                     }}
//                 >


//                     {/* Tank Name at Bottom */}
//                     <div
//                         className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-md py-1 rounded-b-lg"
//                         style={{
//                             backgroundColor: 'rgba(0, 0, 0, 0.2)',
//                             backdropFilter: 'blur(2px)'
//                         }}
//                     >
//                         {tankName}
//                         {/* Tank Content Area */}
//                         <div className="flex-1 flex flex-col items-center justify-center text-white font-semibold px-2">
//                             <div className="text-xs mb-1">{capacity}</div>
//                             <div className="text-xs">Refill: {todayRefill}x</div>
//                         </div>
//                     </div>

//                     {/* Tank Top Cap */}
//                     <div
//                         className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-2 rounded-t-lg"
//                         style={{
//                             width: '40px',
//                             height: '8px',
//                             backgroundColor: '#6b7280',
//                             borderColor: '#4b5563'
//                         }}
//                     />
//                 </div>

//                 <Handle
//                     type="source"
//                     position={Position.Right}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />
//             </div>
//         );
//     }

//     if (isUndergroundTank) {
//         // Underground Tank rendering based on the image
//         const tankName = data.name || 'Underground Tank';
//         const capacity = data.capacity || '100L';
//         const todayRefill = data.todayRefill || 0;
//         const isFull = data.isFull || 0; // 0 = empty (red), 1 = full (green)

//         const waterColor = isFull === 1 ? '#3b82f6' : '#93c5fd'; // blue or light blue
//         const groundColor = '#92400e'; // brown for ground

//         return (
//             <div className="relative">
//                 <Handle
//                     type="target"
//                     position={Position.Left}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//                 {/* Underground Tank Container */}
//                 <div
//                     className="relative overflow-hidden"
//                     style={{
//                         width: '180px',
//                         height: '120px',
//                         backgroundColor: groundColor,
//                         borderRadius: '8px',
//                         border: '2px solid #92400e'
//                     }}
//                 >
//                     {/* Ground texture on top */}
//                     <div
//                         className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-600 to-amber-700"
//                         style={{
//                             backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)'
//                         }}
//                     >
//                         {/* Small grass elements */}
//                         <div className="absolute top-0 left-4 w-1 h-10 bg-green-500 rounded-full"></div>
//                         <div className="absolute top-0 left-8 w-1 h-5 bg-green-600 rounded-full"></div>
//                         <div className="absolute top-0 left-12 w-1 h-3 bg-green-600 rounded-full"></div>
//                         <div className="absolute top-0 right-8 w-1 h-8 bg-green-500 rounded-full"></div>
//                         <div className="absolute top-0 right-2 w-1 h-12 bg-green-600 rounded-full"></div>
//                     </div>

//                     {/* Underground Tank Structure */}
//                     <div
//                         className="absolute bottom-2 left-4 right-4 border-2 border-gray-400 rounded-lg overflow-hidden"
//                         style={{
//                             height: '70px',
//                             backgroundColor: '#e5e7eb' // tank structure color
//                         }}
//                     >
//                         {/* Water inside tank */}
//                         <div
//                             className="absolute bottom-0 left-0 right-0 transition-all duration-300"
//                             style={{
//                                 height: isFull === 1 ? '100%' : '30%',
//                                 backgroundColor: waterColor,
//                                 backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
//                                 backgroundSize: '8px 8px'
//                             }}
//                         >
//                             {/* Water surface effect */}
//                             <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
//                         </div>

//                         {/* Tank frame/structure */}
//                         <div className="absolute inset-0 border-2 border-gray-500 rounded-lg pointer-events-none"></div>
//                     </div>

//                     {/* Access pipe/lid on top */}
//                     <div
//                         className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-t-lg border-2 border-gray-700"
//                     >
//                         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
//                     </div>

//                     {/* Tank info overlay */}
//                     <div style={{
//                         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//                         backdropFilter: 'blur(2px)'
//                     }} className="absolute top-0 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//                         <div>{capacity}</div>
//                         <div>Refill: {todayRefill}x</div>
//                     </div>

//                     {/* Status indicator */}
//                     <div
//                         className="absolute top-2 left-2 w-3 h-3 rounded-full"
//                         style={{
//                             backgroundColor: isFull === 1 ? '#22c55e' : '#ef4444'
//                         }}
//                     ></div>
//                 </div>

//                 <Handle
//                     type="source"
//                     position={Position.Right}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />
//             </div>
//         );
//     }

//     if (isSensorBoard) {
//         // Sensor board rendering
//         const sensors = data.sensors || [
//             { id: 'd1', label: 'd', connected: false },
//             { id: 'd2', label: 'd', connected: false },
//             { id: 'd3', label: 'd', connected: false },
//             { id: 'd4', label: 'd', connected: false },
//             { id: 'd5', label: 'd', connected: false }
//         ];

//         const nodeWidth = Math.max(200, sensors.length * 35 + 60); // Dynamic width based on sensor count

//         return (
//             <div className="relative">
//                 {/* Main Sensor board Container */}
//                 <div
//                     className="relative rounded-lg shadow-lg overflow-hidden"
//                     style={{
//                         width: `${nodeWidth}px`,
//                         height: '80px',
//                         background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', // Green gradient
//                         border: '2px solid #4d7c0f'
//                     }}
//                 >

//                     {/* Sensors Container */}
//                     <div className="flex items-center justify-center px-4 pb-2">
//                         <div className="flex space-x-2">
//                             {sensors.map((sensor, index) => {
//                                 const sensorColor = sensor.connected ? '#22c55e' : '#6b7280'; // Green if connected, gray if not
//                                 const handleId = `sensor-${sensor.id}-${data.nodeId || 'unknown'}`;

//                                 return (
//                                     <div key={sensor.id} className="relative">
//                                         {/* Individual Sensor Handle - Only at Top */}
//                                         <Handle
//                                             type="target"
//                                             position={Position.Top}
//                                             id={handleId}
//                                             style={{
//                                                 background: sensorColor,
//                                                 width: '8px',
//                                                 height: '8px',
//                                                 top: '-4px',
//                                                 left: '50%',
//                                                 transform: 'translateX(-50%)'
//                                             }}
//                                             onConnect={(params) => {
//                                                 console.log('sensor handle onConnect', params);
//                                                 // Update sensor connection status
//                                                 if (data.onSensorConnect) {
//                                                     data.onSensorConnect(sensor.id, true);
//                                                 }
//                                             }}
//                                             onDisconnect={(params) => {
//                                                 console.log('sensor handle onDisconnect', params);
//                                                 // Update sensor connection status
//                                                 if (data.onSensorConnect) {
//                                                     data.onSensorConnect(sensor.id, false);
//                                                 }
//                                             }}
//                                             isConnectable={isConnectable}
//                                         />

//                                         {/* Sensor Visual Element */}
//                                         <div
//                                             className="flex items-center justify-center rounded text-white font-bold text-xs transition-colors duration-200"
//                                             style={{
//                                                 width: '24px',
//                                                 height: '24px',
//                                                 backgroundColor: sensorColor,
//                                                 border: `2px solid ${sensor.connected ? '#16a34a' : '#4b5563'}`,
//                                                 boxShadow: sensor.connected ? '0 0 8px rgba(34, 197, 94, 0.4)' : 'none'
//                                             }}
//                                         >
//                                             {sensor.label}
//                                         </div>

//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                 </div>

//                 {/* Main Output Handle */}
//                 <Handle
//                     type="source"
//                     position={Position.Bottom}
//                     onConnect={(params) => console.log('main output handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//             </div>
//         );
//     }

//     if (isMotor) {
//         // Motor rendering using the WaterMotor image
//         const motorName = data.name || 'Motor';
//         const isRunning = data.isRunning || false;
//         const power = data.power || '1.5kW';
//         const rpm = data.rpm || '1450';

//         return (
//             <div className="relative">
//                 <Handle
//                     type="target"
//                     position={Position.Left}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />

//                 {/* Motor Container */}
//                 <div
//                     className="relative rounded-lg shadow-lg overflow-hidden border-2 border-gray-400 bg-gray-100"
//                     style={{
//                         width: '160px',
//                         height: '120px',
//                     }}
//                 >
//                     {/* Water Motor Image */}
//                     <div className="relative w-full h-full">
//                         <Image
//                             src={WaterMotor}
//                             alt="Water Motor"
//                             fill
//                             className="object-cover object-center transition-all duration-300"
//                             style={{
//                                 filter: isRunning ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)',
//                             }}
//                             sizes="160px"
//                         />
//                     </div>
//                 </div>

//                 <Handle
//                     type="source"
//                     position={Position.Right}
//                     style={{ background: '#555', top: '50%' }}
//                     onConnect={(params) => console.log('handle onConnect', params)}
//                     isConnectable={isConnectable}
//                 />
//             </div>
//         );
//     }

//     // Default node rendering for non-tank and non-sensor-aggregator nodes
//     return (
//         <div className="px-4 py-2 shadow-md rounded-md bg-white border border-blue-500">
//             <Handle
//                 type="target"
//                 position={Position.Left}
//                 style={{ background: '#555' }}
//                 onConnect={(params) => console.log('handle onConnect', params)}
//                 isConnectable={isConnectable}
//             />
//             <div className="flex items-center">
//                 <IconComponent className="text-blue-500 mr-2" size={20} />
//                 <div>
//                     <div className="text-lg text-blue-500 font-bold">{data.label}</div>
//                 </div>
//             </div>
//             <Handle
//                 type="source"
//                 position={Position.Right}
//                 style={{ background: '#555' }}
//                 onConnect={(params) => console.log('handle onConnect', params)}
//                 isConnectable={isConnectable}
//             />
//         </div>
//     );
// };

// export const nodeTypes = {
//     customNode: CustomNode,
// };



import React from 'react';
import Image from 'next/image';
import { Handle, Position } from '@xyflow/react';
import {
    FaFlask,
    FaMicrochip,
    FaBolt,
    FaFan,
} from 'react-icons/fa';
import { FiCpu } from "react-icons/fi";
import { GiUndergroundCave } from "react-icons/gi";
import WaterMotor from "./Assets/water-pump-motor.jpg";

export const iconMappings = {
    'Tank': FaFlask,
    'Underground Tank': GiUndergroundCave,
    'Sensor Board': FaMicrochip,
    'Water IoT CPU': FiCpu,
    'Energy Meter': FaBolt,
    'Motor': FaFan,
};

const CustomNode = ({ data, isConnectable }) => {
    const IconComponent = data.icon || FaMicrochip;

    // Check if this is a tank node (regular or underground)
    const isTank = data.label === 'Tank' || data.type === 'Tank';
    const isUndergroundTank = data.label === 'Underground Tank' || data.type === 'Underground Tank';
    const isSensorBoard = data.label === 'Sensor Board' || data.type === 'Sensor Board';
    const isMotor = data.label === 'Motor' || data.type === 'Motor';
    const isEnergyMeter = data.label === 'Energy Meter' || data.type === 'Energy Meter';

    if (isTank) {
        // Regular Tank rendering
        const tankName = data.name || 'Tank';
        const capacity = data.capacity || '100L';
        const todayRefill = data.todayRefill || 0;
        const isFull = data.isFull || 0; // 0 = empty (red), 1 = full (green)

        const tankColor = isFull === 1 ? '#22c55e' : '#ef4444'; // green or red
        const borderColor = isFull === 1 ? '#16a34a' : '#dc2626';

        return (
            <div className="relative">
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />

                {/* Tank Shape */}
                <div
                    className="relative flex flex-col items-center justify-center rounded-lg border-2 shadow-lg"
                    style={{
                        width: '150px',
                        height: '180px',
                        backgroundColor: tankColor,
                        borderColor: borderColor,
                        borderRadius: '12px 12px 8px 8px', // Slightly rounded top, less rounded bottom
                    }}
                >


                    {/* Tank Name at Bottom */}
                    <div
                        className="absolute bottom-0 left-0 right-0 text-center text-white font-bold text-md py-1 rounded-b-lg"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(2px)'
                        }}
                    >
                        {tankName}
                        {/* Tank Content Area */}
                        <div className="flex-1 flex flex-col items-center justify-center text-white font-semibold px-2">
                            <div className="text-xs mb-1">{capacity}</div>
                            <div className="text-xs">Refill: {todayRefill}x</div>
                        </div>
                    </div>

                    {/* Tank Top Cap */}
                    <div
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-2 rounded-t-lg"
                        style={{
                            width: '40px',
                            height: '8px',
                            backgroundColor: '#6b7280',
                            borderColor: '#4b5563'
                        }}
                    />
                </div>

                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
            </div>
        );
    }

    if (isUndergroundTank) {
        // Underground Tank rendering based on the image
        const tankName = data.name || 'Underground Tank';
        const capacity = data.capacity || '100L';
        const todayRefill = data.todayRefill || 0;
        const isFull = data.isFull || 0; // 0 = empty (red), 1 = full (green)

        const waterColor = isFull === 1 ? '#3b82f6' : '#93c5fd'; // blue or light blue
        const groundColor = '#92400e'; // brown for ground

        return (
            <div className="relative">
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />

                {/* Underground Tank Container */}
                <div
                    className="relative overflow-hidden"
                    style={{
                        width: '180px',
                        height: '120px',
                        backgroundColor: groundColor,
                        borderRadius: '8px',
                        border: '2px solid #92400e'
                    }}
                >
                    {/* Ground texture on top */}
                    <div
                        className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-600 to-amber-700"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)'
                        }}
                    >
                        {/* Small grass elements */}
                        <div className="absolute top-0 left-4 w-1 h-10 bg-green-500 rounded-full"></div>
                        <div className="absolute top-0 left-8 w-1 h-5 bg-green-600 rounded-full"></div>
                        <div className="absolute top-0 left-12 w-1 h-3 bg-green-600 rounded-full"></div>
                        <div className="absolute top-0 right-8 w-1 h-8 bg-green-500 rounded-full"></div>
                        <div className="absolute top-0 right-2 w-1 h-12 bg-green-600 rounded-full"></div>
                    </div>

                    {/* Underground Tank Structure */}
                    <div
                        className="absolute bottom-2 left-4 right-4 border-2 border-gray-400 rounded-lg overflow-hidden"
                        style={{
                            height: '70px',
                            backgroundColor: '#e5e7eb' // tank structure color
                        }}
                    >
                        {/* Water inside tank */}
                        <div
                            className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                            style={{
                                height: isFull === 1 ? '100%' : '30%',
                                backgroundColor: waterColor,
                                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
                                backgroundSize: '8px 8px'
                            }}
                        >
                            {/* Water surface effect */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                        </div>

                        {/* Tank frame/structure */}
                        <div className="absolute inset-0 border-2 border-gray-500 rounded-lg pointer-events-none"></div>
                    </div>

                    {/* Access pipe/lid on top */}
                    <div
                        className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-t-lg border-2 border-gray-700"
                    >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>

                    {/* Tank info overlay */}
                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(2px)'
                    }} className="absolute top-0 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        <div>{capacity}</div>
                        <div>Refill: {todayRefill}x</div>
                    </div>

                    {/* Status indicator */}
                    <div
                        className="absolute top-2 left-2 w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: isFull === 1 ? '#22c55e' : '#ef4444'
                        }}
                    ></div>
                </div>

                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
            </div>
        );
    }

    if (isSensorBoard) {
        // Sensor board rendering
        const sensors = data.sensors || [
            { id: 'd1', label: 'd', connected: false },
            { id: 'd2', label: 'd', connected: false },
            { id: 'd3', label: 'd', connected: false },
            { id: 'd4', label: 'd', connected: false },
            { id: 'd5', label: 'd', connected: false }
        ];

        const nodeWidth = Math.max(200, sensors.length * 35 + 60); // Dynamic width based on sensor count

        return (
            <div className="relative">
                {/* Main Sensor board Container */}
                <div
                    className="relative rounded-lg shadow-lg overflow-hidden"
                    style={{
                        width: `${nodeWidth}px`,
                        height: '80px',
                        background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', // Green gradient
                        border: '2px solid #4d7c0f'
                    }}
                >

                    {/* Sensors Container */}
                    <div className="flex items-center justify-center px-4 pb-2">
                        <div className="flex space-x-2">
                            {sensors.map((sensor, index) => {
                                const sensorColor = sensor.connected ? '#22c55e' : '#6b7280'; // Green if connected, gray if not
                                const handleId = `sensor-${sensor.id}-${data.nodeId || 'unknown'}`;

                                return (
                                    <div key={sensor.id} className="relative">
                                        {/* Individual Sensor Handle - Only at Top */}
                                        <Handle
                                            type="target"
                                            position={Position.Top}
                                            id={handleId}
                                            style={{
                                                background: sensorColor,
                                                width: '8px',
                                                height: '8px',
                                                top: '-4px',
                                                left: '50%',
                                                transform: 'translateX(-50%)'
                                            }}
                                            onConnect={(params) => {
                                                console.log('sensor handle onConnect', params);
                                                // Update sensor connection status
                                                if (data.onSensorConnect) {
                                                    data.onSensorConnect(sensor.id, true);
                                                }
                                            }}
                                            onDisconnect={(params) => {
                                                console.log('sensor handle onDisconnect', params);
                                                // Update sensor connection status
                                                if (data.onSensorConnect) {
                                                    data.onSensorConnect(sensor.id, false);
                                                }
                                            }}
                                            isConnectable={isConnectable}
                                        />

                                        {/* Sensor Visual Element */}
                                        <div
                                            className="flex items-center justify-center rounded text-white font-bold text-xs transition-colors duration-200"
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: sensorColor,
                                                border: `2px solid ${sensor.connected ? '#16a34a' : '#4b5563'}`,
                                                boxShadow: sensor.connected ? '0 0 8px rgba(34, 197, 94, 0.4)' : 'none'
                                            }}
                                        >
                                            {sensor.label}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Main Output Handle */}
                <Handle
                    type="source"
                    position={Position.Bottom}
                    onConnect={(params) => console.log('main output handle onConnect', params)}
                    isConnectable={isConnectable}
                />

            </div>
        );
    }

    if (isMotor) {
        // Motor rendering using the WaterMotor image
        const motorName = data.name || 'Motor';
        const isRunning = data.isRunning || false;
        const power = data.power || '1.5kW';
        const rpm = data.rpm || '1450';

        return (
            <div className="relative">
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />

                {/* Motor Container */}
                <div
                    className="relative rounded-lg shadow-lg overflow-hidden border-2 border-gray-400 bg-gray-100"
                    style={{
                        width: '160px',
                        height: '120px',
                    }}
                >
                    {/* Water Motor Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src={WaterMotor}
                            alt="Water Motor"
                            fill
                            className="object-cover object-center transition-all duration-300"
                            style={{
                                filter: isRunning ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)',
                            }}
                            sizes="160px"
                        />
                    </div>
                </div>

                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
            </div>
        );
    }

    if (isEnergyMeter) {
        // Energy Meter rendering
        const meterName = data.name || 'Energy Meter';
        const voltage = data.voltage || '230V';
        const current = data.current || '2.5A';
        const power = data.power || '575W';
        const powerFactor = data.powerFactor || '0.92';
        const energy = data.energy || '12.34kWh';
        const isActive = data.isActive !== undefined ? data.isActive : true;

        return (
            <div className="relative">
                <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />

                {/* Energy Meter Container */}
                <div
                    className="relative rounded-lg shadow-lg overflow-hidden"
                    style={{
                        width: '200px',
                        height: '140px',
                        background: 'linear-gradient(145deg, #1f2937 0%, #374151 100%)',
                        border: '3px solid #4b5563'
                    }}
                >
                    {/* LCD Display Area */}
                    <div
                        className="absolute top-4 left-4 right-4 rounded border-2 border-gray-600 bg-black text-green-400 font-mono"
                        style={{ height: '60px' }}
                    >
                        {/* Display content */}
                        <div className="p-2 text-xs">
                            <div className="flex justify-between items-center mb-1">
                                <span>V: {voltage}</span>
                                <span>A: {current}</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <span>P: {power}</span>
                                <span>PF: {powerFactor}</span>
                            </div>
                            <div className="text-center font-bold">
                                {energy}
                            </div>
                        </div>

                        {/* Display glow effect */}
                        {isActive && (
                            <div
                                className="absolute inset-0 rounded pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
                                    animation: 'pulse 2s infinite'
                                }}
                            />
                        )}
                    </div>

                    {/* Control Buttons */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <div className="w-6 h-4 bg-gray-600 rounded border border-gray-500"></div>
                        <div className="w-6 h-4 bg-gray-600 rounded border border-gray-500"></div>
                        <div className="w-6 h-4 bg-gray-600 rounded border border-gray-500"></div>
                    </div>

                    {/* Status LED */}
                    <div
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: isActive ? '#22c55e' : '#ef4444',
                            boxShadow: isActive ? '0 0 8px rgba(34, 197, 94, 0.6)' : '0 0 8px rgba(239, 68, 68, 0.6)'
                        }}
                    />

                    {/* Meter Brand/Model */}
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs font-bold">
                        {meterName}
                    </div>

                    {/* Terminal connections visualization */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-yellow-600 rounded-r"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-yellow-600 rounded-l"></div>

                    {/* Bolt icon in center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                        <FaBolt size={40} className="text-yellow-400" />
                    </div>
                </div>

                <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: '#555', top: '50%' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />

                {/* Add pulsing animation for active meters */}
                <style jsx>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 0.1; }
                        50% { opacity: 0.2; }
                    }
                `}</style>
            </div>
        );
    }

    // Default node rendering for non-tank and non-sensor-aggregator nodes
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border border-blue-500">
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div className="flex items-center">
                <IconComponent className="text-blue-500 mr-2" size={20} />
                <div>
                    <div className="text-lg text-blue-500 font-bold">{data.label}</div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export const nodeTypes = {
    customNode: CustomNode,
};