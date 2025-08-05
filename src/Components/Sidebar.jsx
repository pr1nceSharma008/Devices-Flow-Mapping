import React, { useRef } from 'react';
import {
    FaFlask,
    FaMicrochip,
    FaBolt,
    FaFan,
    FaDownload,
    FaUpload,
    FaTrash,
    FaGripVertical
} from 'react-icons/fa';
import { FiCpu } from "react-icons/fi"; import { GiUndergroundCave } from "react-icons/gi";

const iconItems = [
    { id: 'Tank', name: 'Tank', icon: FaFlask, color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'Underground Tank', name: 'Underground Tank', icon: GiUndergroundCave, color: 'bg-amber-600 hover:bg-amber-700' },
    { id: 'Sensor Board', name: 'Sensor Board', icon: FaMicrochip, color: 'bg-green-500 hover:bg-green-600' },
    { id: 'Water IoT CPU', name: 'Water IoT CPU', icon: FiCpu, color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'Energy Meter', name: 'Energy Meter', icon: FaBolt, color: 'bg-yellow-500 hover:bg-yellow-500' },
    { id: 'Motor', name: 'Motor', icon: FaFan, color: 'bg-red-500 hover:bg-red-500' },
];

const Sidebar = ({ onDownload, onUpload, onClear }) => {
    const fileInputRef = useRef(null);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-72 bg-gradient-to-br from-slate-50 to-slate-100 border-r border-slate-200 shadow-lg flex flex-col">
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800">Dashboard Builder</h2>
            </div>

            {/* Components Section */}
            <div className="p-4 flex-1">

                <div className="space-y-1">
                    {iconItems.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative flex items-center px-4 py-3 ${item.color} text-white rounded-lg cursor-move transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95`}
                            draggable
                            onDragStart={(event) => onDragStart(event, item.id)}
                        >
                            <div className="flex items-center flex-1">
                                <item.icon className="mr-3 text-xl" />
                                <span className="text-md font-semibold">{item.name}</span>
                            </div>
                            <FaGripVertical className="text-white y" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions Section */}
            <div className="p-4 bg-white border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                    Actions
                </h3>

                <div className="space-y-2">
                    {/* Download Button */}
                    <button
                        onClick={onDownload}
                        className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                        <FaDownload className="mr-2" />
                        <span className="font-medium">Download Dashboard</span>
                    </button>

                    {/* Upload Button */}
                    <button
                        onClick={handleUploadClick}
                        className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                        <FaUpload className="mr-2" />
                        <span className="font-medium">Upload Dashboard</span>
                    </button>

                    {/* Clear Button */}
                    <button
                        onClick={onClear}
                        className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                        <FaTrash className="mr-2" />
                        <span className="font-medium">Clear Canvas</span>
                    </button>
                </div>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={onUpload}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default Sidebar;